// server/handlers/saved.js
var saveToLibrary = require("../../models/saveToLib");

module.exports = function(req, reply){
  saveToLibrary();
  reply.view("saved", {
    message: "Success!"
  });
};
