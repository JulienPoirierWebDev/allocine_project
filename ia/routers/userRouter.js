const express = require("express");
const jwt = require("jsonwebtoken");

const {
  createUser,
  getAllUsers,
  getOneUserById,
  modifyUserById,
  deleteUserById,
  login,
} = require("../controllers/UserController");
const authWithJwtMiddleware = require("../middlewares/authWithJwt");

const usersRouter = express.Router();

usersRouter.post("/", createUser);

usersRouter.get("/", getAllUsers);

usersRouter.get("/:id", getOneUserById);

usersRouter.put("/", modifyUserById);

usersRouter.delete("/:id", authWithJwtMiddleware, deleteUserById);

usersRouter.post("/login", login);

module.exports = usersRouter;
