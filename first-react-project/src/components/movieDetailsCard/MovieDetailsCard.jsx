import React from "react";

// import { Container } from './styles';

function MovieDetailsCard({ movie }) {
  return (
    <div
      style={{
        width: "70%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        margin: "auto",
      }}
    >
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        alt={movie.title}
        style={{ width: "100%", maxWidth: "300px" }}
      />
      <p>{movie.overview}</p>
      <p>Budget de {movie.budget} $</p>
      <div>
        {movie.genres.map((genre) => {
          return <p key={genre.name}>{genre.name}</p>;
        })}
      </div>
    </div>
  );
}

export default MovieDetailsCard;
