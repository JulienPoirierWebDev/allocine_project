import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import { Container } from './styles';

function RegisterPage() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  return (
    <>
      <div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const email = formData.get("email");
            const password = formData.get("password");
            const name = formData.get("name");

            console.log(email, password);

            const request = await fetch("http://localhost:3000/api/users/", {
              method: "POST",
              body: JSON.stringify({
                email,
                password,
                name,
              }),
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              credentials: "include",
            });

            const data = await request.json();
            console.log(data);
            if (data.message === "ok") {
              navigate("/login");
            } else {
              setError(data.message);
            }
          }}
          action=""
        >
          <div>
            <div>
              <label htmlFor="name">Votre nom</label>
              <input type="name" id="name" name="name" />
            </div>
            <label htmlFor="email">Votre email</label>
            <input
              onChange={() => setError("")}
              type="text"
              id="email"
              name="email"
            />
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

export default RegisterPage;
