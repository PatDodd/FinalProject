// models/getAlb.js
var fs = require('fs');
var request = require('request');

var albumObjForm = '';

var getAlbum = function(art, alb){
   var albObj = {};
   request.get('https://api.spotify.com/v1/search?q=' + art +"%20" + "%20" +  alb + '&type=album', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var id = JSON.parse(body).albums.items[0].id;
      request.get('https://api.spotify.com/v1/albums/' + id, function(err, response, body){

        if (!error && response.statusCode == 200) {

          var trackNames = JSON.parse(body).tracks.items;
          var tracksArr = [ ];

          for(var i = 0; i < trackNames.length; i++){
            tracksArr.push(trackNames[i].name);
          }

          var albObj = {
            "albumId" : JSON.parse(body).id,
            "artistId" : JSON.parse(body).artists[0].id,
            "artist" : JSON.parse(body).artists[0].name,
            "albumName" : JSON.parse(body).name,
            "albumArtLg" : JSON.parse(body).images[0].url,
            "albumArtMed" : JSON.parse(body).images[1].url,
            "albumArtSm" : JSON.parse(body).images[2].url,
            "tracksArr" : tracksArr
          };
          var albumObjForm = JSON.stringify(albObj);
          fs.writeFile('./models/temp.json', albumObjForm, 'utf8');
        }
      });
    }
  });
};

module.exports = getAlbum;
