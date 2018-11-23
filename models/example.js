module.exports = function(sequelize, DataTypes) {
  var Example = sequelize.define("Example", {
    tool: DataTypes.STRING,
    category: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL(10, 2),
    quantity: DataTypes.INTEGER,
    owner: DataTypes.STRING
  });
  return Example;
};





//category?? maybe I can use unique names?
//title = tool

//create price, quantity, owner
