import requests
import os
import json
import subprocess
import sys

class AutoUpdater:
    def __init__(self, update_url, local_version_file="version.json"):
        self.update_url = update_url
        self.local_version_file = local_version_file
        self.local_version = self.get_local_version()

    def get_local_version(self):
        if os.path.exists(self.local_version_file):
            with open(self.local_version_file, "r") as f:
                return json.load(f).get("version", "0.0.0")
        return "0.0.0"

    def check_update(self):
        try:
            r = requests.get(self.update_url)
            if r.status_code == 200:
                remote = r.json()
                if remote["version"] != self.local_version:
                    return remote
        except Exception as e:
            print("Erreur de mise à jour:", e)
        return None

    def apply_update(self, remote):
        # Exemple: mise à jour des commandes
        if "commands" in remote:
            with open("commands.json", "w", encoding="utf-8") as f:
                json.dump(remote["commands"], f, ensure_ascii=False, indent=2)
        # Met à jour la version locale
        with open(self.local_version_file, "w") as f:
            json.dump({"version": remote["version"]}, f)

def update_from_github():
    print("\nMise à jour depuis GitHub...")
    try:
        result = subprocess.run(["git", "pull"], check=True, capture_output=True, text=True)
        print(result.stdout)
        print("✅ Mise à jour réussie !")
    except subprocess.CalledProcessError as e:
        print(f"❌ Erreur lors de la mise à jour : {e.stderr}")
        sys.exit(1)

if __name__ == "__main__":
    update_from_github() 