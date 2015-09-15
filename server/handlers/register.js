module.exports = function(req, reply){

  reply.view(
    "register", {
      title: "Register",
      message: "Register Here: "
    },
    {
      layout: "custom"
    }
  );

};
