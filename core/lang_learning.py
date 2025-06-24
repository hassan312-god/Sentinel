import difflib
import json
import os

class LangLearning:
    def __init__(self, vocab_file="vocab.json"):
        self.vocab_file = vocab_file
        self.vocab = set()
        self.load()

    def load(self):
        if os.path.exists(self.vocab_file):
            with open(self.vocab_file, "r", encoding="utf-8") as f:
                self.vocab = set(json.load(f))
        else:
            self.vocab = set()

    def save(self):
        with open(self.vocab_file, "w", encoding="utf-8") as f:
            json.dump(list(self.vocab), f, ensure_ascii=False, indent=2)

    def add_word(self, word):
        self.vocab.add(word.lower())
        self.save()

    def suggest_correction(self, word):
        matches = difflib.get_close_matches(word.lower(), self.vocab, n=1, cutoff=0.8)
        return matches[0] if matches else None

    def enrich_from_text(self, text):
        for word in text.split():
            self.add_word(word) 