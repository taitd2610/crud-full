import userDB from "../models/model.js";

// Create and save new user
export function createUser(req, res) {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be emtpy!" });
    return;
  }

  // New user
  const user = new userDB({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  // Save user in the database
  user
    .save(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating operation",
      });
    });
}

// Retrieve and return all users/ retrieve and return a single user
export function findUser(req, res) {
  if (req.query.id) {
    const id = req.query.id;
    userDB
      .findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Not found user with id ${id}`,
          });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || `Error retrieving user with ${id}`,
        });
      });
  } else {
    // Find all users in the database
    userDB
      .find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error occurred while retrieving user information",
        });
      });
  }
}

// Update a new identified user by user id
export function updateUser(req, res) {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Data to update can not be empty!" });
    return;
  }

  const id = req.params.id;
  userDB
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update user with id ${id}. Maybe user not found`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error update user information",
      });
    });
}

// Delete a user with specified user id in the request
export function deleteUser(req, res) {
  const id = req.params.id;

  userDB
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete user with id ${id}. Maybe id is wrong`,
        });
      } else {
        res.send({ message: "User was deleted successfully" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete user with id= " + id,
      });
    });
}
