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
    path: "/login",
    handler: require("./handlers/loginGet")
  },
  {
    method: ["POST"],
    path: "/login",
    handler: require("./handlers/loginPost")
  },
  {
    method: "GET",
    path: "/logout",
    handler: require("./handlers/logout")
  },
  {
    method: "GET",
    path: "/register",
    handler: require("./handlers/register")
  },
  {
    method: "POST",
    path: "/register",
    handler: require("./handlers/registerPost")
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
    method: "GET",
    path: "/error",
    handler: require("./handlers/error")
  },
  {
    method: "POST",
    path: "/saved",
    handler: require("./handlers/saved")
  },
  {
    method: "GET",
    path: "/checkout/{num}",
    handler:require("./handlers/checkout")
  },
  {
    method: "POST",
    path: "/lent",
    handler: require("./handlers/lentPost")
  },
  {
    method: "GET",
    path: "/lent",
    handler: require("./handlers/lentGet")
  },
  {
    method: "GET",
    path: "/delete/{num}",
    handler: require("./handlers/delete")
  },
  {
    method: "POST",
    path: "/deleted",
    handler: require("./handlers/deleted")
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
