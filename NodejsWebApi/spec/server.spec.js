'use strict';
const baseAddress = 'http://localhost:1337';
const Request = require('request'); // npm i request

describe('Server', () => {
    var server;
    beforeAll(() => {
        server = require('../server');
    });
    afterAll(() => {
        server.close();
    });

    // DO NOT receives HTTP GET requests on a "/" route
    describe('GET /', () => {
        var data = {};
        beforeAll((done) => {
            Request.get(baseAddress, (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                done();
            });
        });
        it('Status 404', () => {
            expect(data.status).toBe(404);
        });
    });

    // HTTP GET request on a "/count" route
    describe('GET /count', () => {
        var data = {};
        beforeAll((done) => {
            Request.get(baseAddress + '/count', (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                done();
            });
        });
        it('Status 200', () => {
                expect(data.status).toBe(200);
        });
        it('Body', () => {
            if(data.body) {
                expect(data.body).not.toBeNaN();
            }
        });
    });

    // HTTP POST request on a "/track" route
    describe('POST /track', () => {
        var data = {};
        beforeAll((done) => {
            Request.post({
                url: baseAddress + '/track',
                body: {'count':'1'},
                json: true
              },(error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                done();
            });
        });
        it('Status 200', () => {
            expect(data.status).toBe(200);
        });
        it('Body', () => {
            expect(data.body).toBe('OK');
        });
    });

    // Test 'count' incrementing.
    describe('GET-POST-GET', () => {
        var oldCount = 0;
        var newCount = 0;

        //1. Get old count by HTTP GET request.
        beforeAll((done) => {
            Request.get(baseAddress + '/count', (error, response, body) => {
                if(body) {
                    expect(body).not.toBeNaN();
                    oldCount = parseInt(body);
                }
                else oldCount = 0;
                done();
            });
        });

        //2. Increment count by HTTP POST request on a "/track" route.
        beforeAll((done) => {
            Request.post({url: baseAddress + '/track', body: {'count':'1'}, json: true},
                (error, response, body) => {
                    done();
            });
        });

        //3. Get new count by HTTP GET request.
        Request.get(baseAddress + '/count', (error, response, body) => {
            newCount = body;
        });

        //4. Check that new count > old count.
        it('3. HTTP GET', () => {
            setTimeout(() => {
                expect(newCount).not.toBeNull();
                expect(newCount).not.toBeNaN();
                expect(newCount).toEqual(oldCount + 1);
                done();
            }, 100);
        });
    });
});