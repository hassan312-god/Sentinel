from PyQt6.QtWidgets import QWidget, QVBoxLayout, QLabel, QListWidget, QPushButton, QHBoxLayout

class CommandsPage(QWidget):
    def __init__(self, commands=None):
        super().__init__()
        layout = QVBoxLayout(self)
        title = QLabel("Commandes vocales disponibles")
        title.setStyleSheet("font-size: 22px; font-weight: bold; margin-bottom: 10px;")
        layout.addWidget(title)
        self.list = QListWidget()
        self.commands = commands or [
            "Ouvre le bloc-notes",
            "Ferme la fenêtre active",
            "Recherche la météo à Paris",
            "Lis-moi les actualités",
            "Augmente le volume",
            "Éteins l'ordinateur"
        ]
        self.list.addItems(self.commands)
        layout.addWidget(self.list)
        # Bouton de test
        btn_layout = QHBoxLayout()
        self.test_btn = QPushButton("Tester la commande")
        btn_layout.addWidget(self.test_btn)
        layout.addLayout(btn_layout) 