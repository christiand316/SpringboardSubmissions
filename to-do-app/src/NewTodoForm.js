import React, {useState} from 'react'

function NewTodoForm({addTodo}) {
    const [value, setValue] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        addTodo(value)
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
}



export default NewTodoForm;