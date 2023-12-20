from flask import Flask, Blueprint, render_template, session, jsonify, request
from boggle import Boggle

boggle_game = Boggle()
views = Blueprint('views', __name__)


@views.route("/")
def homepage():

    board = boggle_game.make_board()
    session['board'] = board
    highscore = session.get("highscore", 0)
    playAttempts = session.get("playAttempts", 0)

    return render_template("base.html", board=board, highscore=highscore, playAttempts=playAttempts)


@views.route("/check-word")
def check_word():

    word = request.args["word"]
    board = session["board"]
    response = boggle_game.check_valid_word(board, word)

    return jsonify({'result': response})


@views.route("/post-score", methods=["POST"])
def post_score():

    score = request.json["score"]
    highscore = session.get("highscore", 0)
    playAttempts = session.get("playAttempts", 0)

    session['playAttempts'] = playAttempts + 1
    session['highscore'] = max(score, highscore)

    return jsonify(brokeRecord=score > highscore)
