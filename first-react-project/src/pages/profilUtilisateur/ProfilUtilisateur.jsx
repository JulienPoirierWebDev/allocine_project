import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const ProfilUtilisateur = () => {
  const [userList, setUserList] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const cookieElement = Cookies.get("userId");
    const userId = cookieElement.slice(3, cookieElement.length - 1);
    setUserId(userId);
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
  }, []);
  return (
    <div>
      <h2>User List</h2>

      <div>
        {userList.length > 0 ? (
          userList.map((movie) => (
            <div key={movie.id}>
              <p>{movie.title}</p>
              <p>{movie.description}</p>
              <img
                width="50px"
                src={`https://image.tmdb.org/t/p/original/${movie.poster}`}
                alt={movie.title}
              />
              <p>
                {movie.id} : <span>{movie.status}</span> -
                <span
                  onClick={async () => {
                    const request = await fetch(
                      "http://localhost:3000/api/users/lists/movies/update",
                      {
                        method: "POST",
                        credentials: "include",
                        body: JSON.stringify({
                          TMDBId: movie.TMDBId,
                          userId: userId,
                          status: movie.status === "a voir" ? "vu" : "a voir",
                        }),
                        headers: {
                          "Content-Type": "application/json",
                        },
                      }
                    );

                    const data = await request.json();

                    setUserList(data.data.movies);
                  }}
                >
                  CHANGER DE STATUS
                </span>
              </p>
            </div>
          ))
        ) : (
          <p>Pas de liste de film</p>
        )}
      </div>
    </div>
  );
};

export default ProfilUtilisateur;
