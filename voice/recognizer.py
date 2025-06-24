import speech_recognition as sr
import pyaudio

class VoiceRecognizer:
    def __init__(self):
        self.recognizer = sr.Recognizer()
        self.microphone = sr.Microphone()
        
        # Ajuster pour le bruit ambiant
        with self.microphone as source:
            self.recognizer.adjust_for_ambient_noise(source)

    def listen_once(self, timeout=5):
        try:
            print("[Reconnaissance vocale] Dites quelque chose...")
            with self.microphone as source:
                audio = self.recognizer.listen(source, timeout=timeout, phrase_time_limit=timeout)
            
            # Reconnaissance avec Google Speech Recognition
            text = self.recognizer.recognize_google(audio, language='fr-FR')
            print(f"Reconnu: {text}")
            return text
            
        except sr.WaitTimeoutError:
            print("Timeout - Aucune parole détectée")
            return ""
        except sr.UnknownValueError:
            print("Impossible de comprendre l'audio")
            return ""
        except sr.RequestError as e:
            print(f"Erreur de service: {e}")
            return ""
        except Exception as e:
            print(f"Erreur: {e}")
            return ""

    def close(self):
        # Pas besoin de fermer explicitement avec SpeechRecognition
        pass 