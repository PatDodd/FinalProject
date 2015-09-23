// server/handlers/lentGet.js
var sqlite = require("sqlite3");

var db = new sqlite.Database("albums.db");

module.exports = function(req, reply){
  if(!req.state.username){

    reply.redirect("/login");

  } else {

    var username = req.state.username;

    if(req.state.admin == "false"){

      db.get("SELECT userId FROM users WHERE username='"+username+"';", function(err, data){

        var id = data.userId;

        db.all("SELECT * from lent WHERE userId="+id+";", function(err, data){
          var z = data;
          var w = JSON.stringify(z);
          var x = JSON.parse(w);
          for(i=0; i<x.length; i++){
            x[i].showmsg = "hide";
          }
            //console.log(x);
          reply.view("lent", {
            albums: x,
            user: username,
          //  showmsg: 'hide',
            message: "Albums taken out by "
          });//CLOSE reply.view

        });//close db.all

      });//close db.get...
    } else {

      db.all("SELECT * from lent ORDER BY username ASC", function(err, data){
        var z = data;
        var y = JSON.stringify(z);
        var x = JSON.parse(y);

        for(i=0; i<x.length; i++){
            x[i].showmsg = "show";
        }

        reply.view("lent", {
          albums: x,
          user: username,
          showmsg: 'show',
          message: "All albums taken out by all users. You're in admin view, "

        });//end reply.view

      });//end db.all

    }//end if admin check

  }//end if cookie check

};
