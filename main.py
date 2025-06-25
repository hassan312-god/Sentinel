import sys

def main():
    app = QApplication(sys.argv)
    
    # Configuration pour éviter l'exécution en arrière-plan
    app.setQuitOnLastWindowClosed(True)
    
    window = SentinelApp()
    
    window.show()
    window.raise_()
    window.activateWindow()
    
    # Démarrer l'application
    sys.exit(app.exec())

if __name__ == "__main__":
    main() 