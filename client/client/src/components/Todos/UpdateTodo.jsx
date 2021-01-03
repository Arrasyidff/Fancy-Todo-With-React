import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const EditTodo = () => {
  let history = useHistory();
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    status: "",
    due_date: "",
  });

  const { title, description, status, due_date } = todo;

  const onInputChange = (e) => {
    // console.log(e.target.name);
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(id, 'ini todo')
    axios({
      url: "http://localhost:4000/todos/" + id,
      method: "PUT",
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
      data: {
        title: todo.title,
        description: todo.description,
        status: todo.status,
        due_date: todo.due_date,
      },
    })
      .then((response) => {
        console.log(response.data);
        history.push("/");
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Success Creating",
        });
      })
      .catch((err) => {
        console.log(err.response.data);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.msg,
        });
      });
  };

  const { id } = useParams();

  const getDataById = () => {
    axios({
      url: "http://localhost:4000/todos/" + id,
      method: "GET",
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        setTodo(response.data);
        // console.log(response.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDataById();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1>Update Todo</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <input
            type="text"
            className="form-control"
            id="status"
            name="status"
            placeholder="Enter Status"
            value={status}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="due_date">Due Date</label>
          <input
            type="date"
            className="form-control"
            id="due_date"
            name="due_date"
            placeholder="Enter Due Date"
            value={due_date}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditTodo;
