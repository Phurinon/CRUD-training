const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const { User } = require("./user");

const Address = sequelize.define("Address", {
  // Model attributes are defined here
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasMany(Address);
Address.belongsTo(User);

module.exports = { Address };
