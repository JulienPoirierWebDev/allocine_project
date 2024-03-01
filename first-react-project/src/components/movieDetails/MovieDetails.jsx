import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MovieDetailsCard from "../movieDetailsCard/MovieDetailsCard";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const request = await fetch(
        "https://allocine.julienpoirier-webdev.com/api/movies/details/" + id
      );

      const body = await request.json();

      setMovie(body.data);
    };
    getData();
  }, []);
  return (
    <>
      <button
        onClick={() => {
          navigate("/searchMovie", { state: state });
        }}
      >
        Retour a la recherche
      </button>
      {movie ? <MovieDetailsCard movie={movie} /> : null}
    </>
  );
}

export default MovieDetails;
