import { useState } from "react";
import Todo from "../todo/Todo";

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

export default ToDoList;
