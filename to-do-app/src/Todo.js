import React, { useState } from "react";
import './Todo.css'

function Todo({ task, deleteTodo, updateTask }) {
    const [value, setValue] = useState(task.task)
    const [isEditing, setEditing] = useState(false)

    function handleDelete() {
        deleteTodo(task.id)
    }

    function handleEdit() {
        setEditing(true)
        updateTask(task.id)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        updateTask(value, task.id);
        setEditing(false)
    }

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    return (isEditing ? (<div className="todo-item">
        <form onSubmit={handleSubmit} className="TodoForm">
            <input type="text" value={value} onChange={handleChange} className="todo-input" placeholder='What is the task today?' />
            <button type="submit" className='todo-btn'>Set Task</button>
        </form>
    </div>) : (<div className="todo-item">
        <p>{task.task}</p>
        <div className="button-wrapper">
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    </div>))
}

export default Todo