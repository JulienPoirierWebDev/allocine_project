const express = require("express");
const mongoose = require("mongoose");

const User = require("./models/UserModel");

const {
  createUser,
  getAllUsers,
  getOneUserById,
  modifyUserById,
  deleteUserById,
} = require("./controllers/UserController");

const app = express();

const dbConnexion = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://julienpoirier17:1234@teachingcluster.rylpson.mongodb.net/crud-mongoose"
    );

    console.log("DB connexion succed");
  } catch (error) {
    console.log(error);
  }
};

dbConnexion();

// accepter les corps de requêtes (req.body)
app.use(express.json());

// accepter les données issues des formulaires HTML
app.use(express.urlencoded({ extended: false }));

app.post("/api/users", createUser);

app.get("/api/users", getAllUsers);

app.get("/api/users/:id", getOneUserById);

app.put("/api/users/", modifyUserById);

app.delete("/api/users/:id", deleteUserById);

app.listen("3001", (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Serveur lancé sur le port 3001");
});
