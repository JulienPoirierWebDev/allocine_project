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

export default Todo;
