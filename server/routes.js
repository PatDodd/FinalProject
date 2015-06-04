// server/routes.js

var fs = require('fs');


module.exports = [
  {
    method: "GET",
    path: "/",
    handler: require("./handlers/home")
  },
  {
    method: "GET",
    path: "/album/{num}",
    handler: require("./handlers/albumView")
  },
  {
    method: "POST",
    path: "/search",
    handler: require("./handlers/search")
  },
  {
    method: "POST",
    path: "/saved",
    handler: require("./handlers/saved")
  },
  {
    method: "GET",
    path:"/assets/{param*}", //exposes anything you wish from the public folder
    handler: {
      directory: {
        path: "build" // tells route to look in the public folder for assets
      }
    }
  }
];
