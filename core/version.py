"""
Module de gestion de version automatique pour Sentinel Voice
"""

import re
import os
from datetime import datetime

# Version actuelle
CURRENT_VERSION = "1.0.0"

def get_version():
    """Retourne la version actuelle"""
    return CURRENT_VERSION

def parse_version(version_string):
    """Parse une version en composants (major, minor, patch)"""
    match = re.match(r'^(\d+)\.(\d+)\.(\d+)(?:-(.+))?$', version_string)
    if match:
        major, minor, patch, prerelease = match.groups()
        return int(major), int(minor), int(patch), prerelease
    raise ValueError(f"Version invalide: {version_string}")

def increment_version(version_string, increment_type="patch"):
    """Incrémente la version selon le type (major, minor, patch)"""
    major, minor, patch, prerelease = parse_version(version_string)
    
    if increment_type == "major":
        major += 1
        minor = 0
        patch = 0
    elif increment_type == "minor":
        minor += 1
        patch = 0
    elif increment_type == "patch":
        patch += 1
    else:
        raise ValueError(f"Type d'incrément invalide: {increment_type}")
    
    return f"{major}.{minor}.{patch}"

def generate_changelog(version, changes=None):
    """Génère un changelog pour la version donnée"""
    if changes is None:
        changes = []
    
    changelog = f"# Changelog - Version {version}\n\n"
    changelog += f"**Date:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n"
    
    if changes:
        changelog += "## Modifications\n\n"
        for change in changes:
            changelog += f"- {change}\n"
    else:
        changelog += "## Modifications\n\n"
        changelog += "- Améliorations générales\n"
        changelog += "- Corrections de bugs\n"
    
    return changelog

def update_version_file(new_version):
    """Met à jour le fichier de version"""
    version_file = os.path.join(os.path.dirname(__file__), "version.py")
    
    with open(version_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remplace la version actuelle
    content = re.sub(
        r'CURRENT_VERSION = "[^"]*"',
        f'CURRENT_VERSION = "{new_version}"',
        content
    )
    
    with open(version_file, 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == "__main__":
    print(f"Version actuelle: {get_version()}")
    print(f"Nouvelle version (patch): {increment_version(get_version(), 'patch')}")
    print(f"Nouvelle version (minor): {increment_version(get_version(), 'minor')}")
    print(f"Nouvelle version (major): {increment_version(get_version(), 'major')}") 