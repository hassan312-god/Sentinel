import requests
import json
import os
import tempfile
import pygame
from datetime import datetime

class CloudTTS:
    def __init__(self, api_key=None, voice_id="21m00Tcm4TlvDq8ikWAM"):  # Voice ID par défaut : Rachel
        self.api_key = api_key or os.getenv('ELEVENLABS_API_KEY')
        self.voice_id = voice_id
        self.base_url = "https://api.elevenlabs.io/v1"
        self.available_voices = self.get_available_voices()
        
        # Initialiser pygame mixer pour la lecture audio
        try:
            pygame.mixer.init()
        except:
            pass

    def get_available_voices(self):
        """Récupère la liste des voix disponibles"""
        if not self.api_key:
            return []
        
        try:
            response = requests.get(
                f"{self.base_url}/voices",
                headers={"xi-api-key": self.api_key}
            )
            if response.status_code == 200:
                voices = response.json().get("voices", [])
                return [{"id": v["voice_id"], "name": v["name"]} for v in voices]
        except Exception as e:
            print(f"Erreur lors de la récupération des voix: {e}")
        return []

    def text_to_speech(self, text, voice_id=None, model_id="eleven_multilingual_v2"):
        """Convertit le texte en parole avec une voix naturelle"""
        if not self.api_key:
            print("Clé API ElevenLabs manquante")
            return False
        
        voice_id = voice_id or self.voice_id
        
        try:
            url = f"{self.base_url}/text-to-speech/{voice_id}"
            
            headers = {
                "xi-api-key": self.api_key,
                "Content-Type": "application/json"
            }
            
            data = {
                "text": text,
                "model_id": model_id,
                "voice_settings": {
                    "stability": 0.5,
                    "similarity_boost": 0.75,
                    "style": 0.0,
                    "use_speaker_boost": True
                }
            }
            
            response = requests.post(url, headers=headers, json=data)
            
            if response.status_code == 200:
                # Sauvegarder l'audio temporairement
                temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".mp3")
                temp_file.write(response.content)
                temp_file.close()
                
                # Jouer l'audio
                self.play_audio(temp_file.name)
                
                # Nettoyer le fichier temporaire
                os.unlink(temp_file.name)
                return True
            else:
                print(f"Erreur API ElevenLabs: {response.status_code} - {response.text}")
                return False
                
        except Exception as e:
            print(f"Erreur lors de la synthèse vocale: {e}")
            return False

    def play_audio(self, file_path):
        """Joue le fichier audio avec pygame"""
        try:
            pygame.mixer.music.load(file_path)
            pygame.mixer.music.play()
            while pygame.mixer.music.get_busy():
                pygame.time.Clock().tick(10)
        except Exception as e:
            print(f"Erreur lors de la lecture audio: {e}")

    def say(self, text, brief=False):
        """Prononce le texte avec une réponse brève et naturelle"""
        if brief:
            if any(word in text.lower() for word in ["ouvre", "lance", "démarre", "exécute", "affiche", "montre", "active", "verrouille", "déverrouille"]):
                response_text = "OK"
            elif any(word in text.lower() for word in ["éteins", "arrête", "ferme", "quitte"]):
                response_text = "C'est fait"
            else:
                response_text = "D'accord"
        else:
            response_text = text
        
        return self.text_to_speech(response_text)

    def set_voice(self, voice_id):
        """Change la voix"""
        self.voice_id = voice_id

    def list_voices(self):
        """Liste toutes les voix disponibles"""
        return self.available_voices

    def test_voice(self, voice_id=None):
        """Teste une voix avec un texte simple"""
        test_text = "Bonjour, je suis votre assistant vocal Sentinel."
        return self.text_to_speech(test_text, voice_id) 