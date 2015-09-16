// server/handlers/error.js

module.exports = function(req, reply){

  reply.view("error", {
    message: "Album not found."
  });

};
