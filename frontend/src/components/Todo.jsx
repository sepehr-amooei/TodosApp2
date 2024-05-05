import axios from "axios";
import React from "react";

function TodoItem(props) {
    const deleteTodoHandler = (id) => {
        axios.delete(`http://127.0.0.1:8000/todo/${id}`)
            .then((response) => {console.log(response.data)});

    }
    return (
        <div>
            <p>
                <span style={{"fontWeight": "bold, underline"}}>
                   {props.todo.title} : </span> {props.todo.description} ({props.todo.priority})
                <button onClick={() => deleteTodoHandler(props.todo.id)}
                        className="btn btn-outline-danger mx-2 mb-4" >Delete</button>
            </p>
        </div>
    )
}

export default TodoItem