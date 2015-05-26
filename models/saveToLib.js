var fs = require('fs');
var temp = require('./temp.json');
var lib = require('./library.json');

var tempStr = JSON.stringify(temp);
var libStr = JSON.stringify(lib);

var saveToLibrary = function(){

  var item = JSON.parse(tempStr);
  var libJson = JSON.parse(libStr).albums;

  libJson.push(item);

  var libObj = {
    "albums" : libJson
  };

  var updatedLib = JSON.stringify(libObj);
  fs.writeFile('./library.json', updatedLib,'utf8');
};

saveToLibrary();

//module.exports = saveToLibrary;
