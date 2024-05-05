import TodoItem from "./Todo";

function TodoView(props) {
    return(
        <div>
            <ul>
                {
                    props.todos.map(todo =>
                    <TodoItem key={todo.id} todo= { todo } />
               )}
            </ul>
        </div>
    )
}

export default TodoView