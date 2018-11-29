var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/tools", function(req, res) {
    db.ToolSeq.findAll({}).then(function(dbAllTools) {
      res.json(dbAllTools); //dbExamples is all examples
    });
  });

  // Create a new example
  app.post("/api/tools", function(req, res) {
    db.ToolSeq.create(req.body).then(function(dbOneTool) {
      res.json(dbOneTool);
    });
  });

  // Delete an example by id
  app.delete("/api/tools/:id", function(req, res) {
    db.ToolSeq.destroy({ where: { id: req.params.id } }).then(function(
      dbOneTool
    ) {
      res.json(dbOneTool);
    });
  });
};
