import subprocess
import sys
import os
import webbrowser
import time

BACKEND_CMD = [sys.executable, 'main.py']
FRONTEND_CMD = ['npm', 'start']
FRONTEND_DIR = os.path.join(os.path.dirname(__file__), 'web-ui')

# Lancer le backend
backend_proc = subprocess.Popen(BACKEND_CMD)
print('[Sentinel] Backend Python lancé.')

# Lancer le frontend React
frontend_proc = subprocess.Popen(FRONTEND_CMD, cwd=FRONTEND_DIR, shell=True)
print('[Sentinel] Frontend React lancé.')

# Attendre quelques secondes que le serveur démarre
time.sleep(5)

# Ouvrir le navigateur
webbrowser.open('http://localhost:3000')
print('[Sentinel] Navigateur ouvert sur http://localhost:3000')

try:
    backend_proc.wait()
    frontend_proc.wait()
except KeyboardInterrupt:
    print('\nArrêt demandé. Fermeture des serveurs...')
    backend_proc.terminate()
    frontend_proc.terminate()
    sys.exit(0) 