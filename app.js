import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import logger from "morgan";

// Setup dependencies
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));

const MONGODB_URI = process.env.MONGODB_URI;
console.log(MONGODB_URI);

// Setup mongoose
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log("Error connecting to database");
  });

// Setup home route
app.get("/", (req, res) => {
  res.send("Server running");
});

module.exports = app;
