//server/handlers/albumView.js
var fs = require('fs');
var sqlite = require("sqlite3");
var db = new sqlite.Database("albums.db");

module.exports = function(req, reply){
  db.all( "SELECT * FROM albums ORDER BY artist COLLATE NOCASE;", function(err, data){
    var albStrgfy = JSON.stringify(data);
    var album = JSON.parse(albStrgfy)[req.params.num];
    var id = album.albumId;
    fs.writeFile('./models/id.json', id, 'utf8');
    db.all("SELECT track FROM tracks WHERE albumID='"+id+"';", function(err, data){
         var trksStr = JSON.stringify(data);
         var tracks = JSON.parse(trksStr);
         //console.log(tracks);

    reply.view("delete", {
      title: album.albumName,
      image: album.albumArtMed,
      artist: album.artist,
      albumName: album.albumName,
      tracks: tracks
    });
  });//CLOSE SELECT track FROM tracks
 });//CLOSE SELECT * FROM albums
};
