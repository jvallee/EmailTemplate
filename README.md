CONTENTS OF THIS FILE
---------------------

 * Introduction
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
   
   
REQUIREMENTS
------------

This application requires the following modules:

 * django
 * open-api-generator
 
 For this application to work it also requires that postgres be installed and running, and that python3 be installed.
 For info on installing python look [here](https://realpython.com/installing-python/) and for info on mongodb look here
 [here](https://docs.mongodb.com/manual/administration/install-community/) 
 
 
 INSTALLATION
------------
 
Note: these setup instruction are mac specific, but can be applied to windows with little to no changes.


 
 
APPLICATION ARCHITECTURE/DESCRIPTION
------------
###  Apartment Management
The goal of this application is to add the user in managing one too many apartments. An apartment consists of occupants 
and tasks; it is important to note that the user does not need to be an occupant to manage the apartment. Tasks can be
recurring or one offs, decided by the user upon task creation. 



TESTING
------
After running the application enter "t" in the terminal to enter testing mode. 

FAQ
---

Q: Does this application work on windows? <br/>
A: Yes it does. However, for best UI experience we recommend that you use a mac due to added text coloring that is not 
guaranteed to function properly in windows.

Q: The test in the terminal is hard to see, is there any way to change that? <br/>
A: This might be due to the fact that your terminal background color is white. It is an aesthetically better 
experience if your terminal's background is not set to the default white but rather black. 

Q: Whe I first try to run this program I get this error in the terminal 'No connection could be made because the 
target machine actively refused it', how do i fix this? <br/>
A: This is probably because you do not have mongodb installed and if you do have it installed you do not have it 
running. Look at the link provided above for installing it and if you need help starting it look 
[here for windows](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/) and 
[here for mac](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)

MAINTAINERS
-----------

Current maintainers:
 * Jason Vallee - last updated November 2, 2020
