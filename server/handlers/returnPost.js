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

        var albumName = x.albumName;

        var albUp = "UPDATE albums SET lent=0 WHERE albumName = $albumName;";
        var albSt = db.prepare(albUp);

        var lentUp = "DELETE FROM lent WHERE albumName = $albumName;";
        var lentSt = db.prepare(lentUp);

        albSt.run({
          $albumName: albumName
        }, function(err, data){
          lentSt.run({
            $albumName: albumName
          });//end lentSt.run
        });//end albSt.run

      reply.view("return", {
        message: "Album returned successfully!",
        show_delete: "hide_delete",
        hide_button: "hide_button",
        user: user
      });//end reply.view

    }//end if cookie check

  });//close db.all

};
