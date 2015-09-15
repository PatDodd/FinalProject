var fs = require('fs');
var sqlite = require("sqlite3");
var bcrypt = require('bcrypt');

var db = new sqlite.Database("albums.db");

var bcrypt = require('bcrypt');
var uuid = require('uuid');


module.exports = function(req, reply){
  var user = req.payload.user;
  var pass = req.payload.password;

  console.log("User: " + user + " Password: " + pass);

  var query = "SELECT password FROM users WHERE username = $user;";
  var statement = db.prepare(query);

  statement.all({
    $user: user
  }, function(err, data){
    // console.log(data[0]);
    // console.log(err);
    if(data[0]==undefined){
      reply.redirect("/login");}
    else{
      var pHash = data[0].password;
      //console.log(pHash);
      bcrypt.compare(pass, pHash, function(err, res) {
        var status = res;
        //console.log(status);
        if(status==true){

          var sessionId = uuid.v1();

          var seshCookie = reply.redirect("/");
          seshCookie.state("username", user);
          seshCookie.state("session", sessionId);
        } else {
          reply.redirect("/login");

        }//close if(status==true...
      });//close bcrypt.compare(...
    }//close if(data[0]==undefined...
  }); //close statement.all(...
};//CLOSE module.exports...
