CONTENTS OF THIS FILE
---------------------

 * Introduction
 * Technologies
 * Requirements
 * Recommended modules
 * Installation
 * Application Architecture 
 * Testing
 * Bonus Content
 * FAQ
 * Maintainers
 
 
 INTRODUCTION
------------

This README is currently under construction. This project is a fullstack application with Typescript/React on the frontend and Django managing a Postgres server on the backend. The purpose of this project is too provide a web interface that helps to manage template emails to be used to send out numerous customizable outreach messages. In the current setup, the user logins in, selects a "job" to edit the outreach for, then is taken to the Outreach Editor Page where they can edit, save, or publish publish their outreach template. Note that both the login in functionality and the alljobs page are very bare bones and will be updated with time.


 * This application was developed in PyCharm and Visual Studio code. It is recommended that be used to debug but not by any means required.

### Technologies

This application uses the following technologies:

- Languages:  TypeScript
- Frontend: [React](https://reactjs.org/docs/getting-started.html)
- Languages: Python (3.7.5+)
- API: [Django](https://www.djangoproject.com/) and the [Django Rest Framework](https://www.django-rest-framework.org/)
- API Documentation: [Swagger](https://swagger.io/), [drf-yasg](https://github.com/axnsan12/drf-yasg), and [openapi-generator](https://github.com/OpenAPITools/openapi-generator)
- Persistence: [Postgres](https://www.postgresql.org/) and the [Django ORM](https://docs.djangoproject.com/en/3.0/topics/db/)
   
   
REQUIREMENTS
------------

Before starting this application requires the following installed on your computer:

 * python (version 3.9.1 is used in this project) and pip
 * node.js
 * openapi-generator (Recommended not required) can install with homebrew 
 
 
 INSTALLATION
------------
 

Note: these setup instruction are mac specific, but can be applied to windows with little to no changes.
1. make sure you have python installed on your machine (can check by going to the terminal and typing in python --version or python3 --version) if not installed, install 

2. next make sure you have pip installed (pip for python3 can check by running pip --version or pip3 --version)

3. then navigate to the folder "EmailTemplate" in your terminal or use git clone to create

4. Now if you want to set up a virtual environment, change into djangoProject folder which will contain our backend and
in your terminal type in "python3 -m venv .env --copies" --copies only required on macOS, if you don't want to ignore 
this step (ignoring is not recommended). Alternatively, PyCharm can handle this for you automatically

5. then type "pip3 install -r requirements.txt" and hit return

6. Run "python manage.py loaddata initDb.json" to load in some initial data, 
   
7. To start the backend run "python manage.py runserver" 

8. For the fronend navigate to EmailTemplate/frontend and run npm install.

9. After that run npm start, to start up the frontend


Now that you have the application running, click the login button, and then hit the all jobs link to see a list of jobs that you can edit the outreach template for. If yo did not load in the initial data, this page will be blank. Then select any job and you will be taken to the editor.

 
APPLICATION ARCHITECTURE/DESCRIPTION
------------
###  Outreach Management
The goal of this application is to add the user in reaching out to multiple companies or points of contacts regarding services provided. In our data structure we have clients, jobs, and outreaches. Clients have a one to many relationships with jobs, jobs have a one to many relationship with Outreach.


### View API docs

Go to [http://localhost:8000/api/schema/redoc/](http://localhost:8000/api/schema/redoc/) or [http://localhost:8000/api/schema/swagger-ui/](http://localhost:8000/api/schema/swagger-ui/) 

### View the app

Go to [http://localhost:3000/](http://localhost:3000/)

### View the contents of Database
Go to [http://localhost:8000/admin/](http://localhost:8000/admin/)


### Misc backend tools

To support your development certain tools are available via the Django
management commands.  NOTE: These should not be necessary to run the app.

Run manage commands: e.g.

```
# Open a python shell connected to the database
$ python manage.py shell_plus --plain
# or make migration
$ python manage.py makemigrations 
# or apply migration
$ python manage.py migrate
```
Note: you can create Clients, Jobs, and Outreaches in the python shell. Might be easier to do this in 

### Client Generator
Generating the frontend client

You only need to do this if you modify the API.


FAQ
---

Q: Does this application work on windows? <br/>
A: Yes it does. However, for best development experience we recommend that you use a mac.

Q: What is the next steps for this project?
A: There are many possible directions to head. Probably switching from openapi-generator to another client generator would be a good next step due to the unresolved bugs found in there (such as those regarding conversion to camelCase), setting up text replacement, and setting up an OAuth for login to help ensure data security. 


MAINTAINERS
-----------

Current maintainers:
 * Jason Vallee - last updated February 7, 2020
