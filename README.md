# Demos repository


## NodejsWebApi setup

### Install Nodejs LTS
<a https://nodejs.org/en/></a>

### Open command line, set directory to this project folder

### Install missing packages(express, request, redis, jasmine)
npm install

### Start application
npm start

#### Or start application by nodemon
nodemon

#### Install nodemon globally
npm i -g nodemon

### Run all tests in project
npm test

#### Or run specified test in project
npm test spec/server.spec.js

### Manual test instructions
Install and open Postman.
POST some JSON body to http://localhost:1337/track
If the data contains a "count" parameter, the application increments the value of the "count" key by the
value of the "count" parameter in a Redis database.
Data are saved to file track.txt in project folder.
In browser or postman GET <a http://localhost:1337/count></a>
It returns value of the "count" key from the Redis database.


## Angular2WebApp setup

### Install Nodejs LTS:
<a https://nodejs.org/en/></a>

### Open command line, set directory to this project folder.

### Install typescript globally
npm i -g typescript

### Install missing packages
npm install

### Start application
npm start

### Run all tests in project
npm test
