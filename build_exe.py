import os
import sys
import platform
import subprocess
import argparse

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

def build_executable(test_only=False):
    """Construit l'exécutable avec PyInstaller"""
    
    exe_name = 'Sentinel-Windows' if platform.system() == 'Windows' else (
        'Sentinel-macOS' if platform.system() == 'Darwin' else 'Sentinel-Linux')

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
        '--name', exe_name,
        *add_data_args,
        MAIN_SCRIPT
    ]

    print('Commande PyInstaller :')
    print(' '.join(cmd))

    if test_only:
        print('Mode test-only : vérification de la configuration')
        # Vérifier que PyInstaller est installé
        try:
            subprocess.run(['pyinstaller', '--version'], check=True, capture_output=True)
            print('[OK] PyInstaller est installé')
            return True
        except (subprocess.CalledProcessError, FileNotFoundError):
            print('[ERREUR] PyInstaller n\'est pas installé')
            return False

    try:
        subprocess.run(cmd, check=True)
        print('\n[SUCCES] Build terminé ! Le binaire se trouve dans le dossier dist/')
        return True
    except subprocess.CalledProcessError as e:
        print(f'[ERREUR] Erreur lors du build : {e}')
        return False

def main():
    parser = argparse.ArgumentParser(description='Builder l\'exécutable Sentinel Voice')
    parser.add_argument('--test-only', action='store_true', 
                       help='Mode test uniquement (pour CI/CD)')
    
    args = parser.parse_args()
    
    success = build_executable(args.test_only)
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main() 