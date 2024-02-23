const express = require("express");

const app = express();

let data = [
  {
    id: 1,
    name: "Julien",
    email: "test@test.com",
    password: "1234",
    isAdmin: false,
  },
  {
    id: 2,
    name: "Bob",
    email: "bob@test.com",
    password: "1234",
    isAdmin: true,
  },
];

// middleware pour accepter le json dans le body d'une requête.
app.use(express.json());

app.use((request, response, next) => {
  next();
});

app.get("/", (request, response) => {
  response.send("Vous êtes sur la page principale");
});

app.get("/api/users", (request, response) => {
  response.status(200).json({ data: data });
});

app.get("/api/users/:id", (req, res) => {
  if (isNaN(Number(req.params.id))) {
    res.json({
      message: "l'id n'est pas un nombre !!",
      error: true,
    });
  }

  const searchUser = data.find((user) => user.id === Number(req.params.id));

  res.json({ data: searchUser, error: false });
});

app.post("/api/users", (req, res) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    id: Date.now(),
  };

  data.push(newUser);

  res.json({ message: "Utilisateur enregistré dans la bdd", error: false });
});

app.put("/api/users", (req, res) => {
  const updatedUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    id: Number(req.body.id),
  };

  const newData = data.map((user) => {
    console.log(user.id, updatedUser.id);
    if (user.id === updatedUser.id) {
      console.log(updatedUser);
      return updatedUser;
    } else {
      return user;
    }
  });

  data = newData;

  res.json({ message: "Utilisateur mis a jour", error: false });
});

app.delete("/api/users/:id", (req, res) => {
  // Si l'utilisateur existe, on le supprime. Sinon, on informe que l'utilisateur ciblé n'existe pas.

  const userExist = data.find((user) => user.id === Number(req.params.id));

  if (!userExist) {
    res
      .status(204)
      .json({ message: "L'utilisateur n'existe pas", error: true });
  }

  data = data.filter((user) => user.id !== Number(req.params.id));

  res.json({ message: "utilisateur supprimé", error: false });
});

app.listen("3001", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server running on port 3001");
  }
});
