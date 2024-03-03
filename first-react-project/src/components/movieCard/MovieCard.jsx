import { Link } from "react-router-dom";
import styles from "./MovieCard.module.css";

const MovieCard = (props) => {
  const {
    title,
    overview,
    poster_path,
    id,
    search,
    userId,
    isInUserList,
    updateUserList,
  } = props;
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
        {userId && !isInUserList ? (
          <p
            onClick={async () => {
              const request = await fetch(
                "http://localhost:3000/api/users/lists/movies/add",
                {
                  method: "POST",
                  credentials: "include",
                  body: JSON.stringify({
                    ...props,
                    TMDBId: id,
                    userId: userId,
                  }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );

              const data = await request.json();

              if (!data.error) {
                updateUserList(data.data.movies);
              }

              console.log(data);
            }}
          >
            Ajouter a ma liste
          </p>
        ) : (
          <p>Deja dans la liste</p>
        )}
        <Link to={`/movie-details/${id}`} state={{ search: search }}>
          En savoir plus
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
