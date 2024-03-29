from unittest import TestCase
from main import app
from flask import session
from boggle import Boggle


class FlaskTests(TestCase):

    def setUp(self):
     

        self.client = app.test_client()
        app.config['TESTING'] = True

    def test_homepage(self):
        

        with self.client:
            response = self.client.get('/')
            self.assertIn('game_board', session)
            self.assertIsNone(session.get('highscore'))
            self.assertIsNone(session.get('playsAttempt'))
            self.assertIn(b'<p>Top Score:', response.data)
            self.assertIn(b'Score:', response.data)
            self.assertIn(b'Seconds Left:', response.data)

    def test_valid_word(self):
        """Test if word is valid by modifying the board in the session"""

        with self.client as client:
            with client.session_transaction() as sess:
                sess['game_board'] = [["D", "O", "G", "G", "G"],
                                      ["D", "O", "G", "G", "G"],
                                      ["D", "O", "G", "G", "G"],
                                      ["D", "O", "G", "G", "G"],
                                      ["D", "O", "G", "G", "G"]]
        response = self.client.get('/check-word?word=dog')
        self.assertEqual(response.json['result'], 'ok')

    def test_invalid_word(self):
        

        self.client.get('/')
        response = self.client.get('/check-word?word=thiswordisnotreal')
        self.assertEqual(response.json['result'], 'not-on-board')

    def non_english_word(self):

        self.client.get('/')
        response = self.client.get(
            '/check-word?word=fsjdakfkldsfjdslkfjdlksf')
        self.assertEqual(response.json['result'], 'not-word')
