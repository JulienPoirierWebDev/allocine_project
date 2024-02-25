const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

mongoose.connect(
  "mongodb+srv://julienpoirier17:1234@teachingcluster.rylpson.mongodb.net/allocine"
);

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  photo: String,
  biography: String,
  role: String,
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  moviesList: { type: mongoose.Schema.Types.ObjectId, ref: "MovieList" },
});

const User = mongoose.model("User", userSchema);

const movieSchema = new mongoose.Schema({
  TMDBId: Number,
  title: String,
  date: String,
  poster: String,
  description: String,
  rating: Number,
});

const Movie = mongoose.model("Movie", movieSchema);

const movieListSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  movies: [
    {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
      status: { type: String, enum: ["vu", "a voir"] },
      TMDBId: Number,
    },
  ],
});

const MovieList = mongoose.model("MovieList", movieListSchema);

const app = express();

app.use(express.json());

app.post("/api/users/lists/movies/add", async (req, res) => {
  const bodyWithoutUserId = req.body;
  const userId = req.body.userId;
  delete bodyWithoutUserId.userId;

  const existingMovie = await Movie.findOne({
    TMDBId: req.body.TMDBId,
  });

  const newMovie = new Movie(bodyWithoutUserId);

  if (!existingMovie) {
    await newMovie.save();
  }

  const movieList = await MovieList.findOne({ userId: userId });

  if (!movieList) {
    const newMovieList = new MovieList({
      userId: userId,
      movies: [
        {
          id: existingMovie ? existingMovie._id : newMovie._id,
          status: "a voir",
          TMDBId: req.body.TMDBId,
        },
      ],
    });

    const user = await User.findById(userId);
    user.moviesList = newMovieList._id;
    await user.save();

    await newMovieList.save();

    return res.json({
      message: "Film ajouté avec succès a la liste de l'utilisateur",
      data: newMovieList,
    });
  }

  const existingMovieInList = movieList.movies.find(
    (movie) =>
      movie.id.toString() ===
      (existingMovie ? existingMovie._id : newMovie._id).toString()
  );

  if (existingMovieInList) {
    return res.status(400).json({
      message: "Ce film est déjà dans la liste de l'utilisateur",
      error: true,
    });
  }

  movieList.movies.push({
    id: existingMovie ? existingMovie._id : newMovie._id,
    status: "a voir",
  });

  await movieList.save();

  res.json({
    message: "Film ajouté avec succès a la liste de l'utilisateur",
    data: movieList,
  });
});

app.post("/api/users/lists/movies/update", async (req, res) => {
  const userId = req.body.userId;
  const TMDBId = Number(req.body.TMDBId);
  const status = req.body.status;

  const movieList = await MovieList.findOne({ userId: userId });

  if (!movieList) {
    return res.status(400).json({
      message: "La liste de l'utilisateur n'existe pas",
      error: true,
    });
  }

  const movie = movieList.movies.find((movie) => {
    console.log(movie.TMDBId, TMDBId);
    return movie.TMDBId === TMDBId;
  });

  if (!movie) {
    return res.status(400).json({
      message: "Ce film n'est pas dans la liste de l'utilisateur",
      error: true,
    });
  }

  movie.status = status;

  await movieList.save();

  res.json({
    message: "Statut du film mis à jour avec succès",
    data: movieList,
  });
});

app.post("/api/users", async (req, res) => {
  const user = new User(req.body);

  const existingUser = await User.findOne({
    email: req.body.email,
  });

  if (existingUser) {
    return res.status(400).json({
      message: "Un utilisateur avec cette adresse email existe déjà",
      error: true,
    });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  user.password = hashedPassword;

  user.role = "user";

  const userWithoutPassword = user.toObject();
  delete userWithoutPassword.password;

  await user.save();
  res.json({ message: "ok", data: userWithoutPassword });
});

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
