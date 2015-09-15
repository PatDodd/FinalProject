var fs = require('fs');
var sqlite = require("sqlite3");

var db = new sqlite.Database("albums.db");

var bcrypt = require('bcrypt');
var uuid = require('uuid');

module.exports = function(req, reply){

  reply.view(
    "login", {
      title: "Log-in",
      message: "Log-in below to enter: "
    },
    {
      layout: "custom"
    }
  );

};
