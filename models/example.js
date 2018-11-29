module.exports = function(sequelize, DataTypes) {
  var ToolSeq = sequelize.define("ToolSeq", {
    tool: DataTypes.STRING,
    category: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL(10, 2),
    quantity: DataTypes.INTEGER,
    owner: DataTypes.STRING
  });
  return ToolSeq;
};





//Example is name of the variable for the table being created

//For some reason it adds an s to ToolSeq   "ToolSeqs" in the database
//Which is why the table says examples instead of example
