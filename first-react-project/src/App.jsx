import { useEffect, useState } from "react";

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

const ToDoList = () => {
  const [todoList, setTodoList] = useState([]);

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

  const handleDeleteTodo = (todo) => {
    setTodoList(todoList.filter((oneTodo) => oneTodo !== todo));
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
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
  );
};

const ListCourse = () => {
  const [listeDeCourse, setListDeCourse] = useState([]);

  return (
    <div>
      <form
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
                  const newListDeCourse = listeDeCourse.filter((oneCourse) => {
                    if (oneCourse.course !== produit.course) {
                      return oneCourse;
                    }
                  });

                  setListDeCourse(newListDeCourse);
                }}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
};
function App() {
  const [apiData, setApiData] = useState(null);
  const [panier, setPanier] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const request = await fetch(
          "https://passerelle-shop-api.julienpoirier-webdev.com/products"
        );

        const data = await request.json();
        setApiData(data);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);
  return (
    <>
      {apiData ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {apiData.map((product) => {
            return (
              <div
                key={product._id}
                style={{
                  border: "2px solid black",
                  margin: "5px",
                  padding: "20px",
                  width: "200px",
                }}
              >
                <div>
                  <h1 style={{ fontSize: "16px" }}>{product.name}</h1>
                  <p>{product.description}</p>
                  <h3>{product.price} €</h3>
                </div>
                <div>
                  <img
                    style={{ width: "100%", minWidth: "100px" }}
                    src={product.mainImageURL}
                    alt=""
                  />
                </div>
                <button onClick={() => {}}>Acheter</button>
              </div>
            );
          })}
        </div>
      ) : null}
      <ToDoList />
      <ListCourse />
      <ProfilUtilisateur />
      <Formulaire />
    </>
  );
}

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

const Formulaire = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  return (
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
          <label htmlFor="password-confirm">Confirmation du mot de passe</label>
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
  );
};
export default App;
