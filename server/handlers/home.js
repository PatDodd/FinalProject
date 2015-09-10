//server/handlers/home.js
var fs = require('fs');
var sqlite = require("sqlite3");

var db = new sqlite.Database("albums.db");

module.exports = function(req, reply){

  db.all("SELECT * FROM albums;", function(err, data){
    var albStrgfy = JSON.stringify(data);
    var albums = JSON.parse(albStrgfy);

    reply.view("index", {
        title: "Home",
        albums: albums
    });
  });
};
