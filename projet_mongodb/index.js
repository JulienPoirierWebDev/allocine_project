const express = require("express");
const mongoose = require("mongoose");

const app = express();

const dbConnexion = async () => {
  try {
    await mongoose.connect(
        "mongodb+srv://admin:adminadmin@cluster0.x2pbt0m.mongodb.net/"
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

    console.log('coucou');
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



app.get("/api/users", async (request, response) => {
    try {
      const allUsers = await User.find();
  
      if (allUsers.length === 0) {
        response.json({ message: "Pas d'utilisateurs", error: false });
      }
  
      response.json({ data: allUsers, error: false });
    } catch (error) {
      console.log(error);
    }
  });

  app.get("/api/users/:id", async (request, response) => {
    try {
      // vérfier s'il y a bien un ID
      const id = request.params.id;
  
      // check if id is valid mongoose id
      if (!mongoose.Types.ObjectId.isValid(id)) {
        response.status(400).json({ message: "Cet ID n'est pas valide" });
      }
  
      // vérifier s'il y a un utilisateur avec cet id
      const requestedUser = await User.findOne({ _id: id });
  
      // console.log(requestedUser);
  
      // si oui, le renvoyer
      // si non, renvoyer qu'il n'y en a pas.
      if (requestedUser) {
        response.json({ data: requestedUser, error: false });
      } else {
        response.status(404).json({
          message: "Il n'y a pas d'utilisateur avec cet id",
          error: true,
        });
      }
    } catch (error) {}
  });
  

  app.listen("3000", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("Serveur lancé sur le port 3000");
  });
