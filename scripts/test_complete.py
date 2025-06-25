#!/usr/bin/env python3
"""
Script de test complet pour Sentinel Voice
Vérifie tous les composants du projet
"""

import os
import sys
import subprocess
import json
import platform
from pathlib import Path

class SentinelTester:
    def __init__(self):
        self.errors = []
        self.warnings = []
        self.success_count = 0
        self.total_tests = 0
    
    def log_success(self, message):
        """Log un succès"""
        print(f"✅ {message}")
        self.success_count += 1
        self.total_tests += 1
    
    def log_error(self, message):
        """Log une erreur"""
        print(f"❌ {message}")
        self.errors.append(message)
        self.total_tests += 1
    
    def log_warning(self, message):
        """Log un avertissement"""
        print(f"⚠️  {message}")
        self.warnings.append(message)
    
    def test_python_dependencies(self):
        """Teste les dépendances Python"""
        print("\n🐍 TEST DES DÉPENDANCES PYTHON")
        print("-" * 40)
        
        try:
            import speech_recognition
            self.log_success("SpeechRecognition installé")
        except ImportError:
            self.log_error("SpeechRecognition manquant")
        
        try:
            import pyttsx3
            self.log_success("pyttsx3 installé")
        except ImportError:
            self.log_error("pyttsx3 manquant")
        
        try:
            import pygame
            self.log_success("pygame installé")
        except ImportError:
            self.log_error("pygame manquant")
        
        try:
            import PyQt6
            self.log_success("PyQt6 installé")
        except ImportError:
            self.log_warning("PyQt6 manquant (optionnel)")
    
    def test_react_dependencies(self):
        """Teste les dépendances React"""
        print("\n⚛️  TEST DES DÉPENDANCES REACT")
        print("-" * 40)
        
        web_ui_path = Path("web-ui")
        if not web_ui_path.exists():
            self.log_error("Dossier web-ui manquant")
            return
        
        package_json = web_ui_path / "package.json"
        if not package_json.exists():
            self.log_error("package.json manquant")
            return
        
        try:
            with open(package_json, 'r') as f:
                data = json.load(f)
            
            required_deps = ['react', 'react-dom', 'styled-components', 'framer-motion']
            for dep in required_deps:
                if dep in data.get('dependencies', {}):
                    self.log_success(f"{dep} configuré")
                else:
                    self.log_warning(f"{dep} manquant")
        
        except Exception as e:
            self.log_error(f"Erreur lecture package.json: {e}")
    
    def test_file_structure(self):
        """Teste la structure des fichiers"""
        print("\n📁 TEST DE LA STRUCTURE DES FICHIERS")
        print("-" * 40)
        
        required_files = [
            "main.py",
            "requirements.txt",
            "README.md",
            "core/commands.py",
            "voice/recognizer.py",
            "web-ui/src/App.js",
            "download-site/index.html"
        ]
        
        for file_path in required_files:
            if os.path.exists(file_path):
                self.log_success(f"{file_path} présent")
            else:
                self.log_error(f"{file_path} manquant")
        
        # Test des dossiers
        required_dirs = ["core", "voice", "ui", "web-ui", "config", "scripts"]
        for dir_path in required_dirs:
            if os.path.isdir(dir_path):
                self.log_success(f"Dossier {dir_path} présent")
            else:
                self.log_error(f"Dossier {dir_path} manquant")
    
    def test_build_script(self):
        """Teste le script de build"""
        print("\n🔨 TEST DU SCRIPT DE BUILD")
        print("-" * 40)
        
        if not os.path.exists("build_exe.py"):
            self.log_error("build_exe.py manquant")
            return
        
        try:
            # Test en mode test-only
            result = subprocess.run(
                [sys.executable, "build_exe.py", "--test-only"],
                capture_output=True,
                text=True,
                timeout=30
            )
            
            if result.returncode == 0:
                self.log_success("Script de build fonctionne")
            else:
                self.log_error(f"Script de build échoué: {result.stderr}")
        
        except subprocess.TimeoutExpired:
            self.log_error("Script de build timeout")
        except Exception as e:
            self.log_error(f"Erreur test build: {e}")
    
    def test_workflow_files(self):
        """Teste les fichiers de workflow GitHub"""
        print("\n🔄 TEST DES WORKFLOWS GITHUB")
        print("-" * 40)
        
        workflow_dir = Path(".github/workflows")
        if not workflow_dir.exists():
            self.log_error("Dossier .github/workflows manquant")
            return
        
        required_workflows = ["release.yml", "test.yml"]
        for workflow in required_workflows:
            workflow_file = workflow_dir / workflow
            if workflow_file.exists():
                self.log_success(f"Workflow {workflow} présent")
            else:
                self.log_error(f"Workflow {workflow} manquant")
    
    def test_scripts(self):
        """Teste les scripts utilitaires"""
        print("\n📜 TEST DES SCRIPTS")
        print("-" * 40)
        
        scripts_dir = Path("scripts")
        if not scripts_dir.exists():
            self.log_error("Dossier scripts manquant")
            return
        
        required_scripts = [
            "auto_release.py",
            "test_release.py", 
            "create_installers.py",
            "metrics.py"
        ]
        
        for script in required_scripts:
            script_file = scripts_dir / script
            if script_file.exists():
                self.log_success(f"Script {script} présent")
            else:
                self.log_error(f"Script {script} manquant")
    
    def test_config_files(self):
        """Teste les fichiers de configuration"""
        print("\n⚙️  TEST DES FICHIERS DE CONFIGURATION")
        print("-" * 40)
        
        config_files = [
            "config/voice_config.json",
            "core/commands.json",
            "web-ui/.eslintrc.js"
        ]
        
        for config_file in config_files:
            if os.path.exists(config_file):
                self.log_success(f"{config_file} présent")
            else:
                self.log_warning(f"{config_file} manquant")
    
    def test_react_build(self):
        """Teste le build React"""
        print("\n⚛️  TEST DU BUILD REACT")
        print("-" * 40)
        
        web_ui_path = Path("web-ui")
        if not web_ui_path.exists():
            self.log_error("Dossier web-ui manquant")
            return
        
        try:
            # Vérifier que node_modules existe
            node_modules = web_ui_path / "node_modules"
            if node_modules.exists():
                self.log_success("node_modules présent")
            else:
                self.log_warning("node_modules manquant (lancez npm install)")
            
            # Test du build (sans l'exécuter complètement)
            package_json = web_ui_path / "package.json"
            if package_json.exists():
                with open(package_json, 'r') as f:
                    data = json.load(f)
                
                if 'build' in data.get('scripts', {}):
                    self.log_success("Script build configuré")
                else:
                    self.log_error("Script build manquant")
        
        except Exception as e:
            self.log_error(f"Erreur test React: {e}")
    
    def run_all_tests(self):
        """Lance tous les tests"""
        print("🧪 TESTS COMPLETS SENTINEL VOICE")
        print("=" * 50)
        
        self.test_file_structure()
        self.test_python_dependencies()
        self.test_react_dependencies()
        self.test_config_files()
        self.test_scripts()
        self.test_workflow_files()
        self.test_build_script()
        self.test_react_build()
        
        # Résumé
        print("\n" + "=" * 50)
        print("📊 RÉSUMÉ DES TESTS")
        print("=" * 50)
        print(f"✅ Succès: {self.success_count}/{self.total_tests}")
        print(f"❌ Erreurs: {len(self.errors)}")
        print(f"⚠️  Avertissements: {len(self.warnings)}")
        
        if self.errors:
            print(f"\n❌ ERREURS À CORRIGER:")
            for error in self.errors:
                print(f"  • {error}")
        
        if self.warnings:
            print(f"\n⚠️  AVERTISSEMENTS:")
            for warning in self.warnings:
                print(f"  • {warning}")
        
        if not self.errors:
            print(f"\n🎉 Tous les tests critiques sont passés !")
            return True
        else:
            print(f"\n🔧 Veuillez corriger les erreurs avant de continuer.")
            return False

def main():
    """Fonction principale"""
    tester = SentinelTester()
    success = tester.run_all_tests()
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main() 