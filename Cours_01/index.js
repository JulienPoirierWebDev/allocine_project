const express = require("express");
const mongoose = require("mongoose");

const app = express();

const dbConnexion = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://visothyouksim:S0n4-g12@cluster0.bt5qjav.mongodb.net/crud-mongoose"
    );

    console.log("DB Connexion succeed");
  } catch (error) {
    console.log(error);
  }
};

dbConnexion();

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  birthday: String,
});

const Users = mongoose.model("Users", userSchema);

// accepter les corps de requêtes (req.body)
app.use(express.json());

// accepter les données issues des formulaires HTML
app.use(express.urlencoded({ extended: false }));

// #################### CREATE ###############################################################################################################################################

app.post("/api/users/create", async (request, response) => {
  // fail fast
  if (!request.body.email || !request.body.name || !request.body.password) {
    return response.json({
      message: "Il manque l'une des données",
      error: true,
    });
  }

  const emailAlreadyUsed = await Users.find({ email: request.body.email });

  if (emailAlreadyUsed.length > 0) {
    return response.json({ message: "L'email est déjà utilisée", error: true });
  }

  const newUser = new Users({
    name: request.body.name,
    email: request.body.email,
    password: request.body.password,
  });

  console.log(emailAlreadyUsed);

  await newUser.save();

  response
    .status(201)
    .json({ message: "Utilisateur enregistré", error: false });
});

// #################### READ ALL ###############################################################################################################################################

app.get("/api/users", async (request, response) => {
  try {
    const users = await Users.find({});
    response.json(users);
  } catch (error) {
    response.status(500).json({
      message: "Erreur lors de la récupération des utilisateurs",
      error: true,
    });
  }
});

// ################################### FINDONE BY ID  #############################################################################################################################

app.get("/api/users/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const user = await Users.findOne({ _id: id });

    if (!user) {
      return response
        .status(404)
        .json({ message: "Utilisateur non trouvé", error: true });
    }

    response.status(200).json({ message: "Utilisateur trouvé", user: user });
  } catch (error) {
    response.status(500).json({
      message: "Erreur lors de la récupération de l'utilisateur",
      error: true,
    });
  }
});

// ############## UPDATE BY ID ##############################################################################################################################################

app.put("/api/users/update/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const update = request.body;

    const updatedUser = await Users.findByIdAndUpdate(id, update, {
      new: true,
    });

    if (!updatedUser) {
      return response
        .status(404)
        .json({ message: "Utilisateur non trouvé", error: true });
    }

    response
      .status(200)
      .json({ message: "Utilisateur mis à jour", user: updatedUser });
  } catch (error) {
    response.status(500).json({
      message: "Erreur lors de la mise à jour de l'utilisateur",
      error: true,
    });
  }
});

//   #################### DELETE BY ID #########################################################################################################################################

app.delete("/api/users/delete/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Users.findByIdAndDelete(id);

    if (!result) {
      return response
        .status(404)
        .json({ message: "Utilisateur non trouvé", error: true });
    }

    response
      .status(200)
      .json({ message: "Utilisateur supprimé", user: result });
  } catch (error) {
    response.status(500).json({
      message: "Erreur lors de la suppression de l'utilisateur",
      error: true,
    });
  }
});

// ############################################################################################

app.listen("3001", (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Serveur lançé sur le port 3001");
});
