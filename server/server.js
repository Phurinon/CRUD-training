const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const { sequelize, connectDB } = require("./config/db");
const User = require("./models/user");
const Address = require("./models/address");
const cors = require("cors");

const userRoutes = require("./routes/user");
// const addressRoutes = require("./routes/address");

dotenv.config();
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);
// app.use("/api/address", addressRoutes);

// console.log(process.env.MARIADB_DB)
connectDB();

sequelize
  .sync()
  .then(() => {
    app.listen(5000, () => {
      console.log("Server is runing on port 5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
