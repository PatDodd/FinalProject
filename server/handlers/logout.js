// server/handlers/logout.js

module.exports = function(req, reply){

  var session = reply.view("logout",{

  }, {layout: "custom"});
  session.state("username", null);
  session.state("session", null);

  console.log(req.state);

};//CLOSE module.exports
