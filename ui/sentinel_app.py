from PyQt6.QtWidgets import (QMainWindow, QWidget, QVBoxLayout, QHBoxLayout, QLabel, 
                             QPushButton, QListWidget, QStackedWidget, QMessageBox, 
                             QTextEdit, QDialog, QDialogButtonBox, QFrame)
from PyQt6.QtGui import QPixmap, QColor, QFont
from PyQt6.QtCore import Qt, QTimer, QPropertyAnimation
import os
import webbrowser
import json
import sys
import time
import threading
from datetime import datetime
import pygame
import subprocess
from voice.recognizer import VoiceRecognizer
from voice.tts import TTS
from core.commands import CommandManager

try:
    from win10toast import ToastNotifier
    toaster = ToastNotifier()
except ImportError:
    toaster = None

class ModernButton(QPushButton):
    """Bouton moderne style Norton 360"""
    def __init__(self, text, primary=False):
        super().__init__(text)
        self.primary = primary
        self.setup_style()
        
    def setup_style(self):
        if self.primary:
            bg_color = "#FF6B35"  # Orange Norton
            hover_color = "#E55A2B"
        else:
            bg_color = "#2C3E50"
            hover_color = "#34495E"
            
        self.setStyleSheet(f"""
            QPushButton {{
                background-color: {bg_color};
                color: #FFFFFF;
                border: none;
                border-radius: 8px;
                padding: 12px 24px;
                font-size: 16px;
                font-weight: bold;
                font-family: 'Segoe UI', Arial, sans-serif;
            }}
            QPushButton:hover {{
                background-color: {hover_color};
            }}
        """)

