import './TodoList.css'
import "./index.css"
import { useState } from "react"
import { v4 as uuidv4 } from "uuid"

export default function TodoList () {

    let [ todos, setTodos ] = useState([{task: "books", id: uuidv4(), isDone: false}]);  // for re-rendering todo list [array]
    let [ newTodo, setNewTodo ] = useState("");  // for re-rendering todo task input

    let addNewTask = () => {    // on-click for buttton
        setTodos((prevTodos) => {
            return [...prevTodos, { task: newTodo, id: uuidv4(), isDone: false }];
        });
        setNewTodo ("");
    };

    let updateTodoValue = (event) => {   // trigger any changes occur in input
        setNewTodo(event.target.value);
    };

    let deleteTodo = (id) => {    // deletion of task
        setTodos( todos.filter((todo) =>  todo.id != id ));    
    };

    let uppercaseAll = () => {    // updating ALL element of the array 
        setTodos( todos.map((todo) => {
            return{
                ...todo, 
                task: todo.task.toUpperCase(),
            }
        }));
    };

    let uppercaseOne = (id) => {    // updating ONE element of the array 
        setTodos( todos.map((todo) => {
            if(todo.id === id){
                return{
                    ...todo, 
                    task: todo.task.toUpperCase(),
               }
            }else{
                return todo;
            };
        }));
    };

    let styles = () => {
        <style>{{textDecoration: "line through"}}</style>
    }

    let markAsDone = (id) => {       // mark as done 
        setTodos( todos.map((todo) => {
            if(todo.id == id){
                return{
                    ...todo, 
                    isDone: true,
               }
            }else{
                return todo;
            };
        }));
    };
    

    return(
        <div>
            <h1 className='todo-list'><i>Todo List</i></h1>
            <input type="text" placeholder="add your tasks" value={newTodo} onChange={updateTodoValue} className='todo-input'/>

            <button onClick={addNewTask} className='todo-btn' >Add Tasks</button>
            <br /><br /><br /> 
            <hr />

            <h2 ><i>Task Todo </i></h2>

            <ul className='todo-task'>
                {todos.map((todo) => (  
                    <li key={todo.id} > 
                    <span 
                    style={ todo.isDone ? { textDecoration: "line-through"} : { } } > 
                        {todo.task} 
                    </span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    <button onClick={() => {deleteTodo(todo.id)}} className='todo-delete'> Delete </button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    {/* <button onClick={() => {uppercaseOne(todo.id)}}> UpperCase One </button> */}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    <button onClick={() => {markAsDone(todo.id)}} > Mark as done </button>
                    </li> 
                ))}
            </ul>
            <br /><br /> 
            <button onClick={uppercaseAll} className='todo-uppercaseall'>UpperCase All</button>
        </div>
    );
};
