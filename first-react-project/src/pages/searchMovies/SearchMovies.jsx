import { useEffect, useState } from "react";
import MovieCard from "../../components/movieCard/MovieCard";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const SearchMovies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { state } = useLocation();
  const [userId, setUserId] = useState(null);
  const [userList, setUserList] = useState([]);

  const handleUpdateUserList = async () => {
    const resquest = await fetch(
      `http://localhost:3000/api/users/${userId}/lists/`
    );

    const data = await resquest.json();
    if (!data.error) {
      setUserList(data.data.movies);
    }
  };

  useEffect(() => {
    const cookieElement = Cookies.get("userId");
    if (cookieElement) {
      const userId = cookieElement.slice(3, cookieElement.length - 1);
      setUserId(userId);
    }
    if (state && state.search) {
      setSearch(state.search);

      setIsLoading(true);

      const getData = async () => {
        const request = await fetch(
          `https://allocine.julienpoirier-webdev.com/api/movies/search_by_name?name=${state.search}`
        );

        const data = await request.json();
        setMovies(data.data.results);
        setIsLoading(false);
      };

      getData();
    }

    if (userId) {
      const getUserList = async () => {
        const resquest = await fetch(
          `http://localhost:3000/api/users/${userId}/lists/`
        );

        const data = await resquest.json();
        if (!data.error) {
          setUserList(data.data.movies);
        }
      };

      if (userId) {
        getUserList();
      }
    }
  }, []);

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
              `https://allocine.julienpoirier-webdev.com/api/movies/search_by_name?name=${search}`
            );

            const data = await request.json();
            setMovies(data.data.results);
            setSearch(search);
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
            defaultValue={search}
          />
          <input type="submit" value="Rechercher" />
        </form>
      </div>

      <div>
        {isLoading
          ? "loading"
          : movies.map((movie) => {
              return (
                <MovieCard
                  key={movie.id}
                  {...movie}
                  search={search}
                  userId={userId}
                  isInUserList={userList.some(
                    (userMovie) => userMovie.TMDBId === movie.id
                  )}
                  updateUserList={handleUpdateUserList}
                />
              );
            })}
      </div>
    </>
  );
};

export default SearchMovies;
