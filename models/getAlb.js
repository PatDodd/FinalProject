// models/getAlb.js
var fs = require('fs');
var request = require('request');

var getAlbum = function(artist, reply, callback){

  var albumObjForm = {};
   request.get('https://api.spotify.com/v1/search?q=' + artist +"%20" + '&type=album', function (error, response, body) {
    //  console.log(body);
    if (!error && response.statusCode == 200) {
      if(JSON.parse(body).albums.items[0] == null){
        reply.redirect("/error");
      } else{

        var id = JSON.parse(body).albums.items[0].id;
      
        request.get('https://api.spotify.com/v1/albums/' + id, function(err, response, body){

          if (!err && response.statusCode == 200) {

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
            albumObjForm = JSON.stringify(albObj);

            fs.writeFile('./models/temp.json', albumObjForm, 'utf8');

          }
          callback();
        }); // end request.get('https://api.spotify.com/v1/albums/' + id...
      }
    }// close if(!error...)
  });
};

module.exports = getAlbum;
