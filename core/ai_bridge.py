import requests

class AIBridge:
    def __init__(self, api_url=None, api_key=None):
        self.api_url = api_url
        self.api_key = api_key

    def set_api(self, api_url, api_key):
        self.api_url = api_url
        self.api_key = api_key

    def ask(self, prompt, lang="fr"):
        if not self.api_url or not self.api_key:
            return "Aucune API IA configurée."
        headers = {"Authorization": f"Bearer {self.api_key}"}
        data = {"prompt": prompt, "lang": lang}
        try:
            r = requests.post(self.api_url, headers=headers, json=data, timeout=20)
            if r.status_code == 200:
                return r.json().get("response", "")
            return f"Erreur API IA: {r.status_code}"
        except Exception as e:
            return f"Erreur de connexion à l'IA: {e}" 