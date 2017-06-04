var request = require("request"),
    assert = require('assert'),
    shortnerApp = require("../app.js"),
    base_url = "http://localhost:4000",
    chai = require('chai'),
    expect = chai.expect,
    shortner = require("../shortner");



    shortner.data.push({"short_url":"/91eklx","url":"http://www.farmdrop.com"})

describe("Url shortner tests", function() {

    describe("Add and element with POST  /", function() {
        it("returns the element added", function(done) {
            request.post({url: base_url+'/', form:'{"url":"http://www.farmdrop.com"}' }, function(error, response, body) {

                expect(JSON.parse(response.body)).to.be.a('Object');
                done();

            });
        });
    });

    describe("GET and element and redirect /", function() {


        it("returns status code 200", function(done) {
            request.get(base_url+'/91eklx', function(error, response, body) {
                assert.equal(200, response.statusCode);
                done();
            });
        });


        it("returns status code 404, shortner do not exist", function(done) {
            request.get(base_url+'/1112223333444', function(error, response, body) {
                assert.equal(404, response.statusCode);
                done();
            });
        });


    });

    describe("GET index page on  /index", function() {


        it("returns status code 200", function(done) {
            request.get(base_url+'/index', function(error, response, body) {
                assert.equal(200, response.statusCode);
                done();
            });
        });

    });
});
