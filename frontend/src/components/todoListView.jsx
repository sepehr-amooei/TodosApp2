import TodoItem from "./Todo";

function TodoView(props) {
    return(
            <ul className="list-group mb-2">
                {
                    props.todos.map(todo =>
                    <TodoItem key={todo.id} todo= { todo } onEditClick={props.onEditClick} onDeleteClick={props.onDeleteClick}/>
               )}
            </ul>
    )
}

export default TodoView