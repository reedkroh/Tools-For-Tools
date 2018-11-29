var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.ToolSeq.findAll({}).then(function(dbAllTools) {
      res.json(dbAllTools);   //dbExamples is all examples
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.ToolSeq.create(req.body).then(function(dbOneTool) {
      res.json(dbOneTool);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.ToolSeq.destroy({ where: { id: req.params.id } }).then(function(
      dbOneTool
    ) {
      res.json(dbOneTool);
    });
  });
};
