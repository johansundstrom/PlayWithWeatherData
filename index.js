var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();

var MongoClient = require('mongodb').MongoClient;
var myCollection = "templog"
var dbUrl = "mongodb://be9.asuscomm.com:27017/" + myCollection;

var request = require("request");

const wHost = "http://api.openweathermap.org";
const wpath = '/data/2.5/weather';
const wId = '2715953';
const wUnits = 'metric';
const wAppId = '04ae3ab01b0f8351d05831a7f637a508';
const wUrl = wHost + wpath + '?id=' + wId + '&UNITS=' + wUnits + '&APPID=' + wAppId;


// Fungerar!
request({ url: wUrl, json: true }, function(error, response, weatherData) {
    if (!error && response.statusCode === 200) {
        //console.log(weatherData) // Print the json response
        console.log("longitude: " + weatherData.coord.lon + " latitude: " + weatherData.coord.lat);

        MongoClient.connect(dbUrl, function(err, db) {
            if (err) throw err;
            var myobj = { id: 1, temp: 25.1 }; 
            //db.collection("templog").insertOne(myobj, function(err, res) {
            db.collection("templog").insertOne(weatherData, function(err, res) {
                if (err) throw err;   
                console.log("1 document inserted in collection: " + myCollection);
                db.close();
            });
        })

    }
})





/*
var request = require("request")

request({
    url: wUrl,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
        console.log(body) // Print the json response
    }
})
*/





// Fungerar 2

// Set the headers
// var headers = {
//         'User-Agent': 'Super Agent/0.0.1',
//         'Content-Type': 'application/x-www-form-urlencoded'
//     }
//     // Configure the request
// var options = {
//     url: wHost + wpath,
//     method: 'GET',
//     headers: headers,
//     json: 'TRUE',
//     qs: { 'id': wId, 'APPID': wAppId, 'UNITS': wUnits }
// }

// // Start the request
// request(options, function(error, response, body) {
//     if (!error && response.statusCode == 200) {
//         // Print out the response body
//         //body = JSON.parse(body);
//         console.log(body)
//     }
// })


// var xmlhttp = new XMLHttpRequest();

// xmlhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//         var myObj = JSON.parse(this.responseText);
//         console.log = myObj;
//     }
// };
// xmlhttp.open("GET", wUrl, true);
// xmlhttp.send();
