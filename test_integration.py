#!/usr/bin/env python3
"""
Script de test pour vérifier l'intégration des sons et de l'avatar
"""

import os
import sys
import pygame

def test_sounds():
    """Test du chargement et de la lecture des sons"""
    print("🔊 Test des sons...")
    
    try:
        # Initialiser pygame mixer
        pygame.mixer.init()
        print("✅ Pygame mixer initialisé")
        
        # Vérifier le dossier des sons
        sounds_dir = os.path.join("ui", "assets", "sounds")
        if os.path.exists(sounds_dir):
            print(f"✅ Dossier des sons trouvé: {sounds_dir}")
            
            # Lister les fichiers sons
            sound_files = [f for f in os.listdir(sounds_dir) if f.endswith(('.wav', '.mp3'))]
            print(f"📁 Fichiers sons trouvés: {sound_files}")
            
            # Tester le chargement de chaque son
            for sound_file in sound_files:
                try:
                    sound_path = os.path.join(sounds_dir, sound_file)
                    sound = pygame.mixer.Sound(sound_path)
                    print(f"✅ Son chargé: {sound_file}")
                    
                    # Test de lecture (optionnel)
                    # sound.play()
                    # pygame.time.wait(1000)  # Attendre 1 seconde
                    
                except Exception as e:
                    print(f"❌ Erreur lors du chargement de {sound_file}: {e}")
        else:
            print(f"❌ Dossier des sons non trouvé: {sounds_dir}")
            
    except Exception as e:
        print(f"❌ Erreur lors de l'initialisation de pygame: {e}")

def test_avatar():
    """Test du chargement de l'avatar Lottie"""
    print("\n🤖 Test de l'avatar...")
    
    try:
        from lottie import QLottieWidget
        print("✅ Module Lottie disponible")
        
        # Vérifier le fichier avatar
        avatar_path = os.path.join("ui", "assets", "avatars", "chatbot_avatar.json")
        if os.path.exists(avatar_path):
            print(f"✅ Fichier avatar trouvé: {avatar_path}")
            
            # Vérifier que c'est un JSON valide
            import json
            with open(avatar_path, 'r') as f:
                avatar_data = json.load(f)
            print(f"✅ Fichier JSON valide (taille: {len(str(avatar_data))} caractères)")
            
        else:
            print(f"❌ Fichier avatar non trouvé: {avatar_path}")
            
    except ImportError:
        print("⚠️  Module Lottie non disponible - avatar désactivé")
    except Exception as e:
        print(f"❌ Erreur lors du test de l'avatar: {e}")

def test_dependencies():
    """Test des dépendances"""
    print("\n📦 Test des dépendances...")
    
    required_packages = [
        'pygame',
        'lottie',
        'PyQt6',
        'pyttsx3',
        'SpeechRecognition',
        'pyaudio',
        'win10toast',
        'requests',
        'fuzzywuzzy',
        'python-Levenshtein'
    ]
    
    for package in required_packages:
        try:
            __import__(package)
            print(f"✅ {package}")
        except ImportError:
            print(f"❌ {package} - MANQUANT")

def main():
    """Fonction principale de test"""
    print("🧪 Test d'intégration des sons et de l'avatar")
    print("=" * 50)
    
    test_dependencies()
    test_sounds()
    test_avatar()
    
    print("\n" + "=" * 50)
    print("✅ Tests terminés !")
    
    # Instructions pour l'utilisateur
    print("\n📋 Instructions:")
    print("1. Si des dépendances manquent, installez-les avec: pip install -r requirements.txt")
    print("2. Pour tester l'application complète: python main.py")
    print("3. Les sons se joueront automatiquement lors des interactions")
    print("4. L'avatar s'affichera sur la page d'accueil si disponible")

if __name__ == "__main__":
    main() 