import React, { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setTodos([...todos, input]);
      setInput("");
    }
  };

  const handleDelete = (index) => {
    const newTodos = todos.filter((todo, todoIndex) => todoIndex !== index);
    setTodos(newTodos);
  };

  return (
    <>
      <div className="container-fluid my-5">
        <h1 className="text-center" style={{ fontWeight: "bold", color: "#33cc33" }}>TODO LIST</h1>
        <div className="container my-5 border rounded-5 col-md-6" style={{ boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)", backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "10px", border: "1px solid #dee2e6", }} >
          <form className="p-5 col-md-12" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="addTodo" className="form-label">
                Ajouter une tâche
              </label>
              <input type="text" className="form-control" id="addTodo" placeholder="Exemple : Sortir le chien" value={input} onChange={(e) => setInput(e.target.value)} style={{ boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)" }} />
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn" style={{ backgroundColor: "#33cc33" }}> Ajouter </button>
            </div>
          </form>
          <div className="col-md-12">
            <h3 className="text-center">Mes tâches à faire</h3>
            <div className="py-3">
              <ul className="list-group list-group-flush">
                {todos.map((todo, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center" >
                    {todo}
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(index)} > Supprimer </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
