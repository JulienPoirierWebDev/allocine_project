const User = require("../models/UserModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (request, response) => {
  try {
    // fail fast
    if (!request.body.email || !request.body.name || !request.body.password) {
      return response.json({
        message: "Il manque l'une des données",
        error: true,
      });
    }

    const emailAlreadyUsed = await User.find({ email: request.body.email });

    if (emailAlreadyUsed.length > 0) {
      return response.json({
        message: "L'email est déja utilisé",
        error: true,
      });
    }
    console.log(request.body.password);
    const hashedPassword = await bcrypt.hash(request.body.password, 12);

    const newUser = new User({
      name: request.body.name,
      email: request.body.email,
      password: hashedPassword,
    });

    newUser.save();

    response
      .status(201)
      .json({ message: "Utilisateur enregistré", error: false });
  } catch (error) {
    console.log(error);
    response.json({ message: "Oups", error: true });
  }
};

const getAllUsers = async (request, response) => {
  try {
    const allUsers = await User.find();

    if (allUsers.length === 0) {
      response.json({ message: "Pas d'utilisateurs", error: false });
    }

    response.json({ data: allUsers, error: false });
  } catch (error) {
    console.log(error);
  }
};

const getOneUserById = async (request, response) => {
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
  } catch (error) {
    console.log(error);
    response.json({ message: "Oups", error: true });
  }
};

const modifyUserById = async (request, response) => {
  try {
    const id = String(request.body.id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({ message: "Cet ID n'est pas valide" });
    }

    const requestedUser = await User.findOne({ _id: id });

    if (!requestedUser) {
      response.status(404).json({
        message: "Il n'y a pas d'utilisateur avec cet id",
      });
    }

    if (request.body.name) {
      requestedUser.name = request.body.name;
    }

    if (request.body.email) {
      requestedUser.email = request.body.email;
    }

    if (request.body.password) {
      requestedUser.password = request.body.password;
    }

    if (request.body.birtday) {
      requestedUser.birtday = request.body.birtday;
    }

    // requestedUser = { ...requestedUser, ...request.body };

    requestedUser.save();

    response.json({ message: "Utilisateur mis à jour", error: false });
  } catch (error) {
    // console.log(error);
    response.status(500).json({ message: "Oups", error: true });
  }
};

const deleteUserById = async (request, response) => {
  try {
    const id = request.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({ message: "Cet ID n'est pas valide" });
    }

    const isUser = await User.exists({ _id: id });

    if (!isUser) {
      return response.status(404).json({
        message: "Il n'y a pas d'utilisateur avec cet id",
        error: true,
      });
    }

    const userToDelete = await User.find({ _id: id });

    if (request.email !== userToDelete.email) {
      return response.json({ message: "pas le bon email" });
    }

    await User.deleteOne({ _id: id });

    response.json({ message: "Utilisateur supprimé", error: false });
  } catch (error) {
    response.status(500).json({ message: "Oups", error: true });
  }
};

const login = async (request, response) => {
  const password = request.body.password;
  const email = request.body.email;

  const existingUser = await User.findOne({ email: email });

  if (!existingUser) {
    return response
      .status(404)
      .json({ message: "bad credentials", error: true });
  }

  const isGoodPassword = await bcrypt.compare(password, existingUser.password);

  if (isGoodPassword) {
    const myToken = jwt.sign(
      { email: existingUser.email },
      process.env.SECRET_JWT,
      {
        expiresIn: "24h",
      }
    );
    response.json({
      message: "Bon mot de passe :)",
      jwt: myToken,
      error: false,
    });
  } else {
    response.status(404).json({ message: "bad credentials", error: true });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getOneUserById,
  modifyUserById,
  deleteUserById,
  login,
};
