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
