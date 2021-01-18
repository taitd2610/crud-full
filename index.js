import express from "express";

const app = express();
const PORT = 3000;

var posts = [
  { id: 1, title: "Nodejs" },
  { id: 2, title: "Nextjs" },
  { id: 3, title: "Nuxtjs" },
];

// Use template engines
app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", function (req, res) {
  res.render("index", {
    posts: posts,
  });
});

app.get("/search", function (req, res) {
  var id = req.query.id;
  var data = posts.filter(function (item) {
    return item.id === parseInt(id);
  });
  res.render("index", {
    posts: data,
  });
});

app.listen(PORT, function (error) {
  if (error) {
    console.log("Something went wrong");
  }
  console.log("server running on port: " + PORT);
});
