const express = require("express");

const app = express();

app.get("/", (request, response) => {
  response.send("Vous êtes sur la page principale");
});

app.post("/", (request, response) => {
  response.json({ message: "Ceci est une requête post" });
});

app.get("/hello", (request, response) => {
  response.send("Hello");
});

app.get("/goodbye", (request, response) => {
  response.send("goodbye");
});

app.get("/aha", (request, response) => {
  response.send("aha");
});

app.get("/doc", (request, response) => {
  response.send("doc");
});

app.listen("3001", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server running on port 3001");
  }
});
