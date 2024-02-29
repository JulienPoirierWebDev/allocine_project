import { useState, useEffect } from "react";

const ProfilUtilisateur = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    console.log("Je suis le message au montage du composant");
    const storedName = localStorage.getItem("nameOfMyUser");
    setName(storedName);

    return () => {
      console.log("Je suis le message au démontage du composant");
    };
  }, []);

  useEffect(() => {
    if (name !== "") {
      localStorage.setItem("nameOfMyUser", name);
    }
  }, [name]);
  return (
    <div>
      <form action="">
        <label htmlFor="name-user">Votre nom</label>
        <input
          type="text"
          name="name-user"
          id="name-user"
          onChange={(e) => setName(e.target.value)}
        />
      </form>
      <p>{name ? `Hello ${name}` : "Hello Stranger"}</p>
    </div>
  );
};

export default ProfilUtilisateur;
