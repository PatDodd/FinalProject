// FinalProject/index.js
var hapi = require('hapi');
var server = new hapi.Server();

server.connection({port: 8000});
server.start();

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
