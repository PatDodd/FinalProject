//server/handlers/search.js
var getAlbum = require('../../models/getAlb');
var fs = require('fs');

module.exports = function(req, reply){
  getAlbum(req.payload.search, function(err,results){


    fs.readFile("models/temp.json", "utf8", function(err, data){

      var result = JSON.parse(data);

      reply.view("search", {
        title: "Search Results",
        result: result
      });
    });

  console.log("Complete!");

});

 };
