#!/usr/bin/env python3
"""
Script d'auto-release pour Sentinel Voice
Automatise le processus de création de release
"""

import sys
import os
import subprocess
import argparse
from datetime import datetime

# Ajouter le dossier core au path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'core'))
from version import get_version, increment_version, generate_changelog, update_version_file

def run_command(cmd, check=True):
    """Exécute une commande shell"""
    print(f"Exécution: {' '.join(cmd)}")
    result = subprocess.run(cmd, capture_output=True, text=True, check=check)
    if result.stdout:
        print(result.stdout)
    if result.stderr:
        print(result.stderr)
    return result

def get_git_status():
    """Vérifie le statut git"""
    try:
        result = run_command(['git', 'status', '--porcelain'])
        return result.stdout.strip()
    except subprocess.CalledProcessError:
        return None

def create_release(release_type="patch", changes=None):
    """Crée une nouvelle release"""
    print("🚀 Création d'une nouvelle release...")
    
    # Vérifier qu'il n'y a pas de changements non commités
    status = get_git_status()
    if status:
        print("❌ Il y a des changements non commités. Committez d'abord vos changements.")
        return False
    
    # Obtenir la version actuelle
    current_version = get_version()
    print(f"Version actuelle: {current_version}")
    
    # Incrémenter la version
    new_version = increment_version(current_version, release_type)
    print(f"Nouvelle version: {new_version}")
    
    # Mettre à jour le fichier de version
    update_version_file(new_version)
    print("✅ Fichier de version mis à jour")
    
    # Générer le changelog
    changelog = generate_changelog(new_version, changes)
    changelog_file = f"CHANGELOG_{new_version}.md"
    with open(changelog_file, 'w', encoding='utf-8') as f:
        f.write(changelog)
    print(f"✅ Changelog généré: {changelog_file}")
    
    # Commiter les changements
    try:
        run_command(['git', 'add', 'core/version.py', changelog_file])
        run_command(['git', 'commit', '-m', f'Bump version to {new_version}'])
        print("✅ Changements commités")
        
        # Créer le tag
        run_command(['git', 'tag', f'v{new_version}'])
        print(f"✅ Tag v{new_version} créé")
        
        # Pousser vers GitHub
        run_command(['git', 'push', 'origin', 'main'])
        run_command(['git', 'push', 'origin', f'v{new_version}'])
        print("✅ Changements poussés vers GitHub")
        
        print(f"\n🎉 Release v{new_version} créée avec succès !")
        print("Le workflow GitHub Actions va maintenant builder les exécutables.")
        
        return True
        
    except subprocess.CalledProcessError as e:
        print(f"❌ Erreur lors de la création de la release: {e}")
        return False

def main():
    parser = argparse.ArgumentParser(description="Créer une nouvelle release de Sentinel Voice")
    parser.add_argument('type', choices=['major', 'minor', 'patch'], 
                       help='Type de release (major, minor, patch)')
    parser.add_argument('--changes', nargs='*', 
                       help='Liste des changements pour le changelog')
    
    args = parser.parse_args()
    
    success = create_release(args.type, args.changes)
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main() 