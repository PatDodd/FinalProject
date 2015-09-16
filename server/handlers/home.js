//server/handlers/home.js
var fs = require('fs');
var sqlite = require("sqlite3");

var db = new sqlite.Database("albums.db");

module.exports = function(req, reply){
  //console.log(req.state);
  if(!req.state.username){
    reply.redirect("/login");
  } else {
    db.all("SELECT * FROM albums WHERE lent=0 ORDER BY artist COLLATE NOCASE;", function(err, data){
      if(err){console.error(err);}
      var albStrgfy = JSON.stringify(data);
      var albums = JSON.parse(albStrgfy);
      //console.log(data);
      reply.view("index", {
          title: "Home",
          albums: albums,
          user: req.state.username
      });

    }); // CLOSE db.all...
  }//end if(!req.state.user...)
};//CLOSE module.exports
