import pyttsx3

class TTS:
    def __init__(self, use_cloud=False):
        self.use_cloud = use_cloud
        if not use_cloud:
            self.engine = pyttsx3.init()
            voices = self.engine.getProperty('voices')
            french_voice = None
            for voice in voices:
                if 'french' in voice.name.lower() or 'français' in voice.name.lower():
                    french_voice = voice.id
                    break
            if french_voice:
                self.engine.setProperty('voice', french_voice)
            elif voices:
                self.engine.setProperty('voice', voices[0].id)
            self.engine.setProperty('rate', 180)
            self.engine.setProperty('volume', 0.85)
            try:
                self.engine.setProperty('pitch', 1.1)
            except:
                pass
        else:
            # Import du TTS cloud
            try:
                from .tts_cloud import CloudTTS
                self.cloud_tts = CloudTTS()
            except ImportError:
                print("TTS cloud non disponible, utilisation du TTS local")
                self.use_cloud = False
                self.__init__(use_cloud=False)

    def say(self, text, brief=True):
        """Prononce le texte donné, ou une réponse brève si brief=True"""
        try:
            if self.use_cloud:
                return self.cloud_tts.say(text, brief)
            else:
                if brief:
                    if any(word in text.lower() for word in ["ouvre", "lance", "démarre", "exécute", "affiche", "montre", "active", "verrouille", "déverrouille"]):
                        cleaned_text = "OK"
                    elif any(word in text.lower() for word in ["éteins", "arrête", "ferme", "quitte"]):
                        cleaned_text = "C'est fait"
                    else:
                        cleaned_text = "D'accord"
                else:
                    cleaned_text = self.clean_text(text)
                self.engine.say(cleaned_text)
                self.engine.runAndWait()
                return True
        except Exception as e:
            print(f"Erreur TTS: {e}")
            return False

    def clean_text(self, text):
        """Nettoie le texte pour une meilleure prononciation"""
        # Remplacer les abréviations courantes
        replacements = {
            "ouvre": "ouvre",
            "ferme": "ferme",
            "lance": "lance",
            "démarre": "démarre",
            "arrête": "arrête",
            "éteins": "éteins",
            "redémarre": "redémarre",
            "verrouille": "verrouille",
            "déverrouille": "déverrouille"
        }
        
        for old, new in replacements.items():
            text = text.replace(old, new)
        
        return text

    def set_voice(self, voice_id):
        """Change la voix"""
        if not self.use_cloud:
            self.engine.setProperty('voice', voice_id)
        else:
            self.cloud_tts.set_voice(voice_id)

    def set_rate(self, rate):
        """Change la vitesse de parole (150-200 recommandé)"""
        if not self.use_cloud:
            self.engine.setProperty('rate', rate)

    def set_volume(self, volume):
        """Change le volume (0.0 à 1.0)"""
        if not self.use_cloud:
            self.engine.setProperty('volume', volume)
        
    def set_pitch(self, pitch):
        """Change le pitch de la voix (0.5 à 2.0)"""
        if not self.use_cloud:
            try:
                self.engine.setProperty('pitch', pitch)
            except:
                pass

    def list_voices(self):
        if self.use_cloud:
            return self.cloud_tts.list_voices()
        else:
            voices = self.engine.getProperty('voices')
            return [{"id": i, "name": v.name} for i, v in enumerate(voices)] 