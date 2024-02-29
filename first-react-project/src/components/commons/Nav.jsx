import { Link, useLocation } from "react-router-dom";
import styles from "./Nav.module.css";

const Nav = () => {
  const location = useLocation();

  const links = [
    { path: "/", content: "Accueil" },
    { path: "/todolist", content: "Todolist" },
    { path: "/searchMovie", content: "Rechercher un film" },
    { path: "/profil", content: "Profil" },
    { path: "/courses", content: "Vos courses" },
    { path: "/products", content: "Nos produits" },
  ];
  return (
    <div className={styles.nav}>
      {links.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={
            link.path === location.pathname ? styles.selected : styles.normal
          }
        >
          {link.content}
        </Link>
      ))}
    </div>
  );
};

export default Nav;
