// Import library
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import bodyParser from "body-parser";
import path from "path";
import router from "./server/routes/router.js";
import connectDB from "./server/database/connection.js";

// Loads environment variables from config.env file into process.env
dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 3000;

var app = express();

// Log requests
app.use(morgan("tiny"));

// MongoDB connection
connectDB();

// Parse request to body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// Set view engine
app.set("view engine", "ejs");
// app.set("views", path.resolve(__dirname, "views/ejs"));

const currentPath = path.resolve();
console.log(currentPath);

// Load assets
app.use("/assets", express.static("assets"));
app.use("/css", express.static(path.resolve(currentPath, "assets/css")));
app.use("/img", express.static(path.resolve(currentPath, "assets/img")));
app.use("/js", express.static(path.resolve(currentPath, "assets/js")));

// app.get("/create", function (req, res) {
//   posts.push(req.body);
//   res.redirect("/");
// });

// app.get("/search", function (req, res) {
//   var id = req.query.id;
//   var data = posts.filter(function (item) {
//     return item.id === parseInt(id);
//   });
//   res.render("index", {
//     posts: data,
//   });
// });

// Load routers
app.use("/", router);

app.listen(PORT, (error) => {
  if (error) {
    console.log("Something went wrong");
  }
  console.log("Server running on port: " + PORT);
});
