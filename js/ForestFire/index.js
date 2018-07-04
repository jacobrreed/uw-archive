var express = require('express');
var app = express();
var port = 8888;
var dbURL = "24.16.255.56";
var collections = ["table"];
var db = require("mongojs").connect(dbURL, collections);
var io = require("socket.io").listen(app.listen(port));
console.log("Server started.")
var connections = 0;