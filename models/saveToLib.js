// models/saveToLib.js
var saveToLibrary = function(cb){
  var fs = require('fs');
//  var temp = require('./temp');
  var sqlite = require('sqlite3');
  //var tempStr = JSON.stringify(temp);
  //var item = JSON.parse(tempStr);

  fs.readFile("models/temp.json", "utf8", function(err, data){
    if (err){
      return console.error(err)
    }
    var temp = JSON.parse(data);

    var db = new sqlite.Database("albums.db");
    var query = "INSERT INTO albums VALUES ($albumId, $artistId, $artist, $albumName, $albumArtLg, $albumArtMed, $albumArtSm, $lent);";
    var trkQuery = "INSERT INTO tracks VALUES($albumId, $track);"

    var statement = db.prepare(query);
    statement.run({
      $albumId : temp.albumId,
      $artistId : temp.artistId,
      $artist : temp.artist,
      $albumName : temp.albumName,
      $albumArtLg : temp.albumArtLg,
      $albumArtMed : temp.albumArtMed,
      $albumArtSm : temp.albumArtSm,
      $lent: 0
    });

    var trkStmnt = db.prepare(trkQuery);

      for(i = 0; i < temp.tracksArr.length; i++){
        trkStmnt.run({
            $albumId : temp.albumId,
            $track : temp.tracksArr[i]
        });
      }

    //console.log(temp);
  });//CLOSE fs.readFile("models/temp.json"...

cb();

 };//CLOSE saveToLibrary()

module.exports = saveToLibrary;
