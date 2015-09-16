// server/handlers/lent.js
var fs = require("fs");
var sqlite = require("sqlite3");
var db = new sqlite.Database("albums.db");

module.exports = function(req, reply){
  var username = req.state.username;

  db.get("SELECT userId FROM users WHERE username='"+username+"';",function(err, data){


    var id = data.userId;

    fs.exists("models/checkout.json", function(exists){

       var toBeOrNot = exists;

       if(toBeOrNot == false){
         db.all("SELECT * from lent WHERE userId="+id+";", function(err, data){
           console.log(data);
          var z = data;
          var y = JSON.stringify(z);
          var x = JSON.parse(y);

         reply.view("lent", {
           albums: x,
           user: req.state.username
         });//CLOSE reply.view
       });//CLOSE db.all directly above view

       } else {

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

              db.all("SELECT * from lent WHERE userId="+id+";", function(err, data){
                var z = data;
                var y = JSON.stringify(z);
                var x = JSON.parse(y);

                reply.view("lent", {
                  albums: x,
                  user: username
                });//CLOSE reply.view

              });//close db.all()

            });//close statement.run...

        });//CLOSE fs.readFile("models/checkout.json"...

        fs.unlink("models/checkout.json", function(err){
          console.log("checkout.json deleted.");
        });// CLOSE fs.unlink...checkout.json

       }//close if(toBeOrNot)...

    });//end fs.exists...checkout.json
 });//close db.get at top
};
