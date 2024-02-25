const express = require("express");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://julienpoirier17:1234@teachingcluster.rylpson.mongodb.net/"
);

const app = express();

app.get("/api/movies/search_by_name", async (req, res) => {
  const movieName = req.query.name;
  const page = req.query.page || 1;

  if (!movieName) {
    return res.status(400).json({
      message: "Merci de fournir un élement a rechercher",
      error: true,
    });
  }

  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YTlhMWJjNTE0ZDFkOWY0N2YwYzkzMzQwMjI1ZDdmYyIsInN1YiI6IjY0MmMxMWE0MDFiMWNhMDExM2NkMjdhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1ZDuqbmd4MPWDN5VxLjTn8-2J7ek_SdTT96KNSQ4ZjI";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const request = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=fr-FR&page=${page}`,
    options
  );

  const data = await request.json();

  res.json({ message: "ok", data: data });
});

app.get("/api/films/search_by_criterias", async (req, res) => {
  const query = {
    page: req.query.page || 1,
    year: req.query.year,
  };

  let queryString = "";

  for (const key in query) {
    if (query[key]) {
      queryString += `&${key}=${query[key]}`;
    }
  }

  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&sort_by=popularity.desc${queryString}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YTlhMWJjNTE0ZDFkOWY0N2YwYzkzMzQwMjI1ZDdmYyIsInN1YiI6IjY0MmMxMWE0MDFiMWNhMDExM2NkMjdhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1ZDuqbmd4MPWDN5VxLjTn8-2J7ek_SdTT96KNSQ4ZjI",
    },
  };

  const request = await fetch(url, options);
  const data = await request.json();

  res.json({ message: "ok", data: data });
});

app.listen(3000, () => {
  console.log("Server started");
});
