from flask import Flask, render_template, session,request
from uuid import uuid4
import json
import random
random.seed(42)
app = Flask(__name__, template_folder="./frontend/template", static_folder="./frontend/static")
app.config['SECRET_KEY'] = 'secret!'


app.config['SECRET_KEY'] = uuid4().hex

app.config["SESSION_PERMANENT"] = True
app.config["SESSION_TYPE"] = "filesystem"

url="http://127.0.0.1:5000"
pwd="."


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/get_recipe_random')
def get_recipe_random():
    f=open(pwd+"/recipe.json")
    data=json.load(f)
    k=random.randint(0,len(data['recipes'])-1)
    recipes=list(data["recipes"].keys())
    sel_recipe=recipes[k]
    recipe_obj={"name":sel_recipe,"recipe":data["recipes"][sel_recipe]}
    return json.dumps(recipe_obj)

@app.route('/get_recipe_name')
def get_recipe_name():
    if request.method=='GET':
        recipe_name=request.args.get("name")
        f=open(pwd+"/recipe.json")
        data=json.load(f)
        if recipe_name in data["recipes"]:
            recipe_obj={"name":recipe_name,"recipe":data["recipes"][recipe_name]}
            return json.dumps(recipe_obj)
        else:
            error={"Error":"Recipe not found"}
            return json.dumps(error)

@app.route('/list_recipes')
def list_recipes():
    f=open(pwd+"/recipe.json")
    data=json.load(f)
    recipes=list(data["recipes"].keys())
    list_recipe={"recipes":recipes}
    return json.dumps(list_recipe)


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
        f=open(pwd+"/recipe.json")
        data=json.load(f)
        f.close()
        if name not in data["recipes"]:
            data["recipes"][name]=l
            with open(pwd+"/recipe.json", "w") as outfile:
                json.dump(data, outfile)
            message="Recipe Successfully Added"
        else:
            message="Error: Recipe already exists"
        
        print("MESSAGE",message)
        
        return render_template('input.html',error=str(message))  

    return render_template('input.html')


if __name__ == '__main__':
    app.run()