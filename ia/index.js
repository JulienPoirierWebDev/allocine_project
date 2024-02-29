require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const User = require("./models/UserModel");

const usersRouter = require("./routers/userRouter");

const app = express();

const dbConnexion = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.USERNAME_MONGO}:${process.env.PASSWORD_MONGO}@teachingcluster.rylpson.mongodb.net/crud-mongoose`
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

app.use("/api/users", usersRouter);

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Serveur lancé sur le port ${process.env.PORT}`);
});
