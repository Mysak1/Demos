# QuickStart description


## NodejsWebApi setup

#### Install Nodejs LTS
https://nodejs.org/en/

#### Open command line, set directory to this project folder ..../NodejsWebApi

#### Install missing packages (express, request, redis, jasmine)
npm install

#### Start application
npm start

##### Or start application by nodemon (You can install nodemon globally by npm i -g nodemon)
nodemon

#### Run all tests in project
npm test

##### Or run specified test in project
npm test spec/server.spec.js

#### Manual test instructions
Install and open Postman https://www.getpostman.com
POST some JSON body to http://localhost:1337/track
If the data contains a "count" parameter, the application increments the value of the "count" key by the value of the "count" parameter in a Redis database.
Data are saved to file track.txt in project folder.
In browser or postman GET http://localhost:1337/count
It returns value of the "count" key from the Redis database.


## Angular2WebApp setup

#### Install Nodejs LTS:
https://nodejs.org/en/

#### Open command line, set directory to this project folder ..../Angular2WebApp

#### Install typescript globally
npm i -g typescript

#### Install missing packages
npm install

#### Start application
npm start

#### Run all tests in project
npm test
