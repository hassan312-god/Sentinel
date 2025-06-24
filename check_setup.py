#!/usr/bin/env python3
"""
Script de vérification de l'installation de Sentinel Voice
Vérifie que tous les composants sont correctement installés et configurés
"""

import os
import sys
import json
import subprocess
from pathlib import Path

def check_python_version():
    """Vérifie la version de Python"""
    print("🐍 Vérification de la version Python...")
    version = sys.version_info
    if version.major >= 3 and version.minor >= 8:
        print(f"✅ Python {version.major}.{version.minor}.{version.micro} - OK")
        return True
    else:
        print(f"❌ Python {version.major}.{version.minor}.{version.micro} - Version 3.8+ requise")
        return False

def check_dependencies():
    """Vérifie les dépendances Python"""
    print("\n📦 Vérification des dépendances Python...")
    required_packages = [
        ('PyQt6', 'PyQt6'),
        ('pygame', 'pygame'),
        ('pyttsx3', 'pyttsx3'),
        ('SpeechRecognition', 'speech_recognition'),
        ('requests', 'requests'),
        ('fuzzywuzzy', 'fuzzywuzzy'),
        ('vosk', 'vosk'),
        ('elevenlabs', 'elevenlabs'),
        ('websockets', 'websockets'),
        ('flask', 'flask'),
        ('flask_socketio', 'flask_socketio')
    ]
    
    missing_packages = []
    for display_name, import_name in required_packages:
        try:
            __import__(import_name)
            print(f"✅ {display_name} - OK")
        except ImportError:
            print(f"❌ {display_name} - Manquant")
            missing_packages.append(display_name)
    
    if missing_packages:
        print(f"\n⚠️  Packages manquants: {', '.join(missing_packages)}")
        print("   Exécutez: pip install -r requirements.txt")
        return False
    return True

def check_files():
    """Vérifie la présence des fichiers essentiels"""
    print("\n📁 Vérification des fichiers...")
    required_files = [
        'main.py',
        'requirements.txt',
        'config/voice_config.json',
        'commands.json',
        'web-ui/package.json',
        'web-ui/public/assets/icons/favicon.ico',
        'web-ui/public/assets/icons/sentinel-logo.ico'
    ]
    
    missing_files = []
    for file_path in required_files:
        if os.path.exists(file_path):
            print(f"✅ {file_path} - OK")
        else:
            print(f"❌ {file_path} - Manquant")
            missing_files.append(file_path)
    
    if missing_files:
        print(f"\n⚠️  Fichiers manquants: {', '.join(missing_files)}")
        return False
    return True

def check_config():
    """Vérifie la configuration"""
    print("\n⚙️  Vérification de la configuration...")
    
    # Vérifier voice_config.json
    try:
        with open('config/voice_config.json', 'r', encoding='utf-8') as f:
            config = json.load(f)
        
        if 'tts' in config and 'voices' in config:
            print("✅ config/voice_config.json - OK")
        else:
            print("❌ config/voice_config.json - Structure invalide")
            return False
    except Exception as e:
        print(f"❌ config/voice_config.json - Erreur: {e}")
        return False
    
    # Vérifier commands.json
    try:
        with open('commands.json', 'r', encoding='utf-8') as f:
            commands = json.load(f)
        print("✅ commands.json - OK")
    except Exception as e:
        print(f"❌ commands.json - Erreur: {e}")
        return False
    
    return True

def check_react_setup():
    """Vérifie l'installation React"""
    print("\n⚛️  Vérification de l'installation React...")
    
    web_ui_path = Path('web-ui')
    if not web_ui_path.exists():
        print("❌ Dossier web-ui manquant")
        return False
    
    package_json = web_ui_path / 'package.json'
    if not package_json.exists():
        print("❌ package.json manquant dans web-ui")
        return False
    
    node_modules = web_ui_path / 'node_modules'
    if not node_modules.exists():
        print("⚠️  node_modules manquant - Exécutez: cd web-ui && npm install")
        return False
    else:
        print("✅ node_modules - OK")
    
    return True

def check_ports():
    """Vérifie les ports utilisés"""
    print("\n🔌 Vérification des ports...")
    
    try:
        # Vérifier le port 3000 (React)
        result = subprocess.run(['netstat', '-ano'], capture_output=True, text=True)
        if ':3000' in result.stdout:
            print("✅ Port 3000 (React) - En cours d'utilisation")
        else:
            print("ℹ️  Port 3000 (React) - Libre")
    except Exception:
        print("⚠️  Impossible de vérifier les ports")
    
    return True

def main():
    """Fonction principale"""
    print("🛡️  Vérification de l'installation Sentinel Voice")
    print("=" * 50)
    
    checks = [
        check_python_version(),
        check_dependencies(),
        check_files(),
        check_config(),
        check_react_setup(),
        check_ports()
    ]
    
    print("\n" + "=" * 50)
    if all(checks):
        print("🎉 Toutes les vérifications sont passées avec succès !")
        print("\n🚀 Pour démarrer l'application:")
        print("   1. Backend Python: python main.py")
        print("   2. Frontend React: cd web-ui && npm start")
        print("\n📖 Consultez le README.md pour plus d'informations")
    else:
        print("❌ Certaines vérifications ont échoué")
        print("   Veuillez corriger les problèmes avant de continuer")
        sys.exit(1)

if __name__ == "__main__":
    main() 