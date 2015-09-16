// server/handlers/lentGet.js
var sqlite = require("sqlite3");

var db = new sqlite.Database("albums.db");

module.exports = function(req, reply){
  if(!req.state.username){
    reply.redirect("/login");
  } else {

    var username = req.state.username;

    db.get("SELECT userId FROM users WHERE username='"+username+"';",function(err, data){

      var id = data.userId;

      db.all("SELECT * from lent WHERE userId="+id+";", function(err, data){
        var z = data;
        var y = JSON.stringify(z);
        var x = JSON.parse(y);

        reply.view("lent", {
          albums: x,
          user: username

        });//CLOSE reply.view

      });//close db.all()

    });//close db.get...
    
  }//end if cookie check

};
