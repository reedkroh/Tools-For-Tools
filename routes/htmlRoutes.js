var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.ToolSeq.findAll({}).then(function(dbAllTools) {
      res.render("index", {   //index refers to the handlebars
        msg: "Welcome!",
        allTools: dbAllTools    //allTools refers to all the tools in the database and API
      });
    });
  });

  // Load tool.handlebars page and pass in an tool by id
  app.get("/tool/:id", function(req, res) {
    db.ToolSeq.findOne({ where: { id: req.params.id } }).then(function( //where the id is = requested tool link's id
      dbOneTool
    ) {
      res.render("tool", {   //tool.handlebars
        oneTool: dbOneTool
      });
    });
  });


  // LOAD lender page
  app.get("/lender", function(req, res) {
    db.ToolSeq.findAll({}).then(function(dbAllTools) {
      res.render("lender", {   //lender refers to the handlebarss
        allTools: dbAllTools    //allTools refers to all the tools in the database and API
      });
    });
  });

  // LOAD items page 
  app.get("/tools", function(req, res) {
    db.ToolSeq.findAll({}).then(function(dbAllTools) {
      res.render("items", {   //items refers to the handlebarss
        allTools: dbAllTools    //allTools refers to all the tools in the database and API
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
