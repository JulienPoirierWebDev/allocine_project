import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import Formulaire from "./pages/formulaire/Formulaire.jsx";
import TodoList from "./pages/todolist/TodoList.jsx";
import Nav from "./components/commons/Nav.jsx";
import ProfilUtilisateur from "./pages/profilUtilisateur/ProfilUtilisateur.jsx";
import SearchMovies from "./pages/searchMovies/SearchMovies.jsx";
import Products from "./pages/products/Products.jsx";
import ListCourse from "./pages/listeCourse/ListeCourse.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Nav />
        <Outlet />
      </div>
    ),
    children: [
      {
        path: "/searchMovie",
        element: <SearchMovies />,
      },
      {
        path: "/formulaire",
        element: <Formulaire />,
      },
      {
        path: "/todolist",
        element: <TodoList />,
      },
      {
        path: "/profil",
        element: <ProfilUtilisateur />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/courses",
        element: <ListCourse />,
      },
    ],
    errorElement: <p>404</p>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
