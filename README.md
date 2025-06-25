[![Build & Release Sentinel](https://github.com/hassan312-god/Sentinel/actions/workflows/release.yml/badge.svg)](https://github.com/hassan312-god/Sentinel/actions)
[![Tests](https://github.com/hassan312-god/Sentinel/actions/workflows/test.yml/badge.svg)](https://github.com/hassan312-god/Sentinel/actions)
[![Release](https://img.shields.io/github/v/release/hassan312-god/Sentinel?label=release)](https://github.com/hassan312-god/Sentinel/releases)
[![Downloads](https://img.shields.io/github/downloads/hassan312-god/Sentinel/total?label=downloads)](https://github.com/hassan312-god/Sentinel/releases)
[![Stars](https://img.shields.io/github/stars/hassan312-god/Sentinel?label=stars)](https://github.com/hassan312-god/Sentinel/stargazers)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Python](https://img.shields.io/badge/python-3.8+-blue.svg)](https://python.org)
[![Platforms](https://img.shields.io/badge/platforms-Windows%20%7C%20Mac%20%7C%20Linux-blue)](#)
[![Code Quality](https://img.shields.io/badge/code%20quality-A+-brightgreen)](https://github.com/hassan312-god/Sentinel/actions)

# 🛡️ Sentinel Voice - Assistant Vocal Intelligent

Un assistant vocal sécurisé et intelligent pour PC, conçu pour fonctionner principalement hors-ligne avec une interface moderne inspirée de Norton 360.

## ✨ Fonctionnalités Principales

### 🎤 Reconnaissance Vocale Avancée
- **Reconnaissance multilingue** (français principal, anglais supporté)
- **Précision élevée** avec SpeechRecognition et Vosk
- **Apprentissage automatique** des commandes personnalisées
- **Fonctionnement hors-ligne** pour la confidentialité

### 🗣️ Synthèse Vocale Naturelle
- **Voix locale** optimisée avec pyttsx3
- **Voix cloud ElevenLabs** pour une qualité ultra-naturelle
- **Réponses brèves** ("OK", "C'est fait") pour une expérience fluide
- **Support multilingue** avec modèles spécialisés

### 🎮 Interface Moderne
- **UI React** avec animations et transitions fluides
- **Design glassmorphism** inspiré de Norton 360
- **Icônes SVG** modernes et personnalisées
- **Responsive design** adaptatif
- **Thème sombre** professionnel

### 🔒 Sécurité et Protection
- **Fonctionnement hors-ligne** par défaut
- **Chiffrement local** des données vocales
- **Contrôle d'accès** aux commandes système
- **Surveillance en temps réel** de l'activité

### ⚡ Commandes Système
- **Ouverture/fermeture** d'applications
- **Contrôle système** (verrouillage, redémarrage)
- **Navigation** dans les dossiers
- **Commandes personnalisées** apprises

## 🖥️ Installation Multiplateforme (Windows, Mac, Linux)

### 1. Cloner le dépôt
```bash
git clone https://github.com/hassan312-god/Sentinel.git
cd Sentinel
```

### 2. Installation automatique

#### Sous Linux/Mac
```bash
chmod +x install.sh
./install.sh
```

#### Sous Windows
Double-cliquez sur `install.bat` ou dans un terminal :
```bat
install.bat
```

### 3. Lancement
- **Backend :**
  - Linux/Mac : `source .venv/bin/activate && python main.py`
  - Windows : `.venv\Scripts\activate && python main.py`
- **Frontend (UI React) :**
  - `cd web-ui && npm start`

### 4. Dépendances système (Mac/Linux)
- Pour la reconnaissance vocale locale, installez PortAudio :
  - **Debian/Ubuntu :** `sudo apt install portaudio19-dev`
  - **Mac :** `brew install portaudio`

## 🔄 Mise à jour automatique via GitHub

Pour mettre à jour votre assistant avec la dernière version du dépôt :

```bash
python core/auto_update.py
```

Ou faites simplement :
```bash
git pull
```

## 🚀 Installation Manuelle

### Prérequis
- Python 3.8+
- Node.js 16+ (pour l'UI React)
- Microphone fonctionnel
- Haut-parleurs ou casque

### Installation Backend Python

```bash
# Cloner le repository
git clone https://github.com/hassan312-god/Sentinel.git
cd Sentinel

# Installer les dépendances Python
pip install -r requirements.txt

# Configuration de la voix cloud (optionnel)
# Obtenir une clé API ElevenLabs sur https://elevenlabs.io
# Ajouter la clé dans config/voice_config.json ou en variable d'environnement
export ELEVENLABS_API_KEY="votre-clé-api"
```

### Installation Frontend React

```bash
# Aller dans le dossier web-ui
cd web-ui

# Installer les dépendances Node.js
npm install

# Démarrer le serveur de développement
npm start
```

## 🎯 Utilisation

### Démarrage Rapide

1. **Lancer le backend Python** :
   ```bash
   python main.py
   ```

2. **Lancer l'interface React** :
   ```bash
   cd web-ui
   npm start
   ```

3. **Activer la reconnaissance vocale** en cliquant sur le bouton microphone

### Commandes Vocales Exemples

| Commande | Action |
|----------|--------|
| "Ouvre Chrome" | Lance Google Chrome |
| "Ferme Notepad" | Ferme le Bloc-notes |
| "Verrouille l'écran" | Verrouille le PC |
| "Ouvre le dossier Documents" | Ouvre le dossier Documents |
| "Apprends la commande 'ouvre Spotify'" | Enregistre une nouvelle commande |

### Configuration de la Voix

#### Voix Locale (par défaut)
- Fonctionne hors-ligne
- Réponses brèves et naturelles
- Personnalisable (vitesse, volume, pitch)

#### Voix Cloud ElevenLabs (optionnel)
- Qualité ultra-naturelle
- Plusieurs voix disponibles
- Support multilingue avancé

Pour activer la voix cloud :
1. Obtenir une clé API sur [ElevenLabs](https://elevenlabs.io)
2. Modifier `config/voice_config.json` :
   ```json
   {
     "tts": {
       "use_cloud": true,
       "elevenlabs": {
         "api_key": "votre-clé-api"
       }
     }
   }
   ```

## 🎨 Interface Utilisateur

### Design Moderne
- **Glassmorphism** avec effets de transparence
- **Animations fluides** avec Framer Motion
- **Icônes SVG** personnalisées
- **Gradients colorés** professionnels

### Composants Principaux
- **Sidebar** : Navigation et statut système
- **Dashboard** : Vue d'ensemble et contrôles
- **Pages spécialisées** : Commandes, Historique, Paramètres, Aide

### Responsive Design
- **Adaptatif** à toutes les tailles d'écran
- **Navigation tactile** optimisée
- **Thème sombre** par défaut

## ⚙️ Configuration Avancée

### Paramètres de Voix

```json
{
  "tts": {
    "use_cloud": false,
    "local": {
      "rate": 180,
      "volume": 0.85,
      "pitch": 1.1
    },
    "responses": {
      "brief_mode": true
    }
  }
}
```

### Commandes Personnalisées

Les commandes apprises sont sauvegardées dans `commands.json` :

```json
{
  "ouvre spotify": {
    "action": "open_app",
    "target": "spotify.exe",
    "description": "Ouvre Spotify"
  }
}
```

## 🔧 Architecture Technique

### Backend Python
- **Core** : Logique principale et gestion des commandes
- **Voice** : Reconnaissance et synthèse vocale
- **UI** : Interface PyQt6 (legacy)
- **WebSocket** : Communication avec React

### Frontend React
- **Components** : Composants réutilisables
- **Pages** : Vues principales de l'application
- **Hooks** : Logique métier et WebSocket
- **Styles** : Styled-components avec thème

### Communication
- **WebSocket** : Communication temps réel
- **REST API** : Configuration et données
- **Events** : Synchronisation des états

## 🛠️ Développement

### Structure du Projet
```
sentinel-voice/
├── core/                 # Logique principale
├── voice/               # Reconnaissance et synthèse vocale
├── ui/                  # Interface PyQt6 (legacy)
├── web-ui/              # Interface React moderne
│   ├── src/
│   │   ├── components/  # Composants React
│   │   ├── pages/       # Pages de l'application
│   │   ├── hooks/       # Hooks personnalisés
│   │   └── styles/      # Styles globaux
│   └── public/
│       └── assets/      # Icônes et ressources
├── config/              # Fichiers de configuration
└── requirements.txt     # Dépendances Python
```

### Scripts de Développement

```bash
# Backend
python main.py                    # Lancer l'application
python test_integration.py        # Tests d'intégration

# Frontend
cd web-ui
npm start                        # Serveur de développement
npm run build                    # Build de production
npm test                        # Tests unitaires
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- **ElevenLabs** pour la synthèse vocale cloud
- **SpeechRecognition** pour la reconnaissance vocale
- **React** et **Framer Motion** pour l'interface moderne
- **PyQt6** pour l'interface desktop

## 📞 Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Consulter la documentation dans `/docs`
- Vérifier les logs dans `/logs`

---

**Sentinel Voice** - Votre assistant vocal intelligent et sécurisé 🛡️
