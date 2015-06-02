// FinalProject/index.js
var getAlbum = require('./models/getAlb');
var hapi = require('hapi');
var fs = require('fs');
var server = new hapi.Server();
server.connection({port: 8000});
server.start();

// server.route({
//   method: "GET",
//   path: "/",
//   handler: function(req, reply){
//     reply("Hello World! Grunt is running.");
//   }
// });

var artist = 'Quasi';
var album = 'Mole City';

getAlbum(artist, album);

server.views({
  path: "views/templates",
  engines: {
    html: require("handlebars")
  },
  layoutPath: "views",
  layout: "default",
  isCached: false
});

server.route({
  method: "GET",
  path: "/",
  handler: function(req, reply){
    fs.readFile("models/library.json", "utf8", function(err, data){
      reply.view("index", {
          title: "Home",
          albums: JSON.parse(data).albums
      });
    });
  }
});

server.route({
  method: "GET",
  path: "/album/{num}",
  handler: function(req, reply){
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
  }
});

//this route gets any asset from the public folder, styles, images, ect...
server.route({
  method: "GET",
  path:"/assets/{param*}", //exposes anything you wish from the public folder
  handler: {
    directory: {
      path: "build" // tells route to look in the public folder for assets
    }
  }
});
