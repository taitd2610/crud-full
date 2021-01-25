import axios from "axios";

export function homeRoutes(req, res) {
  // Make a get response to /api/users
  axios
    .get("http://localhost:2610/api/users")
    .then(function (response) {
      res.render("index", { users: response.data });
    })
    .catch((error) => {
      res.send(error);
    });
}

export function addUserRoutes(req, res) {
  res.render("add_user");
}

export function updateUserRoutes(req, res) {
  res.render("update_user");
}
