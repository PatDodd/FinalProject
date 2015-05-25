// FinalProject/index.js
var getAlbum = require('./models/getAlb');
var hapi = require('hapi');
var server = new hapi.Server();
server.connection({port: 8000});
server.start();

server.route({
  method: "GET",
  path: "/",
  handler: function(req, reply){
    reply("Hello World! Grunt is running.");
  }
});

var artist = 'Bob Dylan ';
var album = 'Another Side of ';

getAlbum(artist, album);