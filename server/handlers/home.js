//server/handlers/home.js
var fs = require('fs');

module.exports = function(req, reply){

  fs.readFile("models/library.json", "utf8", function(err, data){
    var albums = JSON.parse(data).albums;

    reply.view("index", {
        title: "Home",
        albums: albums
        // image: album.albumArtMed.substring(0,33),
        // artist: album.artist.substring(0,33),
        // albumName: album.albumName.substring(0,33)
    });
  });
};
