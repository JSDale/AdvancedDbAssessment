# ReadMe.md

## Running the application locally

*this has only been tested on Windows 10*

#### You will need:

* Visual Studio Code (vs code)
* Node JS installed
* NPM installed
* MongoDB installed

#### How to set up the environment

* Open the folder containing the project in vs code.
* Run npm install
* Edit the MongoDB_URI within the .env file to your local database,  for example MONGODB_URI=mongodb://localhost:27017/YouthGroup
* Do the same as the previous step, but in the seeder.js file.
* Type in the terminal node seeder.js
* You can check MongoDB to ensure the seeder file worked. If it did run npm run dev

#### Running the app locally

* Open a browser of your choice and enter the URL localhost//:<the port in the .env file>/  *the default port in .env is 2020*.
* This should open the home page of the web app. 

## Running the Application in Production

*this has only been tested on Windows 10*

#### You will need:

* Visual Studio Code (vs code)
* Node JS installed

