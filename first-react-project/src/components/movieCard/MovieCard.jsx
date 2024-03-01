import { Link } from "react-router-dom";
import styles from "./MovieCard.module.css";

const MovieCard = ({ title, overview, poster_path, id }) => {
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
      <Link to={`/movie-details/${id}`}>En savoir plus</Link>
    </div>
  );
};

export default MovieCard;
