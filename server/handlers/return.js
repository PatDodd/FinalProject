// server/handlers/return.js
var sqlite = require("sqlite3");

var db = new sqlite.Database("albums.db");

module.exports = function(req, reply){
  var user = req.state.username
  var albumNum = req.params.num;

  db.all("SELECT * from lent ORDER BY username ASC", function(err, data){
    var z = data[albumNum];
    var y = JSON.stringify(z);
    var x = JSON.parse(y);


    if(!req.state.username){

      reply.redirect("/login");

    } else {
      reply.view("return", {
        albumName: x.albumName,
        artist: x.artist,
        loanee: x.username,
        user: user,
        num: req.params.num
      });//end reply.view

    }//end if cookie check
  });//end db.all
};
