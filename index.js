const express = require("express");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/mern-Auth").then(() => {
  console.log("db connected successfully");
});

const userRouter = require("./route/user-route");
dotenv.config();

const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
const PORT = process.env.PORT;

app.use("/users", userRouter); //

app.listen(PORT, () => {
  console.log("server is listening on port ", PORT);
});
