import os
import sys
import platform
import subprocess

# Dossiers à inclure dans le binaire
INCLUDE_DIRS = [
    'config',
    'core',
    'voice',
    'ui',
    'web-ui',
    'assets'
]

MAIN_SCRIPT = 'main.py'

# Construction de la commande PyInstaller
add_data = []
for d in INCLUDE_DIRS:
    if os.path.exists(d):
        if platform.system() == 'Windows':
            add_data.append(f'{d};{d}')
        else:
            add_data.append(f'{d}:{d}')

add_data_args = []
for entry in add_data:
    add_data_args += ['--add-data', entry]

cmd = [
    'pyinstaller',
    '--onefile',
    '--noconsole',
    *add_data_args,
    MAIN_SCRIPT
]

print('Commande PyInstaller :')
print(' '.join(cmd))

try:
    subprocess.run(cmd, check=True)
    print('\n✅ Build terminé ! Le binaire se trouve dans le dossier dist/')
except subprocess.CalledProcessError as e:
    print(f'❌ Erreur lors du build : {e}')
    sys.exit(1) 