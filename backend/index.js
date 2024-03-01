require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const dbConnexion = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://julienpoirier17:1234@teachingcluster.rylpson.mongodb.net/allocine"
    );

    console.log("db connect");
  } catch (error) {
    console.log("db connexion error :(");
  }
};

dbConnexion();

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
app.use(express.urlencoded({ extended: false }));

// cors for all origins
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// for parsing cookies
app.use(cookieParser());

app.use((req, res, next) => {
  res.header("Content-Type", "application/json");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.json({ message: "prd d'auth", error: true });
    }

    const isAuth = await jwt.verify(token, process.env.JWT_SECRET);

    if (isAuth) {
      const payload = jwt.decode(token);
      const userId = payload.userId;

      req.userId = userId;
      next();
    } else {
      res.json({ message: "prb auth", error: true });
    }
  } catch (error) {
    console.log(error);
  }
};

app.post("/api/users/lists/movies/add", authMiddleware, async (req, res) => {
  try {
    const bodyWithoutUserId = req.body;
    const userId = req.body.userId;
    delete bodyWithoutUserId.userId;

    if (req.userId !== userId) {
      return res.json({ message: "pas le bon user auth", error: true });
    }

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
  } catch (error) {
    res.json({ message: "oups", error: true });
  }
});

app.post("/api/users/lists/movies/update", authMiddleware, async (req, res) => {
  try {
    const userId = req.body.userId;
    const TMDBId = Number(req.body.TMDBId);
    const status = req.body.status;

    if (req.userId !== userId) {
      return res.json({ message: "pas le bon user auth", error: true });
    }

    const movieList = await MovieList.findOne({ userId: userId });

    if (!movieList) {
      return res.status(400).json({
        message: "La liste de l'utilisateur n'existe pas",
        error: true,
      });
    }

    const movie = movieList.movies.find((movie) => {
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
  } catch (error) {
    res.json({ message: "oups", error: true });
  }
});

app.post("/api/users", async (req, res) => {
  try {
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
  } catch (error) {
    res.json({ message: "Oups", error: true });
  }
});

app.post("/api/users/login", async (req, res) => {
  try {
    const password = req.body.password;
    const email = req.body.email;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.json({
        message: "Les identifiants de connexion sont invalides",
        error: true,
      });
    }
    const isGoodPassword = await bcrypt.compare(password, user.password);

    if (!isGoodPassword) {
      return res.json({
        message: "Les identifiants de connexion sont invalides",
        error: true,
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res
      .cookie("token", token, {
        httpOnly: false,
        secure: false,
      })
      .json({ message: "connexion réussie", error: false });
  } catch (error) {
    res.json({ message: "oups", error: error });
  }
});

app.get("/api/movies/search_by_name", async (req, res) => {
  try {
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
  } catch (error) {
    res.json({ message: "oups", error: true });
  }
});

app.get("/api/films/search_by_criterias", async (req, res) => {
  try {
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
  } catch (error) {
    res.json({ message: "oups", error: true });
  }
});

app.listen(3000, () => {
  console.log("Server started (3000)");
});
