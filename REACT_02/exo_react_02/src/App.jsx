import { useState } from "react";

const Todo = ({ oneTodo, handleDeleteTodo, quantity }) => {
  return (
    <li>
      {oneTodo}

      {quantity ? ` - ${quantity}` : null}

      <span style={{ cursor: "pointer" }} onClick={handleDeleteTodo}>
        X
      </span>
    </li>
  );
};
// ########################################################################################################################
const ProfilUtilisateur = ({ nom, prenom }) => {
  let message = "Vous êtes ";
  if (prenom) {
    message += prenom;
  }
  if (nom) {
    message += " " + nom;
  }
  return (
    <p
      style={{ fontWeight: "bold", color: "#33cc33" }}
      className="text-center my-5"
    >
      {message}
    </p>
  );
};
// ########################################################################################################################

function App() {
  const [todoList, setTodoList] = useState([]);
  // #########################################################################
  const [listeDeCourse, setListDeCourse] = useState([]);
  // #########################################################################
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  // #########################################################################
  const [message, setMessage] = useState("");
  // #########################################################################

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("coucou");
    const formData = new FormData(event.target);
    const newTodo = formData.get("todo").trim();
    if (newTodo !== "" && !todoList.includes(newTodo)) {
      setTodoList([...todoList, newTodo]);
    }
    event.target.reset();
  };
  // ###########################################################################
  const handleDeleteTodo = (todo) => {
    setTodoList(todoList.filter((oneTodo) => oneTodo !== todo));
  };
  // ###########################################################################

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas.");
    } else {
      // Ici, vous pouvez ajouter la logique pour gérer la connexion, par exemple en vérifiant les identifiants dans une base de données
      setMessage("Connexion réussie.");
    }
  };

  return (
    <>
      {/* ######################################################################################################################################################### */}
      <div
        className="container my-5 border"
        style={{
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
          backgroundColor: "#f8f9fa",
          padding: "20px",
          borderRadius: "10px",
          border: "1px solid #dee2e6",
          width: "75%",
        }}
      >
        <form className="d-flex flex-column col-md-6 gap-1 justify-content-center mx-auto" action="" onSubmit={handleSubmit}>
          <label htmlFor="todo">Votre todo a ajouter</label>
          <input type="text" id="todo" name="todo" />
          <input type="submit" />
        </form>

        <div>
          <h2>Mes choses a faire </h2>
          {todoList.map((oneTodo) => {
            return (
              <Todo
                key={oneTodo}
                oneTodo={oneTodo}
                handleDeleteTodo={handleDeleteTodo}
              />
            );
          })}
        </div>
      </div>
      {/* ########################################################################################################################################################## */}
      <div
        className="container my-5 border"
        style={{
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
          backgroundColor: "#f8f9fa",
          padding: "20px",
          borderRadius: "10px",
          border: "1px solid #dee2e6",
          width: "75%",
        }}
      >
        <form
          className="d-flex flex-column col-md-6 gap-1 justify-content-center mx-auto"
          action=""
          onSubmit={(event) => {
            event.preventDefault();
            const formData = new FormData(event.target);
            const course = formData.get("course");
            const quantity = formData.get("quantity");

            const newItem = {
              course: course,
              quantity: quantity,
            };

            setListDeCourse([...listeDeCourse, newItem]);
            event.target.reset();
          }}
        >
          <label htmlFor="course">Ajouter un produit</label>
          <input type="text" name="course" id="course" />
          <label htmlFor="quantity">Combien ?</label>
          <input type="number" name="quantity" id="quantity" />
          <input type="submit" />
        </form>

        {listeDeCourse.length > 0 ? (
          <div>
            <h2>Ma liste de course</h2>
            {listeDeCourse.map((produit) => {
              return (
                <Todo
                  key={produit.course}
                  oneTodo={produit.course}
                  quantity={produit.quantity}
                  handleDeleteTodo={() => {
                    const newListDeCourse = listeDeCourse.filter(
                      (oneCourse) => {
                        if (oneCourse.course !== produit.course) {
                          return oneCourse;
                        }
                      }
                    );

                    setListDeCourse(newListDeCourse);
                  }}
                />
              );
            })}
          </div>
        ) : null}
      </div>
      {/* ######################################################################################################################################################## */}

      <div
        className="container my-5 border d-flex flex-column col-md-6"
        style={{
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
          backgroundColor: "#f8f9fa",
          padding: "20px",
          borderRadius: "10px",
          border: "1px solid #dee2e6",
          width: "75%",
        }}
      >
        <h1
          className="text-center mt-3"
          style={{ fontWeight: "bold", color: "#33cc33" }}
        >
          Formulaire de contact
        </h1>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="d-flex flex-column col-md-6 gap-1 justify-content-center mx-auto"
        >
          <label htmlFor="nom">Nom:</label>
          <input
            type="text"
            id="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
          <label htmlFor="prenom" className="mt-3">
            Prénom:
          </label>
          <input
            type="text"
            id="prenom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
          />
          <button
            type="submit"
            className="mt-3 btn btn-primary d-flex justify-content-center col-md-6 mx-auto"
          >
            Soumettre
          </button>
        </form>
        {/* <ProfilUtilisateur nom={nom} prenom={prenom} /> */}

        <p>
          {nom ? `Votre nom est : ${nom}` : null}

          <br />
          {prenom ? `Votre prenom est : ${prenom}` : null}
        </p>
      </div>
      {/* ######################################################################################################################################################## */}

      <div
        className="container my-5 border d-flex flex-column col-md-6"
        style={{
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
          backgroundColor: "#f8f9fa",
          padding: "20px",
          borderRadius: "10px",
          border: "1px solid #dee2e6",
          width: "75%",
        }}
      >
        <h1
          className="text-center mt-3"
          style={{ fontWeight: "bold", color: "blue" }}
        >
          Formulaire de connexion
        </h1>
        <form
          onSubmit={handleLoginSubmit}
          className="d-flex flex-column col-md-6 gap-1 justify-content-center mx-auto"
        >
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" required />
          <label htmlFor="password" className="mt-3">
            Mot de passe:
          </label>
          <input type="password" id="password" required />
          <label htmlFor="confirmPassword" className="mt-3">
            Confirmer le mot de passe:
          </label>
          <input type="password" id="confirmPassword" required />
          <button
            type="submit"
            className="mt-3 btn btn-primary d-flex justify-content-center col-md-6 mx-auto"
          >
            Soumettre
          </button>
        </form>
        <p
          className="text-center mt-3"
          style={{ fontWeight: "bold", color: "black" }}
        >
          {message}
        </p>
      </div>
    </>
  );
}

// nom + prénom

//input nom + prenom

//si il y a un prénom : afficher : "Vous êtes XXXX"
// Si il y a un nom de famille : ajouter " YYYYY"

// "Vous êtes Julien"
// Vous êtes Julien POIRIER

export default App;
