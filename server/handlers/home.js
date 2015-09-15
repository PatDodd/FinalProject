//server/handlers/home.js
var fs = require('fs');
var sqlite = require("sqlite3");

var db = new sqlite.Database("albums.db");

module.exports = function(req, reply){

  db.all("SELECT * FROM albums WHERE lent=0 ORDER BY artist COLLATE NOCASE;", function(err, data){
    if(err){console.error(err);}
    var albStrgfy = JSON.stringify(data);
    var albums = JSON.parse(albStrgfy);
    //console.log(data);
    reply.view("index", {
        title: "Home",
        albums: albums
    });
  });
};
