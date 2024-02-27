// Importer le module Express pour créer un serveur web
const express = require("express");
// Importer le module Mongoose pour interagir avec MongoDB
const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
  
    if (!token) {
      return res.status(403).json({ message: "Un token est requis" });
    }
  
    try {
      const decoded = jwt.verify(token, 'your_secret_key');
      req.user = decoded;
    } catch (err) {
      return res.status(401).json({ message: "Invalid Token" });
    }
  
    return next();
  };

const bcrypt = require("bcrypt");

// Créer une instance d'application Express
const app = express();

// Fonction pour se connecter à la base de données MongoDB
const dbConnexion = async () => {
  try {
    // Se connecter à la base de données MongoDB
    await mongoose.connect(
      "mongodb+srv://visothyouksim:S0n4-g12@cluster0.bt5qjav.mongodb.net/crud-mongoose"
    );

    console.log("DB Connexion succeed");
  } catch (error) {
    console.log(error);
  }
};

// Appeler la fonction pour se connecter à la base de données
dbConnexion();

// Définir le schéma pour les utilisateurs dans MongoDB
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  birthday: String,
});

// Créer un modèle Mongoose basé sur le schéma défini
const Users = mongoose.model("Users", userSchema);

// Configurer Express pour accepter les corps de requêtes JSON
app.use(express.json());
// Configurer Express pour accepter les données de formulaire HTML
app.use(express.urlencoded({ extended: false }));

// Route pour créer un nouvel utilisateur
app.post("/api/users/create", async (request, response) => {
  // Vérifier si les données requises sont présentes
  if (!request.body.email || !request.body.name || !request.body.password) {
    return response.json({
      message: "Il manque l'une des données",
      error: true,
    });
  }

  // Vérifier si l'email est déjà utilisé
  const emailAlreadyUsed = await Users.find({ email: request.body.email });

  if (emailAlreadyUsed.length > 0) {
    return response.json({ message: "L'email est déjà utilisée", error: true });
  }

  // Utiliser bcrypt pour hacher le mot de passe de l'utilisateur
  // Le deuxième argument est le "saltRounds", qui est le nombre de fois que le mot de passe sera haché
  // Un nombre plus élevé rend le hachage plus sécurisé mais aussi plus lent
  const hashedPassword = await bcrypt.hash(request.body.password, 10);

  // Créer un nouvel utilisateur avec le mot de passe haché
  const newUser = new Users({
    name: request.body.name,
    email: request.body.email,
    password: hashedPassword,
  });

  // Sauvegarder le nouvel utilisateur dans la base de données
  await newUser.save();

  // Répondre avec un message de succès
  response
    .status(201)
    .json({ message: "Utilisateur enregistré", error: false });
});

// Route pour récupérer tous les utilisateurs ####################################################################################################################

// app.get('/api/users', verifyToken, async (request, response) => {
//     try {
//       const users = await Users.find({});
//       response.json(users);
//     } catch (error) {
//       response.status(500).json({
//         message: "Erreur lors de la récupération des utilisateurs",
//         error: true,
//       });
//     }
//   });

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

// Route pour trouver un utilisateur par ID ##########################################################################################################################
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

// Route pour mettre à jour un utilisateur par ID ###################################################################################################################
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

// Route pour supprimer un utilisateur par ID #########################################################################################################################
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

// Route pour la connexion ###################################################################################################################################################
app.post("/api/users/login", async (request, response) => {
  // Vérifier si les données requises sont présentes
  if (!request.body.email || !request.body.password) {
    return response.json({
      message: "Il manque l'une des données",
      error: true,
    });
  }

  // Rechercher l'utilisateur par email
  const user = await Users.findOne({ email: request.body.email });

  if (!user) {
    return response.json({ message: "Utilisateur non trouvé", error: true });
  }

  // Comparer le mot de passe fourni avec le mot de passe haché stocké
  const isMatch = await bcrypt.compare(request.body.password, user.password);

  if (!isMatch) {
    return response.json({ message: "Mot de passe incorrect", error: true });
  }

  // Générer un token JWT
  const token = jwt.sign({ id: user._id }, "your_secret_key", {
    expiresIn: "1h",
  });

  // Si tout est correct, renvoyer un message de succès avec le token
  response.json({ message: "Connexion réussie", user: user, token: token });
});

//   ######################################################################################################################################################################

// Démarrer le serveur sur le port  3001
app.listen("3001", (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Serveur lançé sur le port  3001");
});
