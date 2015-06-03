// server/routes.js

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
    method: "GET",
    path:"/assets/{param*}", //exposes anything you wish from the public folder
    handler: {
      directory: {
        path: "build" // tells route to look in the public folder for assets
      }
    }
  }
];
