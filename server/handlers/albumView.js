//server/handlers/albumView.js
var fs = require('fs');

module.exports = function(req, reply){
  fs.readFile("models/library.json", "utf8", function(err, data){
    var album = JSON.parse(data).albums[req.params.num];
    reply.view("album", {
      title: album.albumName,
      image: album.albumArtMed,
      artist: album.artist,
      albumName: album.albumName,
      tracks: album.tracksArr
    });
  });
};
