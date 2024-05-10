import './App.css';
import React, {useState,useEffect} from "react";
import axios from "axios";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import TodoView from "./components/todoListView";


function App() {
    const [todoList, setTodoList] = useState([{}]);
    const [todo, setTodo] = useState({});
    const [title, setTitle] = useState('title');
    const [description, setDescription] = useState('discription');
    const [priority, setSelectedPriority] = useState(1);
    const [complete, setSelectedComplete] = useState(false);

    useEffect(() => {
    axios.get('http://127.0.0.1:8000/todos').then(res => {
        setTodoList(res.data)
    })
}, [todo, priority]);
    const deleteTodoHandler = (id) => {
        axios.delete(`http://127.0.0.1:8000/todo/${id}`)
            .then((response) => {
                console.log(response)
                setTodoList(todoList.filter(todo => todo.id !== id))
            });
    }

    const addTodoHandler = () => {
        setTodo({"title": title, 'description': description, "priority": priority, "complete": false})
        axios.post('http://127.0.0.1:8000/todo',todo
            )
            .then(res => {
                console.log(res.data)
            })
    };

    const handlePriorityChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setSelectedPriority(value)
        console.log(typeof value, value)
    }
    const handleCompleteChange = (event) => {
        const comValue = event.target.value === "true";
        setSelectedComplete(comValue)
        console.log( typeof comValue, comValue)
    }
  return (
      <div className="listGroup App list-group-item justify-content-center align-items-center mx-auto" >
          <div className="card">
              <h1 className="card text-white bg-primary mb-1" style={{"maxWidth": "40rem"}}>Task Manager</h1>
              <div className="card-body">
                  <h5 className="card text-white bg-black mb-3">Add Your Task</h5>
                  <span className="card-text">
                    <input className="mb-2 form-control titleIn" placeholder="Title"
                           onChange={event => setTitle(event.target.value)}/>
                    <input className="mb-2 form-control titleIn" placeholder="Description"
                           onChange={event => setDescription(event.target.value)}/>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">Priority</label>
                      </div>
                      <select className="custom-select" id="inputGroupSelect01" style={{"width": "130px"}}
                              onChange={handlePriorityChange}>
                          <option>Choose</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                    <button className="btn btn-outline-primary mx-2 mb-4" style={{
                        "borderRadius": "50px",
                        "fontWeight": "bold"
                    }}
                            onClick={addTodoHandler}
                    >
                        Add Task
                    </button>
                </span>
                  <h5 className="card text-white bg-dark mb-2">Your Tasks</h5>
                  <div>
                      <TodoView todos={todoList} onDeleteClick={deleteTodoHandler}/>
                  </div>
                  <h6 className="card text-dark bg-warning py-1 mb-3">
                      2024, All rights reserved &copy;
                  </h6>
              </div>
              </div>
          </div>
          );
          }

export default App;
