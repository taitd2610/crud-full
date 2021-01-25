import express from "express";
import {
  homeRoutes,
  addUserRoutes,
  updateUserRoutes,
} from "../services/render.js";

import {
  createUser,
  updateUser,
  findUser,
  deleteUser,
} from "../controllers/controller.js";

const route = express.Router();

/**
 * @description Root Router
 * @method GET /
 */
route.get("/", homeRoutes);

/**
 * @description add user
 * @method GET /add-user
 */
route.get("/add-user", addUserRoutes);

/**
 * @description update user
 * @method GET /update-user
 */
route.get("/update-user", updateUserRoutes);

// API
route.post("/api/users", createUser);
route.put("/api/users/:id", updateUser);
route.get("/api/users", findUser);
route.delete("/api/users/:id", deleteUser);

export default route;
