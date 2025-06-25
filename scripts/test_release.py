#!/usr/bin/env python3
"""
Script de test pour vérifier que tous les composants de release sont en place
"""

import os
import sys
import subprocess

def check_file_exists(filepath):
    """Vérifie qu'un fichier existe"""
    if os.path.exists(filepath):
        print(f"✅ {filepath}")
        return True
    else:
        print(f"❌ {filepath} - MANQUANT")
        return False

def check_command_exists(command):
    """Vérifie qu'une commande existe"""
    try:
        subprocess.run([command, '--version'], capture_output=True, check=True)
        print(f"✅ {command}")
        return True
    except (subprocess.CalledProcessError, FileNotFoundError):
        print(f"❌ {command} - NON INSTALLÉ")
        return False

def test_version_module():
    """Teste le module de version"""
    try:
        sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'core'))
        from version import get_version, increment_version
        
        current = get_version()
        print(f"✅ Version actuelle: {current}")
        
        new_patch = increment_version(current, 'patch')
        print(f"✅ Nouvelle version (patch): {new_patch}")
        
        return True
    except Exception as e:
        print(f"❌ Erreur module version: {e}")
        return False

def main():
    print("🧪 Test des composants de release...\n")
    
    # Vérifier les fichiers essentiels
    print("📁 Fichiers requis:")
    files_to_check = [
        'build_exe.py',
        'core/version.py',
        'scripts/auto_release.py',
        '.github/workflows/release.yml',
        'requirements.txt',
        'web-ui/package.json'
    ]
    
    files_ok = all(check_file_exists(f) for f in files_to_check)
    
    # Vérifier les commandes
    print("\n🔧 Commandes requises:")
    commands_to_check = ['git', 'python', 'pip']
    commands_ok = all(check_command_exists(cmd) for cmd in commands_to_check)
    
    # Tester le module de version
    print("\n📦 Test du module de version:")
    version_ok = test_version_module()
    
    # Résumé
    print("\n" + "="*50)
    if files_ok and commands_ok and version_ok:
        print("🎉 Tous les tests sont passés !")
        print("\nPour créer une nouvelle release:")
        print("  python scripts/auto_release.py patch")
        print("  python scripts/auto_release.py minor")
        print("  python scripts/auto_release.py major")
    else:
        print("❌ Certains tests ont échoué.")
        print("Vérifiez les erreurs ci-dessus.")
    
    return files_ok and commands_ok and version_ok

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1) 