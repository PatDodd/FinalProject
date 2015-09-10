// FinalProject/index.js
var hapi = require('hapi');
var sqlite = require("sqlite3");

var server = new hapi.Server();
server.connection({port: 8000});

var db = new sqlite.Database("albums.db", function(){
  db.run("CREATE TABLE IF NOT EXISTS albums(albumId, artistId, artist, albumName, albumArtLg, albumArtMed, albumArtSm);", function(){
  db.run("CREATE TABLE IF NOT EXISTS tracks (albumId, track);");
    console.log("Startiing server!");
    server.start();
  });//CLOSE 'db.run("CREATE TABLE IF NOT EXISTS albums...'
});//CLOSE 'var db = new sqlite.Database("albums.db"...'

server.views({
  path: "views/templates",
  engines: {
    html: require("handlebars")
  },
  layoutPath: "views",
  layout: "default",
  isCached: false
});

var routes = require("./server/routes")
server.route(routes);
