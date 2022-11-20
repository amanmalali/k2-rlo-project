from flask import Flask, render_template, session
from flask_socketio import SocketIO, emit
from flask_session import Session
from uuid import uuid4

app = Flask(__name__, template_folder="./frontend/template", static_folder="./frontend/static")
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template('index.html')

app.config['SECRET_KEY'] = uuid4().hex

app.config["SESSION_PERMANENT"] = True
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

socketio = SocketIO(app)
@app.route('/')
def index():
    return render_template('index.html')

# @app.route('/static/script.js')
# def script():
#      return render_template('/static/script.js')

@socketio.on('play_as_teacher')
def play_as_teacher():
    session["role"] = "teacher"
    emit('teacher_joined_response', {'data': "teacher has joined"}, broadcast=True)

@socketio.on('play_as_student')
def play_as_student():
    session["role"] = "student"
    emit('student_joined_response', {'data': "student has joined"}, broadcast=True)

@socketio.on('create_recipe')
def create_recipe(recipe):
    if session["role"] == "teacher":
        session["recipe"] = recipe
        #Clients get the unshuffled (actual) recipe. It is upto the client to shuffle it.
        emit('new recipe added', {'data': recipe}, broadcast=True)

@socketio.on('on_correct_ordering')
def on_correct_ordering():
    if session["role"] == "student":
        # When teacher gets this message the client has to prompt the teacher to create a new recipe
        emit('student has correctly ordered the recipe!', {'data' : True}, broadcast=True)

if __name__ == '__main__':
    socketio.run(app)