// server/handlers/registerPost.js

var bcrypt = require('bcrypt');
var sqlite = require("sqlite3");

var db = new sqlite.Database("albums.db");

module.exports = function(req, reply){

  var pass = req.payload.password;
  var passV = req.payload.password_verify;
  var user = req.payload.user;

  var userCheck = "SELECT username FROM users WHERE username = $user";
  var uChk = db.prepare(userCheck);
  uChk.all({
    $user: user
  }, function(err, data){
    if(data[0] == undefined){
      if(pass == passV && user != null && pass != null && passV != null){

        var hashed = bcrypt.hashSync(pass, 10);

        var query = "INSERT INTO users (username, password, admin) VALUES ($username, $password, $admin);";
        var statement = db.prepare(query);
        statement.run({
          $username: user,
          $password: hashed,
          $admin: "false"
        }, function(err, data){
          console.log(err);
        });

        db.all("SELECT * FROM users", function(err, data){
          console.log(data);
        });

          reply.view(
            "register", {
              title: "Register",
              message: "Register Here: ",
              status: "Registration Successful! Proceed to Login:",
              color: "LimeGreen"
            },
            {
              layout: "custom"
            }
          );
        } else {
          reply.view(
            "register", {
              title: "Register",
              message: "Register Here: ",
              status: "Passwords don't match or there was a problem with your username. Try again.",
              color: "red"
            },
            {
              layout: "custom"
            }
          );
      }//close if(pass == passV &&...
    } else {
      reply.view(
        "register", {
          title: "Register",
          message: "Register Here: ",
          status: "Username already exists.",
          color: "red"
        },
        {
          layout: "custom"
        }
      );

    } // end if(data[0]==undef...)

  });//CLOSE uChk.all(...)

};//close module.exports...
