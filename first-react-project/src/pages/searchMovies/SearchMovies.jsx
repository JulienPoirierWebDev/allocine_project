import { useState } from "react";
import MovieCard from "../../components/movieCard/MovieCard";

const SearchMovies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "20px" }}
      >
        <form
          action=""
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const search = formData.get("search");

            setIsLoading(true);
            const request = await fetch(
              `http://allocine.julienpoirier-webdev.com/api/movies/search_by_name?name=${search}`
            );

            const data = await request.json();
            setMovies(data.data.results);
            setIsLoading(false);
          }}
          style={{ display: "flex", alignItems: "center" }}
        >
          <label htmlFor="search" style={{ marginRight: "10px" }}>
            Votre recherche
          </label>
          <input
            type="text"
            name="search"
            id="search"
            style={{ marginRight: "10px" }}
          />
          <input type="submit" value="Rechercher" />
        </form>
      </div>

      <div>
        {isLoading
          ? "loading"
          : movies.map((movie) => {
              return <MovieCard key={movie.id} {...movie} />;
            })}
      </div>
    </>
  );
};

export default SearchMovies;
