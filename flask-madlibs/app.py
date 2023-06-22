from flask import Flask
from stories import story

app = Flask(__name__)

@app.route('/')
def get_input():

    return render_template('main.html')

@app.route('/madlibstory')
def return_story():
    madlib_story = story.generate(request.args)

    return render_template('madlibstory.html', madlib_story=madlib_story)