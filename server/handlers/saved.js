// server/handlers/saved.js
var saveToLibrary = require("../../models/saveToLib");

// var temp = require('../../models/temp');
// var lib = require('../../models/library');

module.exports = function(req, reply){
  saveToLibrary(function(err, results){
    if(error){console.error(err);}


    reply.view("saved", {
      message: "Success!"
    });
  });


};
