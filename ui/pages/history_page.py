from PyQt6.QtWidgets import QWidget, QVBoxLayout, QLabel, QListWidget

class HistoryPage(QWidget):
    def __init__(self):
        super().__init__()
        layout = QVBoxLayout(self)
        title = QLabel("Historique des commandes")
        title.setStyleSheet("font-size: 22px; font-weight: bold; margin-bottom: 10px;")
        layout.addWidget(title)
        self.list = QListWidget()
        layout.addWidget(self.list)

    def add_entry(self, command, response):
        self.list.addItem(f"Commande : {command}\nRéponse : {response}") 