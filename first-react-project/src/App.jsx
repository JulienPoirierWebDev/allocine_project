import { useState } from "react";
import Products from "./components/products/Products";
import ListCourse from "./components/listeCourse/ListeCourse";
import ProfilUtilisateur from "./components/profilUtilisateur/ProfilUtilisateur";
import Formulaire from "./components/formulaire/Formulaire";
import SearchMovies from "./components/searchMovies/SearchMovies";

function App() {
  const [page, setPage] = useState("searchPage");
  return (
    <>
      <div>
        <p onClick={() => setPage("searchPage")}>Search</p>
        <p onClick={() => setPage("productsPage")}>Products</p>
        <p onClick={() => setPage("listCoursePage")}>Liste Course</p>
        <p onClick={() => setPage("profilUtilisateurPage")}>
          Profil Utilisateur
        </p>
        <p onClick={() => setPage("formulairePage")}>Formulaire</p>
      </div>

      {page === "searchPage" ? <SearchMovies /> : null}
      {page === "productsPage" ? <Products /> : null}
      {page === "listCoursePage" ? <ListCourse /> : null}
      {page === "profilUtilisateurPage" ? <ProfilUtilisateur /> : null}
      {page === "formulairePage" ? <Formulaire /> : null}
      {/* <Products />
      <ListCourse />
      <ProfilUtilisateur />
      <Formulaire /> */}
    </>
  );
}

export default App;