class SentinelApp(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Sentinel Voice Assistant - Protection Intelligente")
        self.setGeometry(100, 100, 1400, 900)
        
        # Initialize pygame mixer for sounds
        try:
            pygame.mixer.init()
        except Exception as e:
            print(f"Erreur lors de l'initialisation du mixer pygame: {e}")
        
        # Load sounds
        self.sounds = {}
        self.load_sounds()
        
        # Style Norton 360
        self.setStyleSheet("""
            QMainWindow {
                background: qlineargradient(x1:0, y1:0, x2:0, y2:1,
                    stop:0 #1A1A2E, stop:1 #16213E);
                color: #FFFFFF;
                font-family: 'Segoe UI', Arial, sans-serif;
            }
            QListWidget {
                background-color: #2C3E50;
                border: none;
                border-radius: 0px;
                color: #FFFFFF;
                font-size: 16px;
                padding: 10px;
            }
            QListWidget::item {
                padding: 15px;
                border-radius: 8px;
                margin: 2px;
            }
            QListWidget::item:selected {
                background-color: #FF6B35;
                color: #FFFFFF;
            }
            QListWidget::item:hover {
                background-color: #34495E;
            }
            QTextEdit {
                background-color: #2C3E50;
                border: 2px solid #34495E;
                border-radius: 8px;
                color: #FFFFFF;
                font-size: 14px;
                padding: 10px;
            }
        """)
        
        self.voice = TTS()
        self.recognizer = VoiceRecognizer()
        self.commands = CommandManager()
        self.init_ui()

    def init_ui(self):
        # Widget central
        central_widget = QWidget()
        self.setCentralWidget(central_widget)
        main_layout = QHBoxLayout(central_widget)
        main_layout.setContentsMargins(0, 0, 0, 0)
        main_layout.setSpacing(0)

        # Barre latérale Norton 360 style
        sidebar = QWidget()
        sidebar.setFixedWidth(280)
        sidebar.setStyleSheet("""
            QWidget {
                background: qlineargradient(x1:0, y1:0, x2:0, y2:1,
                    stop:0 #2C3E50, stop:1 #34495E);
                border-right: 2px solid #FF6B35;
            }
        """)
        sidebar_layout = QVBoxLayout(sidebar)
        sidebar_layout.setContentsMargins(20, 20, 20, 20)
        sidebar_layout.setSpacing(15)

        # Logo et titre
        logo_container = QWidget()
        logo_layout = QHBoxLayout(logo_container)
        
        logo = QLabel("🛡️")
        logo.setStyleSheet("font-size: 48px;")
        
        title = QLabel("Sentinel Voice")
        title.setStyleSheet("""
            font-size: 24px;
            font-weight: bold;
            color: #FF6B35;
            margin-left: 15px;
        """)
        
        logo_layout.addWidget(logo)
        logo_layout.addWidget(title)
        logo_layout.addStretch()
        sidebar_layout.addWidget(logo_container)

        # Statut de protection
        status_label = QLabel("STATUT DE PROTECTION")
        status_label.setStyleSheet("""
            font-size: 12px;
            color: #BDC3C7;
            font-weight: bold;
            margin-top: 20px;
        """)
        sidebar_layout.addWidget(status_label)

        # Statuts
        self.voice_status = QLabel("🎤 Reconnaissance Vocale - ACTIF")
        self.voice_status.setStyleSheet("color: #27AE60; font-weight: bold; padding: 10px; background: #2C3E50; border-radius: 8px;")
        sidebar_layout.addWidget(self.voice_status)
        
        self.ai_status = QLabel("🧠 Intelligence Artificielle - CONNECTÉ")
        self.ai_status.setStyleSheet("color: #3498DB; font-weight: bold; padding: 10px; background: #2C3E50; border-radius: 8px;")
        sidebar_layout.addWidget(self.ai_status)
        
        self.security_status = QLabel("🔒 Sécurité Système - PROTÉGÉ")
        self.security_status.setStyleSheet("color: #E74C3C; font-weight: bold; padding: 10px; background: #2C3E50; border-radius: 8px;")
        sidebar_layout.addWidget(self.security_status)

        # Navigation
        nav_label = QLabel("NAVIGATION")
        nav_label.setStyleSheet("""
            font-size: 12px;
            color: #BDC3C7;
            font-weight: bold;
            margin-top: 20px;
        """)
        sidebar_layout.addWidget(nav_label)

        self.sidebar = QListWidget()
        self.sidebar.addItems(["🏠 Tableau de Bord", "🎯 Commandes", "📊 Historique", "⚙️ Paramètres", "❓ Aide"])
        self.sidebar.currentRowChanged.connect(self.display_page)
        sidebar_layout.addWidget(self.sidebar)

        # Bouton d'action principal
        self.mic_btn = ModernButton("🎤 PARLER", primary=True)
        self.mic_btn.clicked.connect(self.listen_and_respond)
        sidebar_layout.addWidget(self.mic_btn)

        sidebar_layout.addStretch()
        main_layout.addWidget(sidebar)

        # Zone principale
        self.pages = QStackedWidget()
        self.pages.setStyleSheet("""
            QStackedWidget {
                background: qlineargradient(x1:0, y1:0, x2:0, y2:1,
                    stop:0 #1A1A2E, stop:1 #16213E);
            }
        """)
        main_layout.addWidget(self.pages)

        # Page d'accueil (Tableau de bord)
        self.create_dashboard_page()
        
        # Pages simples pour l'instant
        for i in range(4):
            page = QWidget()
            layout = QVBoxLayout(page)
            layout.addWidget(QLabel(f"Page {i+1} - En développement"))
            self.pages.addWidget(page)

        self.sidebar.setCurrentRow(0)

    def create_dashboard_page(self):
        """Crée la page tableau de bord style Norton 360"""
        dashboard = QWidget()
        layout = QVBoxLayout(dashboard)
        layout.setContentsMargins(40, 40, 40, 40)
        layout.setSpacing(30)

        # En-tête
        header = QWidget()
        header_layout = QHBoxLayout(header)
        
        welcome_label = QLabel("Bienvenue dans votre Assistant Vocal Intelligent")
        welcome_label.setStyleSheet("""
            font-size: 32px;
            font-weight: bold;
            color: #FFFFFF;
        """)
        
        header_layout.addWidget(welcome_label)
        header_layout.addStretch()
        layout.addWidget(header)

        # Avatar et zone de chat
        chat_container = QWidget()
        chat_layout = QHBoxLayout(chat_container)
        
        # Avatar
        avatar_container = QWidget()
        avatar_container.setFixedWidth(300)
        avatar_layout = QVBoxLayout(avatar_container)
        
        avatar = QLabel("🤖")
        avatar.setStyleSheet("font-size: 120px; color: #FF6B35; text-align: center;")
        avatar.setAlignment(Qt.AlignmentFlag.AlignCenter)
        avatar_layout.addWidget(avatar)
        
        # Animation micro
        self.mic_icon = QLabel("🎤")
        self.mic_icon.setStyleSheet("font-size: 64px; color: #FF6B35; text-align: center;")
        self.mic_icon.setAlignment(Qt.AlignmentFlag.AlignCenter)
        avatar_layout.addWidget(self.mic_icon)
        
        chat_layout.addWidget(avatar_container)

        # Zone de chat
        chat_widget = QWidget()
        chat_widget.setStyleSheet("""
            QWidget {
                background-color: #2C3E50;
                border-radius: 15px;
                padding: 20px;
            }
        """)
        chat_inner_layout = QVBoxLayout(chat_widget)
        
        chat_title = QLabel("Historique des Interactions")
        chat_title.setStyleSheet("""
            font-size: 20px;
            font-weight: bold;
            color: #FF6B35;
            margin-bottom: 15px;
        """)
        chat_inner_layout.addWidget(chat_title)
        
        self.chat_history = QTextEdit()
        self.chat_history.setReadOnly(True)
        chat_inner_layout.addWidget(self.chat_history)
        
        chat_layout.addWidget(chat_widget)
        layout.addWidget(chat_container)

        # Actions rapides
        actions_label = QLabel("Actions Rapides")
        actions_label.setStyleSheet("""
            font-size: 24px;
            font-weight: bold;
            color: #FFFFFF;
            margin-top: 20px;
        """)
        layout.addWidget(actions_label)

        actions_layout = QHBoxLayout()
        actions_layout.setSpacing(15)
        
        quick_actions = [
            ("📝 Bloc-notes", "ouvre le bloc notes"),
            ("🧮 Calculatrice", "ouvre la calculatrice"),
            ("🎨 Paint", "ouvre paint"),
            ("📁 Explorateur", "ouvre l'explorateur")
        ]
        
        for label, command in quick_actions:
            btn = ModernButton(label)
            btn.clicked.connect(lambda checked, cmd=command: self.execute_quick_action(cmd))
            actions_layout.addWidget(btn)
        
        layout.addLayout(actions_layout)
        layout.addStretch()
        
        self.pages.addWidget(dashboard)

    def execute_quick_action(self, command):
        """Exécute une action rapide"""
        self.play_sound("click")
        result = self.execute_action(command)
        response = f"Action exécutée : {command}"
        if result:
            response += f" - {result}"
        self.voice.say(response)
        self.chat_history.append(f"<b style='color:#FF6B35'>Assistant :</b> {response}")

    def display_page(self, index):
        """Affiche la page sélectionnée"""
        self.pages.setCurrentIndex(index)

    def play_sound(self, sound_name):
        """Joue un son d'interface"""
        try:
            if sound_name in self.sounds:
                self.sounds[sound_name].play()
        except Exception as e:
            print(f"Erreur lors de la lecture du son {sound_name}: {e}")

    def show_notification(self, title, msg):
        """Affiche une notification système"""
        if toaster:
            toaster.show_toast(title, msg, duration=3, threaded=True)

    def listen_and_respond(self):
        # Animation micro ON
        self.mic_icon.setText("🔴")
        self.mic_icon.setStyleSheet("font-size: 64px; color: #E74C3C; text-align: center;")
        
        # Play notification sound
        self.play_sound("notification")
        
        self.chat_history.append("<b style='color:#27AE60'>[Écoute en cours...]</b>")
        text = self.recognizer.listen_once()
        
        # Animation micro OFF
        self.mic_icon.setText("🎤")
        self.mic_icon.setStyleSheet("font-size: 64px; color: #FF6B35; text-align: center;")
        
        if text:
            self.chat_history.append(f"<b style='color:#3498DB'>Vous :</b> {text}")
            
            # Recherche de commande
            cmd = self.commands.find_best(text)
            if cmd:
                self.play_sound("success")
                self.show_notification("Sentinel Voice", f"Commande exécutée : {cmd['phrase']}")
                
                # Exécution
                result = self.execute_action(cmd['action'])
                response = f"J'ai exécuté : {cmd['phrase']}"
                if result:
                    response += f" - {result}"
                self.voice.say(response)
                self.chat_history.append(f"<b style='color:#FF6B35'>Assistant :</b> {response}")
            else:
                self.play_sound("learn")
                self.show_notification("Sentinel Voice", f"Nouvelle commande apprise : {text}")
                
                # Apprentissage automatique
                self.commands.learn_from_user(text, "generic_response")
                response = f"J'ai appris : {text}. Je l'exécuterai mieux la prochaine fois."
                self.voice.say(response)
                self.chat_history.append(f"<b style='color:#FF6B35'>Assistant :</b> {response}")
        else:
            self.play_sound("error")
            self.chat_history.append("<b style='color:#E74C3C'>[Aucune parole détectée]</b>")

    def execute_action(self, action):
        """Exécute une action système"""
        try:
            if action == "notepad":
                subprocess.Popen(["notepad.exe"])
                return "Bloc-notes ouvert."
            elif action == "calc":
                subprocess.Popen(["calc.exe"])
                return "Calculatrice ouverte."
            elif action == "mspaint":
                subprocess.Popen(["mspaint.exe"])
                return "Paint ouvert."
            elif action == "explorer":
                subprocess.Popen(["explorer.exe"])
                return "Explorateur ouvert."
            elif action == "chrome":
                subprocess.Popen(["chrome.exe"])
                return "Chrome ouvert."
            elif action == "firefox":
                subprocess.Popen(["firefox.exe"])
                return "Firefox ouvert."
            elif action == "msedge":
                subprocess.Popen(["msedge.exe"])
                return "Edge ouvert."
            elif action == "youtube":
                webbrowser.open("https://www.youtube.com/")
                return "J'ai ouvert YouTube."
            elif action == "gmail":
                webbrowser.open("https://mail.google.com/")
                return "J'ai ouvert Gmail."
            elif action == "weather_paris":
                webbrowser.open("https://www.meteo-paris.com/")
                return "Voici la météo à Paris."
            elif action == "news":
                webbrowser.open("https://news.google.com/")
                return "Voici les actualités."
            elif action == "shutdown":
                subprocess.Popen(["shutdown", "/s", "/t", "0"])
                return "J'éteins l'ordinateur."
            elif action == "reboot":
                subprocess.Popen(["shutdown", "/r", "/t", "0"])
                return "Je redémarre l'ordinateur."
            elif action == "lock":
                subprocess.Popen(["rundll32.exe", "user32.dll,LockWorkStation"])
                return "Session verrouillée."
            elif action == "generic_response":
                return "Commande apprise. Je l'exécuterai mieux la prochaine fois."
            return "Action exécutée : " + action
        except Exception as e:
            return f"Erreur lors de l'exécution : {e}"

    def load_sounds(self):
        """Load sound effects from assets"""
        try:
            sounds_dir = os.path.join(os.path.dirname(__file__), "assets", "sounds")
            if os.path.exists(sounds_dir):
                for sound_file in os.listdir(sounds_dir):
                    if sound_file.endswith(('.wav', '.mp3')):
                        sound_path = os.path.join(sounds_dir, sound_file)
                        sound_name = os.path.splitext(sound_file)[0]
                        try:
                            self.sounds[sound_name] = pygame.mixer.Sound(sound_path)
                        except Exception as e:
                            print(f"Erreur lors du chargement du son {sound_file}: {e}")
        except Exception as e:
            print(f"Erreur lors du chargement des sons: {e}") 