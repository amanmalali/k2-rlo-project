# k2-rlo-project
## Summary
The current application is a web-based, browser game that runs on javascript and a simple, lean backend comprised of XML data and flask integration. It currently contains competitive elements and features but that isn't the goal of the MVP. The project goal (detailed below) is to serve as a measurement tool for the computational thinking abilities of yound students from K-2.
Core Features should include:
 - Core game mechanic of organizing recipes and breaking down a complex problem into a series of simple steps
 - The ability for teachers and students to input cultural cuisine/recipes
 - Engage multiple forms of sensory feedback, achieve a high level of accessibility within the task constraints.
 - Cross-platform, open-sourced content
 
Hosted on [Github](http://k2rlo.pythonanywhere.com/)
## Goal
This project aims to analyze and improve the computational thinking skills of students in K2 and beyond, by creating an application to test these skills using the real world example of cooking recipes. It should serve as a fun, useful metric for teachers to gauge a students ability in this particular task.

## Requirements
* Flask
* Requests
* json

## Running locally
* Install the required python packages
* Run app.py
* The application will now run on http://127.0.0.1:5000/

## Running on PythonAnywhere
* Create a Python Anywhere account, or contact collaborators for access to the current account
* Create a Bash session and clone this repository
* Move files to /mysite/ directory
* Edit wsgi file to specify the main flask file, app.py in this case.
* Reload the website

## Routes
* / : This is the home page, renders home.html. Let's students pick recipes or play a random recipe.
* /index : This is the main game page, renders index.html. Implements the drag and drop features and also the check functions.
* /input : This page lets instructors add new recipes.

## Intended learning outcomes (ILOs) for students:
Students should be able to analyze real world examples and break them down into their constituent steps. They should also be able to apply algorithmic skills to further order these steps sequentially, similar to how they would perform them in the real world.
## Intended Workflow
 * Phase One
     * Teacher: Begins activity introduction, helps students begin activity
     * Student: Find, Login and Begin the game
 * Phase two
     * Teacher: Observe analytics, assist students as needed
     * Student: Students continue to play the game
 * Phase three
     * Teacher: Ends activity, allows brainstorming of new recipes and images
     * Student: Participate in brainstorming
## Structure
 * [flask_app](https://github.com/amanmalali/k2-rlo-project/tree/main/app.py)
 * [frontend](https://github.com/amanmalali/k2-rlo-project/tree/main/frontend)
     * [static](https://github.com/amanmalali/k2-rlo-project/tree/main/frontend/static): Stores functions/data not subject to change
         * [css](https://github.com/amanmalali/k2-rlo-project/tree/main/frontend/static/css): Stores CSS Template
             * [fonts](https://github.com/amanmalali/k2-rlo-project/tree/main/frontend/static/css/fonts): Stores Open Sources Fonts
         * [images](https://github.com/amanmalali/k2-rlo-project/tree/main/frontend/static/images): Stores DALL-E Images
         * [scripts](https://github.com/amanmalali/k2-rlo-project/tree/main/frontend/static/scripts): Stores scripts for game, background image and etc... 
     * [template](https://github.com/amanmalali/k2-rlo-project/tree/main/frontend/template): Stores web links
## Features
 * Core Game Mechanic
 * Drag and drop recipe items
 * Recipe and background image storage
 * Changing background
 * (Deprecated) Colored text feedback
 * (Deprecated) Audio system
 * (Deprecated) Scoring system
 * (Deprecated) Ranked game-mode
## Future Work
 * Demo and tutorial
 * User login
 * Adding a grocery system to gather ingredients for a recipe
 * Passively montoring student metrics for teacher assessment
 * Creating student analytics for teachers (mean, mode, std of points, time spent on a problem, etc...)
 * Developing the data storage and backend systems away from XML
 * Restructring the frontend with React
