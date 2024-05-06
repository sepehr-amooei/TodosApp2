import React, {useEffect, useState} from 'react'
import {Form, useParams, redirect} from "react-router-dom";
import axios, {get} from "axios";

export default function TodoPage() {
    const {id} = useParams();
    const [todo, setTodo] = useState({})
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setSelectedPriority] = useState(1);
    const [complete, setSelectedComplete] = useState(false);

    useEffect(() =>{
        axios.get(`http://127.0.0.1:8000/todo/${id}`)
            .then(res => {
                const todoData = res.data;
                setTodo(todoData);
                setTitle(todoData.title);  // Set the title from the fetched data
                setDescription(todoData.description || '');  // Ensure default value
                setSelectedPriority(todoData.priority || 1);  // Ensure default value
                setSelectedComplete(todoData.complete || false);  // Ensure default value)
            })
    },[id])
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
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    }
    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

  const EditTodoHandler = () => {
    const updatedTodo = {
      title,
      description,
      priority,
      complete,
    };

    axios
      .put(`http://127.0.0.1:8000/todo/${id}`, updatedTodo)  // Perform the PUT request
      .then((res) => {
        console.log("Todo updated:", res.data);

        // Optionally update the state or trigger a re-render
      })
      .catch((error) => {
        console.error("Error updating todo:", error);
      });
  };
    return (
        <Form method="PUT">
            <div className="d-flex align-items-center justify-content-center" style={{"height": "100vh", "boxSizing": "border-box" }}>
                <div className="listGroup list-group-item bd-highlight mx-auto">
                    <div className="card">
                    <h1 className="text-white bg-primary mb-1" style={{"maxWidth": "40rem", "borderRadius": "3px"}}>Your Task</h1>
                    <div className="card-body d-flex flex-column align-items-lg-start justify-content-center">
                        <span className="card-text">
                            <input className="mb-2 form-control titleIn" placeholder="Title" value={title}
                                   onChange={handleTitleChange}/>
                            <input className="mb-2 form-control titleIn" placeholder="Description" value={description}
                                   onChange={handleDescriptionChange}/>
                            <div className="input-group mb-3">
                              <div className="input-group-prepend">
                                <label className="input-group-text" htmlFor="inputGroupSelect01">Priority</label>
                              </div>
                              <select className="custom-select" id="inputGroupSelect01" style={{"width": "130px"}}
                                      onChange={handlePriorityChange} value={priority}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                              </select>
                              <select className="custom-select" id="inputGroupSelect02"
                                      style={{"width": "150px", "marginLeft": "10px"}}
                                      onChange={handleCompleteChange} value={complete}>
                                      >
                                <option value="false">No</option>
                                <option value="true">Yes</option>

                              </select>
                              <div className="input-group-append">
                                <label className="input-group-text" htmlFor="inputGroupSelect02">Complete</label>
                              </div>
                            </div>
                            <button className="btn btn-outline-primary mx-2 mb-3" style={{
                                "width": "100px",
                                "fontWeight": "bold"
                            }}
                                    onClick={EditTodoHandler}
                            >
                                Edit
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </Form>
    );
}