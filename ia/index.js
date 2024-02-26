const express = require("express");

const app = express();

// accepter les corps de requêtes (req.body)
app.use(express.json());

// accepter les données issues des formulaires HTML
app.use(express.urlencoded({ extended: false }));

app.listen("3001", (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Serveur lancé sur le port 3001");
});
