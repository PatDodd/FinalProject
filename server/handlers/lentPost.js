// server/handlers/lent.js
var fs = require("fs");
var sqlite = require("sqlite3");
var db = new sqlite.Database("albums.db");

module.exports = function(req, reply){
  if(!req.state.username){

    reply.redirect("/login");

  } else {

    var username = req.state.username;

    db.get("SELECT userId FROM users WHERE username='"+username+"';",function(err, data){

      var id = data.userId;

          fs.readFile("models/checkout.json", "utf8", function(err, data){
            //console.log("Error: " + err +"Data: "+ data);

            var alb = JSON.parse(data);
            var a = JSON.stringify(alb);
            //console.log(a);

              var query = "INSERT INTO lent VALUES($id, $username, $albId, $artist, $albumName, $albumArtMed, $date);";
              var statment = db.prepare(query);

              statment.run({
                $id: id,
                $username: req.state.username,
                $albId: JSON.parse(a).albumId,
                $artist: JSON.parse(a).artist,
                $albumName: JSON.parse(a).albumName,
                $albumArtMed: JSON.parse(a).albumArtMed,
                $date: Date()
              }, function(err, data){

                var updateLent = "UPDATE albums SET lent=1 WHERE albumId=$albId;";
                var lentUp = db.prepare(updateLent);

                lentUp.all({
                  $albId: JSON.parse(a).albumId
                }, function(err, data){
                    //console.log(err +" "+ data);
                });

                if(req.state.admin == "false"){
                  db.all("SELECT * from lent WHERE userId="+id+";", function(err, data){
                    var z = data;
                    var y = JSON.stringify(z);
                    var x = JSON.parse(y);
                    for(i=0; i<x.length; i++){
                      x[i].showmsg = "hide";
                    }

                    reply.view("lent", {
                      albums: x,
                      user: username,
                      message: "Albums taken out by"

                    });//CLOSE reply.view

                  });//close db.all
                } else {
                  db.all("SELECT * from lent;", function(err, data){
                    var z = data;
                    var y = JSON.stringify(z);
                    var x = JSON.parse(y);
                    for(i=0; i<x.length; i++){
                      x[i].showmsg = "hide";
                    }

                    reply.view("lent", {
                      albums: x,
                      user: username,
                      message: "All albums taken out by all users. You're in admin view, "

                    });//CLOSE reply.view

                  });//close db.all
                }//end if req.stat.admin
              });//close statement.run...

          });//CLOSE fs.readFile("models/checkout.json"...

          fs.unlink("models/checkout.json", function(err){
            console.log("checkout.json deleted.");
          });// CLOSE fs.unlink...checkout.json

   });//close db.get at top

 }//end if cookie check

};
