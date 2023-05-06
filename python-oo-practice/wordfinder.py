"""Word Finder: finds random words from a dictionary."""

import random

class WordFinder:
    def __init__(self,file_location):
        master_file = open(file_location)
        self.words = self.parse(master_file)
        print(f'{len(self.words)} words read.')

    def parse(self, master_file):
        return [i.strip() for i in master_file]

    def random(self):
        return random.choice(self.words)

class SpecialWordFinder(WordFinder):
    def parse(self, master_file):
        return [i.strip() for i in master_file
            if i.strip() and not i.startswith('#')]