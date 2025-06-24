from PyQt6.QtWidgets import QWidget, QVBoxLayout, QLabel, QComboBox, QPushButton, QHBoxLayout, QCheckBox

class SettingsPage(QWidget):
    def __init__(self):
        super().__init__()
        layout = QVBoxLayout(self)
        title = QLabel("Paramètres")
        title.setStyleSheet("font-size: 22px; font-weight: bold; margin-bottom: 10px;")
        layout.addWidget(title)
        # Langue
        lang_label = QLabel("Langue de l'assistant :")
        self.lang_combo = QComboBox()
        self.lang_combo.addItems(["Français", "Anglais", "Espagnol"])
        layout.addWidget(lang_label)
        layout.addWidget(self.lang_combo)
        # Voix
        voice_label = QLabel("Voix :")
        self.voice_combo = QComboBox()
        self.voice_combo.addItems(["Voix féminine naturelle", "Voix masculine naturelle"])
        layout.addWidget(voice_label)
        layout.addWidget(self.voice_combo)
        # Thème
        theme_label = QLabel("Thème :")
        self.theme_combo = QComboBox()
        self.theme_combo.addItems(["Sombre (recommandé)", "Clair"])
        layout.addWidget(theme_label)
        layout.addWidget(self.theme_combo)
        # Autorisations
        self.admin_checkbox = QCheckBox("Autoriser le contrôle total du PC (administrateur)")
        layout.addWidget(self.admin_checkbox)
        # Bouton sauvegarder
        btn_layout = QHBoxLayout()
        self.save_btn = QPushButton("Sauvegarder les paramètres")
        btn_layout.addWidget(self.save_btn)
        layout.addLayout(btn_layout) 