const config = require("../config");
const dotenv = require("dotenv");
dotenv.config();
const { Sequelize } = require("sequelize");

// console.log('db config log',config)
// console.log('db config log')

const sequelize = new Sequelize(
  process.env.MARIADB_DB,
  process.env.MARIADB_USER,
  process.env.MARIADB_PASSWORD,
  {
    host: process.env.MARIADB_HOST,
    port: process.env.MARIADB_PORT,
    dialect: "mariadb", // Replace 'mysql' with your desired database dialect
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { sequelize, connectDB };

// db_password: process.env.MARIADB_PASSWORD,
//     db_user: process.env.MARIADB_USER,
//     db_db: process.env.MARIADB_DB,
//     db_port: process.env.MARIADB_PORT,
//     db_host: process.env.MARIADB_HOST
