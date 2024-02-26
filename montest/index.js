const express = require("express");
const mongoose = require("mongoose");

const app = express();

const dbConnexion = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://kevindabs:1234@cluster1.rylpson.mongodb.net/crud-mongoose"
    );

    console.log("DB connexion succed");
  } catch (error) {
    console.log(error);
  }
};

dbConnexion();

const userSchema = mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  birtday: String,
});

const User = mongoose.model("User", userSchema);

// accepter les corps de requêtes (req.body)
app.use(express.json());

// accepter les données issues des formulaires HTML
app.use(express.urlencoded({ extended: false }));

app.post("/api/users", async (request, response) => {
  // fail fast
  const emailAlreadyUsed = await User.find({ email: request.body.email });

  if (emailAlreadyUsed.length > 0) {
    return response.json({ message: "L'email est déja utilisé", error: true });
  }

  const newUser = new User({
    name: request.body.name,
    email: request.body.email,
    password: request.body.password,
  });

  newUser.save();

  response
    .status(201)
    .json({ message: "Utilisateur enregistré", error: false });
});

app.listen("3001", (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Serveur lancé sur le port 3001");
});
