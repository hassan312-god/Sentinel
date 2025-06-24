import sys
from PyQt6.QtWidgets import QApplication
from PyQt6.QtCore import Qt
from ui.sentinel_app import SentinelApp

def main():
    app = QApplication(sys.argv)
    
    # Configuration pour éviter l'exécution en arrière-plan
    app.setQuitOnLastWindowClosed(True)
    
    window = SentinelApp()
    
    # S'assurer que la fenêtre reste au premier plan
    window.setWindowFlags(window.windowFlags() | Qt.WindowType.WindowStaysOnTopHint)
    window.show()
    window.raise_()
    window.activateWindow()
    
    # Démarrer l'application
    sys.exit(app.exec())

if __name__ == "__main__":
    main() 