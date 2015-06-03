//server/handlers/home.js
var fs = require('fs');

module.exports = function(req, reply){
  fs.readFile("models/library.json", "utf8", function(err, data){
    reply.view("index", {
        title: "Home",
        albums: JSON.parse(data).albums
    });
  });
};
