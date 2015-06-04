var fs = require('fs');
var temp = require('./temp.json');
var lib = require('./library.json');

var saveToLibrary = function(){
  var tempStr = JSON.stringify(temp);
  var libStr = JSON.stringify(lib);
  var item = JSON.parse(tempStr);
  var libJson = JSON.parse(libStr).albums;

  libJson.push(item);

  var libObj = {
    "albums" : libJson
  };

  var updatedLib = JSON.stringify(libObj);
  fs.writeFile('./models/library.json', updatedLib,'utf8');
};

module.exports = saveToLibrary;
