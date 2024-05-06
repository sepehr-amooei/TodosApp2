import React from "react";
import {Link} from "react-router-dom";
function TodoItem(props) {
    return (
        <li key={props.todo.id} className="list-group-item mb-1 p-2 list-group-item-dark d-flex justify-content-center align-items-center">
                <Link to={`/page/${props.todo.id}`} style={{"fontWeight": "bold", "width": "100px" , "textDecoration": "none"}}>
                   {props.todo.title}  </Link>
                <span style={{"width": "125px"}}></span> {props.todo.description}
                <span style={{"width": "125px"}} className="badge text-primary">{props.todo.priority}</span>
                <button onClick={() => props.onDeleteClick(props.todo.id)}
                        className="btn btn-danger mx-2">
                    Delete
                </button>

        </li>
    )
}

export default TodoItem