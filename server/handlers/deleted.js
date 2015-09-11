//server/handlers/albumView.js
var fs = require('fs');
var sqlite = require("sqlite3");
var db = new sqlite.Database("albums.db");

module.exports = function(req, reply){
    fs.readFile("models/id.json", "utf8", function(err, data){
      console.log(data);
      db.all("DELETE FROM tracks WHERE albumID='"+data+"';");
      db.all("DELETE FROM albums WHERE albumId='"+data+"';");
      reply.view("deleted", {
        message: "Deletion successful!"
      });
      console.log("Deleted!");
    });


};
