module.exports = {
  development: {
    username: "phurinon",
    password: "Rice@2020",
    database: "rice",
    host: "203.159.95.167",
    dialect: "mariadb",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
