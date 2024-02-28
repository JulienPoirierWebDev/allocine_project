import React from 'react';

const TodoList = ({ todos, onDelete }) => {
 return (
    <div className="col-md-12">
      <h3 className="text-center">Mes tâches à faire</h3>
      <div className="py-3">
        <ul className="list-group list-group-flush">
          {todos.map((todo, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              {todo}
              <button className="btn btn-danger btn-sm" onClick={() => onDelete(index)}>Supprimer</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
 );
};

export default TodoList;