var moment = require('moment')
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://be9.asuscomm.com:27017/templog";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var myobj = { id: 1, temp: 25.1 }; 
    // db.collection("templog").insertOne(myobj, function(err, res) {
    //     if (err) throw err;   
    //     console.log("1 document almost inserted");   
    //     db.close();
    // });
})


var d = new Date();
var t = d.getTime();


console.log(d);
