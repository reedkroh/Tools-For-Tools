var db = require("../models");      

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.ToolSeq.findAll({}).then(function(dbAllTools) {
      res.render("index", {   //index refers to the handlebars
        msg: "Welcome!",
        allTools: dbAllTools    //allTools refers to all the tools in the database?
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.ToolSeq.findOne({ where: { id: req.params.id } }).then(function(
      dbOneTool
    ) {
      res.render("example", {   //example.handlebars
        oneTool: dbOneTool
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
