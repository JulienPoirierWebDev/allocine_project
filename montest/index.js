const express = require("express");
//const mongoose = require("mongoose");
const User = require(../models/UserModel.js)

const app = express();

const dbConnexion = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://tsankera:1234@cluster01.9p5o38i.mongodb.net/crud-mongoose"
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
  if (request.body.email || !request.body.name || !request.body.password) {
    return response.json({
        message: "Il manque l'une des données",
        error: true,
    })
  }
  const emailAlreadyUsed = await User.find({ email: request.body.email });

  if (emailAlreadyUsed.length > 0) {
    return response.json({ message: "L'email est déja utilisé", error: true });
  }
app.get("/api/users", async (request, response) => {
    const allUsers = await User.find();

    if(allUsers.length === 0) {
        response.json({message: "Pas d'utilisateurs", error: false});
    }

    response.json({ data: allUsers, error: false})
})

app.get("/api/users/:id", async (request, response) => {
    try {
        //Vérifier s'il y a bien un ID
        const id = request.params.id;

        //check if id is valid mongoose id
        if (!mongoose.Types)
    } catch (error) {
        
    }
})




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
