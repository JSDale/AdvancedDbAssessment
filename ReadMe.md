# ReadMe.md

## Running the application locally

*this has only been tested on Windows 10*

*both of the users in the JSON file have passwords of: test1234*

#### You will need:

* Visual Studio Code (vs code)
* Node JS installed
* NPM installed
* MongoDB installed

#### How to set up the environment

* Open the folder containing the project in vs code.
* Run npm install
* Enter in the terminal node seeder.js
* Enter run npm run dev in the terminal

#### Running the app locally

* Open a browser of your choice and enter the URL localhost//:<the port in the .env file>/  *the default port in .env is 2020*.
* This should open the home page of the web app. 

## Running the Application in Production

*this has only been tested on Windows 10*

#### You will need:

* Visual Studio Code (vs code)
* Node JS installed
* NPM installed
* Heroku CLI installed
* Git CLI installed

#### How to set up the environment

* Open the folder containing the project in vs code.
* Run npm install
* Type in the terminal node seeder.js
* Go to https://nameless-savannah-04348.herokuapp.com/ you should see the home page load up.
* If you make cahnges and want that to apply in the Heroku server you must run these command:
* * heroku login
* * heroku create *Note, this will change the URL as it will host in your account.*
* * git add --a
* * git commit -m"<message>"
* * git push origin main *or master*
* * git push heroku main *or master*
