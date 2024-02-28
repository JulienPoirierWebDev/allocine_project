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
function App() {
  const [todoList, setTodoList] = useState([]);
  const [listeDeCourse, setListDeCourse] = useState([]);

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
    <>
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
    </>
  );
}



const ProfilUtilisateur = () => {

// nom + prénom



  return(

    //input nom + prenom

    //si il y a un prénom : afficher : "Vous êtes XXXX" 
    // Si il y a un nom de famille : ajouter " YYYYY"

    // "Vous êtes Julien"
    // Vous êtes Julien POIRIER
  )
}
export default App;

