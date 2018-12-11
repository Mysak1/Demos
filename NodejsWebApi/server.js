'use strict';
const port = process.env.PORT || 1337;
const filename = 'track.txt';
const lineending = '\r\n';
const redisPort = '6379';
const redisHost = '127.0.0.1';
const keyForCount = 'count';

const fs = require('fs');
const redis = require('redis');     // npm i redis
const express = require('express'); // npm i express
const app = express();
app.use(express.json());

// Redis database.
var client = redis.createClient(redisPort, redisHost);

client.on('connect', function () {
    console.log('Redis client connected');
});

client.on('error', function (err) {
    console.log('Redis client error: ' + err);
});

// Receive HTTP POST requests only on a "/track" route.
app.post('/track', (req, res) => {
    // Gets data in JSON format passed in the request body.
    var data = JSON.stringify(req.body);

    // Save the JSON data into a local file (append).
    fs.appendFile(filename, data + lineending, (err) => {
        if (err) console.log(err);
        else console.log(`Updated file ${filename}`);
    });

    // If the data contains a "count" parameter, the application increments the value of the "count" key by the
    // value of the 'count' parameter in a Redis database.
    if (req.body.count) {
        var count = parseInt(req.body.count);
        if (!isNaN(count)) {
            client.get(keyForCount, (err, result) => {
                if (err) console.log(err);
                else {
                    var oldCount = parseInt(result);
                    if (isNaN(oldCount)) oldCount = 0;
                    client.set(keyForCount, (oldCount + count).toString(), redis.print);
                    console.log(`Count incremented by ${count}, Total count is ${oldCount + count}`);
                }
            });
        }
    }

    res.sendStatus(200);
});

// Receive HTTP GET requests only on a "/count" route.
app.get('/count', (req, res) => {
    // Return the value of the "count" key from the Redis database.
    client.get(keyForCount, (err, result) => {
        if (err) {
            console.log(err);
            res.err(err);
        }
        else{
            console.log(`Total count is ${result}`);
            res.send(result);
        }
    });
});

// Start server.
var server = app.listen(port, () => {
    console.log(`Listening on port: ${port}...`);
});

module.exports = server;
