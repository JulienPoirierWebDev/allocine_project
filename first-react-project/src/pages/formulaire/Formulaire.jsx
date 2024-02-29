import { useState } from "react";

const Formulaire = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  return (
    <>
      <div>
        <form action="">
          <div>
            <label htmlFor="name">Votre nom</label>
            <input type="text" name="name" id="name" />
          </div>
          <div>
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password-confirm">
              Confirmation du mot de passe
            </label>
            <input
              type="password"
              name="password-confirm"
              id="password-confirm"
              onChange={(e) => {
                setPasswordConfirm(e.target.value);
                if (password !== "" && password !== e.target.value) {
                  setError("Les mots de passe ne correspondent pas");
                } else {
                  setError("");
                }
              }}
            />
          </div>
          {error !== "" ? error : null}
          <input type="submit" value="Connexion" />
        </form>
      </div>
    </>
  );
};

export default Formulaire;
