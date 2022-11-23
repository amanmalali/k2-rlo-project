from flask import Flask, render_template, session,request
from flask_socketio import SocketIO, emit
from flask_session import Session
from uuid import uuid4
import json
import random
random.seed(42)
app = Flask(__name__, template_folder="./frontend/template", static_folder="./frontend/static")
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

# @app.route('/')
# def index():
#     return render_template('index.html')

app.config['SECRET_KEY'] = uuid4().hex

app.config["SESSION_PERMANENT"] = True
app.config["SESSION_TYPE"] = "filesystem"
Session(app)



socketio = SocketIO(app)
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_recipe')
def get_recipe():
    f=open("./recipe.json")
    data=json.load(f)
    k=random.randint(0,len(data['recipes'])-1)
    print(data)
    print(k) 
    recipes=list(data["recipes"].keys())
    sel_recipe=recipes[k]
    recipe_obj={"name":sel_recipe,"recipe":data["recipes"][sel_recipe]}
    return json.dumps(recipe_obj)

@app.route('/input/', methods=('GET', 'POST'))
def create():
    if request.method == 'POST':
        l=[]
        message="Enter Recipe"
        name=request.form["name"]
        for i in range(0,len(request.form)-1):
            if 'member'+str(i) in request.form:
                l.append(request.form['member'+str(i)])
            else:
                print(l)
                break
        f=open("./recipe.json")
        data=json.load(f)
        f.close()
        if name not in data["recipes"]:
            data["recipes"][name]=l
            with open("./recipe.json", "w") as outfile:
                json.dump(data, outfile)
            message="Recipe Successfully Added"
        else:
            message="Error: Recipe already exists"
        
        print("MESSAGE",message)
        
        return render_template('input.html',error=str(message))  
        
        # title = request.form['member1']
        # content = request.form['member2']
        # print(request.form.keys())


    return render_template('input.html')




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