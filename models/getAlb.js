// models/getAlb.js
var fs = require('fs');
var request = require('request');

var albumObjForm = '';


var getAlbum = function(art, alb){
   var albObj = {};
   request.get('https://api.spotify.com/v1/search?q=' + art + alb + '&type=album', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var id = JSON.parse(body).albums.items[0].id;
      request.get('https://api.spotify.com/v1/albums/' + id, function(err, response, body){
        if (!error && response.statusCode == 200) {
          var artistName = JSON.parse(body).artists[0].name;
          var trackNames = JSON.parse(body).tracks.items;
          var albumName = JSON.parse(body).name;
          var albumArt = JSON.parse(body).images[1].url;
          var albumId = JSON.parse(body).id;
          var artistId = JSON.parse(body).artists[0].id;
          var tracksArr = [ ];

          for(var i = 0; i < trackNames.length; i++){
            tracksArr.push(trackNames[i].name);
          }

          var albObj = {
            "albumId" : albumId,
            "artistId" : artistId,
            "artist" : artistName,
            "albumName" : albumName,
            "albumArt" : albumArt,
            "tracksArr" : tracksArr
          };

          var albumObjForm = JSON.stringify(albObj);
          fs.writeFile('./models/temp.json', albumObjForm, 'utf8');
        }
      });
    } else {
      console.write("error!");
    }
  });
return albumObjForm;
};

module.exports = getAlbum;
