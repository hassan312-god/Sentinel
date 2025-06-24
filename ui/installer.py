from PyQt6.QtWidgets import QDialog, QVBoxLayout, QLabel, QProgressBar, QPushButton
from PyQt6.QtGui import QPixmap
from PyQt6.QtCore import Qt, QTimer
import os

class Installer(QDialog):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Installation de Sentinel Voice")
        self.setFixedSize(600, 400)
        self.setStyleSheet("background-color: #23272A; color: #fff;")
        self.init_ui()
        self.progress = 0
        self.timer = QTimer(self)
        self.timer.timeout.connect(self.update_progress)
        self.timer.start(40)

    def init_ui(self):
        layout = QVBoxLayout(self)
        # Image/logo
        logo = QLabel()
        logo_path = os.path.join(os.path.dirname(__file__), "assets", "sentinel_logo.png")
        if os.path.exists(logo_path):
            pixmap = QPixmap(logo_path).scaled(90, 90, Qt.AspectRatioMode.KeepAspectRatio, Qt.TransformationMode.SmoothTransformation)
            logo.setPixmap(pixmap)
        else:
            logo.setText("[Sentinel]")
            logo.setStyleSheet("font-size: 28px; font-weight: bold;")
        logo.setAlignment(Qt.AlignmentFlag.AlignCenter)
        layout.addWidget(logo)
        # Illustration
        illustration = QLabel()
        illustration_path = os.path.join(os.path.dirname(__file__), "assets", "install_illustration.png")
        if os.path.exists(illustration_path):
            pixmap = QPixmap(illustration_path).scaled(320, 120, Qt.AspectRatioMode.KeepAspectRatio, Qt.TransformationMode.SmoothTransformation)
            illustration.setPixmap(pixmap)
        else:
            illustration.setText("")
        illustration.setAlignment(Qt.AlignmentFlag.AlignCenter)
        layout.addWidget(illustration)
        # Texte d'accueil
        self.label = QLabel("Bienvenue dans l'installation de Sentinel Voice\nVotre assistant vocal personnel.")
        self.label.setAlignment(Qt.AlignmentFlag.AlignCenter)
        self.label.setStyleSheet("font-size: 20px; margin-top: 10px;")
        layout.addWidget(self.label)
        # Barre de progression
        self.progress_bar = QProgressBar()
        self.progress_bar.setRange(0, 100)
        self.progress_bar.setValue(0)
        self.progress_bar.setStyleSheet("QProgressBar {background: #181A1B; border-radius: 10px;} QProgressBar::chunk {background: #5865F2; border-radius: 10px;}")
        layout.addWidget(self.progress_bar)
        # Texte d'étape
        self.step_label = QLabel("Préparation de l'installation...")
        self.step_label.setAlignment(Qt.AlignmentFlag.AlignCenter)
        self.step_label.setStyleSheet("font-size: 16px; margin-top: 10px;")
        layout.addWidget(self.step_label)
        # Bouton de fin (caché au début)
        self.start_btn = QPushButton("Lancer Sentinel Voice")
        self.start_btn.setStyleSheet("background-color: #5865F2; color: #fff; font-size: 18px; border-radius: 20px; padding: 10px 30px;")
        self.start_btn.setVisible(False)
        layout.addWidget(self.start_btn, alignment=Qt.AlignmentFlag.AlignCenter)

    def update_progress(self):
        if self.progress < 100:
            self.progress += 1
            self.progress_bar.setValue(self.progress)
            if self.progress < 30:
                self.step_label.setText("Préparation de l'installation...")
            elif self.progress < 60:
                self.step_label.setText("Vérification des composants...")
            elif self.progress < 90:
                self.step_label.setText("Configuration de l'assistant...")
            else:
                self.step_label.setText("Finalisation...")
        else:
            self.timer.stop()
            self.step_label.setText("Installation terminée !")
            self.start_btn.setVisible(True) 