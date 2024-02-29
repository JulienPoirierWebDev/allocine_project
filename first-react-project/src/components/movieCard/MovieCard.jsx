import { useState } from "react";
import styles from "./MovieCard.module.css";

const MovieCard = ({ title, overview, poster_path }) => {
  return (
    <div className={styles.movie}>
      <img
        src={`https://image.tmdb.org/t/p/original/${poster_path}`}
        alt={title}
        className={styles.image}
        loading="lazy"
      />
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;
