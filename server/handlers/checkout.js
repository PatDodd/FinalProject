//server/handlers/checkout.js
var fs = require('fs');
var sqlite = require("sqlite3");
var db = new sqlite.Database("albums.db");

module.exports = function(req, reply){
  if(!req.state.username){
    reply.redirect("/login");
  } else {
    db.all( "SELECT * FROM albums WHERE lent=0 ORDER BY artist COLLATE NOCASE;", function(err, data){
      var albStrgfy = JSON.stringify(data);

      var album = JSON.parse(albStrgfy)[req.params.num];
      //console.log(album);
      var id = album.albumId;

      var alb = {
                "albumId": album.albumId,
                "artist" : album.artist,
                "albumName" : album.albumName,
                "albumArtMed" : album.albumArtMed
                };

      var a = JSON.stringify(alb);
      //console.log(a);
      fs.writeFile('./models/checkout.json', a, 'utf8');
      db.all("SELECT track FROM tracks WHERE albumID='"+id+"';", function(err, data){
           var trksStr = JSON.stringify(data);
           var tracks = JSON.parse(trksStr);
           //console.log(tracks);

      reply.view("checkout", {
        title: album.albumName,
        image: album.albumArtMed,
        artist: album.artist,
        albumName: album.albumName,
        tracks: tracks,
        user: req.state.username
      });
    });//CLOSE SELECT track FROM tracks
   });//CLOSE SELECT * FROM albums
 }
};
