import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  return (
    <>
      <div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const email = formData.get("email");
            const password = formData.get("password");

            console.log(email, password);

            const request = await fetch(
              "http://localhost:3000/api/users/login",
              {
                method: "POST",
                body: JSON.stringify({
                  email,
                  password,
                }),
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
                credentials: "include",
              }
            );

            const data = await request.json();
            console.log(data);
            if (data.message === "connexion réussie") {
              navigate("/profil");
            } else {
              setError(data.message);
            }
          }}
          action=""
        >
          <div>
            <label htmlFor="email">Votre email</label>
            <input type="text" id="email" name="email" />
          </div>
          <div>
            <label htmlFor="password">Votre password</label>
            <input type="password" id="password" name="password" />
          </div>
          {error !== "" ? <p>{error}</p> : null}
          <input type="submit" value="Se connecter" />
        </form>
      </div>
    </>
  );
}

export default LoginPage;
