import json
import os
from rapidfuzz import fuzz, process

class CommandManager:
    def __init__(self, db_path="commands.json"):
        self.db_path = db_path
        self.commands = []
        self.load()

    def load(self):
        if os.path.exists(self.db_path):
            with open(self.db_path, "r", encoding="utf-8") as f:
                self.commands = json.load(f)
        else:
            self.commands = []

    def save(self):
        with open(self.db_path, "w", encoding="utf-8") as f:
            json.dump(self.commands, f, ensure_ascii=False, indent=2)

    def add_command(self, phrase, action):
        self.commands.append({"phrase": phrase, "action": action})
        self.save()

    def find_best(self, user_input, threshold=80):
        if not self.commands:
            return None
            
        phrases = [cmd["phrase"] for cmd in self.commands]
        result = process.extractOne(user_input, phrases, scorer=fuzz.token_sort_ratio)
        
        if result is None:
            return None
            
        match, score, idx = result
        if score >= threshold:
            return self.commands[idx]
        return None

    def enrich_with_variants(self, base_phrase, variants, action):
        for v in variants:
            self.add_command(v, action)

    def learn_from_user(self, user_input, action):
        self.add_command(user_input, action) 