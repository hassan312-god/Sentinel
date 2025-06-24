from PyQt6.QtWidgets import QWidget, QVBoxLayout, QLabel, QTextBrowser

class HelpPage(QWidget):
    def __init__(self):
        super().__init__()
        layout = QVBoxLayout(self)
        title = QLabel("Aide & Support")
        title.setStyleSheet("font-size: 22px; font-weight: bold; margin-bottom: 10px;")
        layout.addWidget(title)
        help_text = QTextBrowser()
        help_text.setHtml("""
        <h3>Comment utiliser Sentinel Voice ?</h3>
        <ul>
        <li>Cliquez sur le bouton micro ou dites "Hey Sentinel" pour activer l'écoute.</li>
        <li>Essayez des commandes comme :<br>
        <b>Ouvre le bloc-notes</b>, <b>Recherche la météo à Paris</b>, <b>Lis-moi les actualités</b>...</li>
        <li>Personnalisez la voix, la langue et le thème dans les paramètres.</li>
        <li>Consultez l'historique pour revoir vos commandes.</li>
        </ul>
        <p>Pour plus d'aide, visitez <a href='https://github.com/'>notre page GitHub</a>.</p>
        """)
        layout.addWidget(help_text) 