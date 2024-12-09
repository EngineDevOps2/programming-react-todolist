import React, { useState } from 'react';  
import './TodoList.css'; // CSS برای استایل  

const TodoList = () => {  
  const [todos, setTodos] = useState([]);  
  const [inputValue, setInputValue] = useState('');  

  const addTodo = () => {  
    if (inputValue.trim()) {  
      setTodos([...todos, { text: inputValue, completed: false }]);  
      setInputValue('');  
    }  
  };  

  const toggleTodo = (index) => {  
    const newTodos = [...todos];  
    newTodos[index].completed = !newTodos[index].completed;  
    setTodos(newTodos);  
  };  

  const deleteTodo = (index) => {  
    const newTodos = todos.filter((_, i) => i !== index);  
    setTodos(newTodos);  
  };  

  return (  
    <div className="todo-container">  
      <h1>Todo List</h1>  
      <div className="input-group">  
        <input  
          type="text"  
          className="todo-input"  
          placeholder="Add a new task"  
          value={inputValue}  
          onChange={(e) => setInputValue(e.target.value)}  
        />  
        <button className="add-button" onClick={addTodo}>Add</button>  
      </div>  
      <ul className="todo-list">  
        {todos.map((todo, index) => (  
          <li key={index} className={`todo-item ${todo.completed ? 'completed' : ''}`}>  
            <input  
              type="checkbox"  
              checked={todo.completed}  
              onChange={() => toggleTodo(index)}  
              className="todo-checkbox"  
            />  
            <span onClick={() => toggleTodo(index)} className="todo-text">{todo.text}</span>  
            <button className="delete-button" onClick={() => deleteTodo(index)}>Delete</button>  
          </li>  
        ))}  
      </ul>  
    </div>  
  );  
};  

export default TodoList;
