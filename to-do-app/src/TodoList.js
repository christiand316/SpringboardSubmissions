import React, { useState } from "react";
import { v4 as uuid } from 'uuid'
import NewTodoForm from "./NewTodoForm";
import Todo from "./Todo";


function TodoList() {
  const [todos, setTodos] = useState([])

  function addTodo(todo) {
    setTodos([
      ...todos,
      { id: uuid(), task: todo, completed: false },
    ]);
  }
  function deleteTodo(id) {
    setTodos(todos => todos.filter(todo => todo.id !== id));
  }

  const updateTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };
  return (
    <div>
      <NewTodoForm addTodo={addTodo} />
      {todos.map((todo, index) => (
        <Todo task={todo} key={index} deleteTodo={deleteTodo} updateTask={updateTask} />
      ))}

    </div>
  )
}

export default TodoList;
