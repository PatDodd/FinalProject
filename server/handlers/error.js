// server/handlers/error.js

module.exports = function(req, reply){
  if(!req.state.username){

    reply.redirect("/login");

  } else {

    reply.view("error", {
      message: "Album not found.",
      user: req.state.username
    });
  }//end if cookie check
};
