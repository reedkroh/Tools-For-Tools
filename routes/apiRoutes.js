var db = require("../models");

module.exports = function(app) {
  // Get all tools
  app.get("/api/tools", function(req, res) {
    db.ToolSeq.findAll({}).then(function(dbAllTools) {
      res.json(dbAllTools); //dbExamples is all examples
    });
  });

  // Create a new tool
  app.post("/api/tools", function(req, res) {
    db.ToolSeq.create(req.body).then(function(dbOneTool) {
      res.json(dbOneTool);
    });
  });

  // Delete an tool by id
  app.delete("/api/tools/:id", function(req, res) {
    db.ToolSeq.destroy({ where: { id: req.params.id } }).then(function(
      dbOneTool
    ) {
      res.json(dbOneTool);
    });
  });

<<<<<<< HEAD
  //  Need to update tool by id
  app.put("/api/tools/:id", function(req, res) {
    db.ToolSeq.destroy({ where: { id: req.params.id } }).then(function(
      dbOneTool
    ) {
      res.json(dbOneTool);
    });
  });
=======
  //  NEED to update tool by id
  //app.put("/api/tools", function(req, res) {
  //  db.ToolSeq.update({
  //    quantity: req.body.quantity
  //  }, { 
  //    where: { 
  //      id: req.body.id 
  //    } 
  //  }).then(function(dbOneTool) {
  //    res.json(dbOneTool);
  //  });
  //});
>>>>>>> 26b76e5deb0fa7b5ba4934833301ecd93451308b

};
