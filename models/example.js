module.exports = function(sequelize, Sequelize) {
  var User = sequelize.define("user", {
    // id: {
    //   autoIncrement: true,
    //   primaryKey: true,
    //   type: Sequelize.STRING
    // },

    // owner: {
    //   type: Sequelize.STRING,
    //   notEmpty: true
    // },

    // password: {
    //   type: Sequelize.STRING,
    //   allowNull: false
    // },

    // status: {
    //   type: Sequelize.ENUM("active", "inactive"),
    //   defaultValue: "active"
    // },

    tool: DataTypes.STRING,
    category: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL(10, 2),
    quantity: DataTypes.INTEGER,
    owner: DataTypes.STRING
  });
  return User;
};





//category?? maybe I can use unique names?
//title = tool

//create price, quantity, owner
