import React,{useState} from "react";
import {v4 as uuid} from 'uuid'
import NewTodoForm from "./NewTodoForm";
import Todo from "./Todo";


function TodoList() {
    const [todos, setTodos] = useState([])

    function addTodo(todo) {
        setTodos([
            ...todos,
            { id: uuid(), task: todo, completed: false, isEditing: false },
          ]);
          console.log(todos)
    }
    function deleteTodo(id) {
        setTodos(todos => todos.filter(todo => todo.id !== id));
    }
    function editTodo(id) {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
            )
        );
    }
    const editTask = (task, id) => {
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
          )
        );
      };
    return (
        <div>
            <NewTodoForm addTodo={addTodo} />
            {todos.map((todo,index) => (
                <Todo task={todo} key={index} deleteTodo={deleteTodo} editTodo={editTodo} editTask={editTask} isEditing={todo.isEditing}/>
            ))}
          
        </div>
    )
}

export default TodoList;

/**
 * function NewTodoForm({editTodo, task}) {
 * const [value, setValue] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        editTodo(value, task.id)
        setValue('')
    }
    const handleChange = (e) => {
        setValue(e.target.value)
    }

    return (
        <form onSubmit={handleSubmit} className="TodoForm">
        <input type="text" value={value} onChange={handleChange} className="todo-input" placeholder='What is the task today?' />
        <button type="submit" className='todo-btn'>Add Task</button>
      </form>
    )
 */