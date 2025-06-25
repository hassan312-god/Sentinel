#!/usr/bin/env python3
"""
Script pour créer des packages d'installation (.msi, .dmg, .deb)
"""

import os
import sys
import subprocess
import platform
from pathlib import Path

def run_command(cmd, check=True):
    """Exécute une commande shell"""
    print(f"Exécution: {' '.join(cmd)}")
    result = subprocess.run(cmd, capture_output=True, text=True, check=check)
    if result.stdout:
        print(result.stdout)
    if result.stderr:
        print(result.stderr)
    return result

def create_windows_installer():
    """Crée un installateur Windows (.msi) avec WiX"""
    print("🔧 Création de l'installateur Windows (.msi)...")
    
    # Vérifier que WiX est installé
    try:
        run_command(['candle', '--version'], check=False)
    except FileNotFoundError:
        print("❌ WiX Toolset n'est pas installé")
        print("Installez WiX depuis: https://wixtoolset.org/releases/")
        return False
    
    # Créer le fichier .wxs
    wxs_content = '''<?xml version="1.0" encoding="UTF-8"?>
<Wix xmlns="http://schemas.microsoft.com/wix/2006/wi">
    <Product Id="*" 
             Name="Sentinel Voice" 
             Language="1033" 
             Version="1.0.1" 
             Manufacturer="Sentinel Voice Team" 
             UpgradeCode="PUT-GUID-HERE">
        
        <Package InstallerVersion="200" 
                 Compressed="yes" 
                 InstallScope="perMachine" />
        
        <MajorUpgrade DowngradeErrorMessage="A newer version of [ProductName] is already installed." />
        <MediaTemplate EmbedCab="yes" />
        
        <Feature Id="ProductFeature" Title="Sentinel Voice" Level="1">
            <ComponentGroupRef Id="ProductComponents" />
        </Feature>
        
        <UIRef Id="WixUI_Minimal" />
    </Product>
    
    <Fragment>
        <Directory Id="TARGETDIR" Name="SourceDir">
            <Directory Id="ProgramFilesFolder">
                <Directory Id="INSTALLFOLDER" Name="Sentinel Voice" />
            </Directory>
        </Directory>
    </Fragment>
    
    <Fragment>
        <ComponentGroup Id="ProductComponents" Directory="INSTALLFOLDER">
            <Component Id="ProductComponent" Guid="*">
                <File Id="SentinelEXE" Source="dist/Sentinel-Windows.exe" KeyPath="yes" />
            </Component>
        </ComponentGroup>
    </Fragment>
</Wix>'''
    
    with open('sentinel.wxs', 'w', encoding='utf-8') as f:
        f.write(wxs_content)
    
    try:
        # Compiler avec WiX
        run_command(['candle', 'sentinel.wxs'])
        run_command(['light', 'sentinel.wixobj'])
        
        # Renommer le fichier
        if os.path.exists('sentinel.msi'):
            os.rename('sentinel.msi', 'Sentinel-Voice-1.0.1.msi')
            print("✅ Installateur Windows créé: Sentinel-Voice-1.0.1.msi")
            return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Erreur lors de la création de l'installateur Windows: {e}")
        return False

def create_macos_installer():
    """Crée un installateur macOS (.dmg)"""
    print("🍎 Création de l'installateur macOS (.dmg)...")
    
    # Vérifier que create-dmg est installé
    try:
        run_command(['create-dmg', '--version'], check=False)
    except FileNotFoundError:
        print("❌ create-dmg n'est pas installé")
        print("Installez avec: brew install create-dmg")
        return False
    
    try:
        # Créer le DMG
        run_command([
            'create-dmg',
            '--volname', 'Sentinel Voice',
            '--window-pos', '200', '120',
            '--window-size', '600', '400',
            '--icon-size', '100',
            '--icon', 'Sentinel Voice.app', '175', '120',
            '--hide-extension', 'Sentinel Voice.app',
            '--app-drop-link', '425', '120',
            'Sentinel-Voice-1.0.1.dmg',
            'dist/'
        ])
        
        print("✅ Installateur macOS créé: Sentinel-Voice-1.0.1.dmg")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Erreur lors de la création de l'installateur macOS: {e}")
        return False

def create_linux_package():
    """Crée un package Linux (.deb)"""
    print("🐧 Création du package Linux (.deb)...")
    
    # Créer la structure du package
    package_dir = Path('sentinel-voice_1.0.1')
    package_dir.mkdir(exist_ok=True)
    
    # Structure DEBIAN
    debian_dir = package_dir / 'DEBIAN'
    debian_dir.mkdir(exist_ok=True)
    
    # Fichier control
    control_content = '''Package: sentinel-voice
Version: 1.0.1
Section: utils
Priority: optional
Architecture: amd64
Depends: libc6 (>= 2.17), libportaudio2
Maintainer: Sentinel Voice Team <contact@sentinel-voice.com>
Description: Assistant vocal intelligent et sécurisé
 Sentinel Voice est un assistant vocal moderne qui fonctionne
 principalement hors-ligne avec une interface React.
 Il supporte la reconnaissance vocale multilingue et
 la synthèse vocale naturelle.
'''
    
    with open(debian_dir / 'control', 'w', encoding='utf-8') as f:
        f.write(control_content)
    
    # Structure usr/local/bin
    bin_dir = package_dir / 'usr' / 'local' / 'bin'
    bin_dir.mkdir(parents=True, exist_ok=True)
    
    # Copier l'exécutable
    if os.path.exists('dist/Sentinel-Linux'):
        import shutil
        shutil.copy('dist/Sentinel-Linux', bin_dir / 'sentinel-voice')
        os.chmod(bin_dir / 'sentinel-voice', 0o755)
    
    try:
        # Créer le package .deb
        run_command(['dpkg-deb', '--build', str(package_dir)])
        
        # Renommer
        if os.path.exists('sentinel-voice_1.0.1.deb'):
            os.rename('sentinel-voice_1.0.1.deb', 'sentinel-voice_1.0.1_amd64.deb')
            print("✅ Package Linux créé: sentinel-voice_1.0.1_amd64.deb")
            return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Erreur lors de la création du package Linux: {e}")
        return False
    finally:
        # Nettoyer
        import shutil
        if package_dir.exists():
            shutil.rmtree(package_dir)

def main():
    """Fonction principale"""
    print("📦 Création des packages d'installation...")
    
    # Vérifier que les exécutables existent
    if not os.path.exists('dist/'):
        print("❌ Dossier dist/ non trouvé. Lancez d'abord: python build_exe.py")
        return False
    
    success = True
    
    # Créer les packages selon l'OS
    if platform.system() == 'Windows':
        success &= create_windows_installer()
    elif platform.system() == 'Darwin':  # macOS
        success &= create_macos_installer()
    elif platform.system() == 'Linux':
        success &= create_linux_package()
    else:
        print(f"❌ OS non supporté: {platform.system()}")
        return False
    
    if success:
        print("\n🎉 Packages d'installation créés avec succès !")
    else:
        print("\n❌ Erreurs lors de la création des packages")
    
    return success

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1) 