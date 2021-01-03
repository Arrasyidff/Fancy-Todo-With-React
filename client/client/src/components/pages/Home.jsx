import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Home = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    axios({
      url: "http://localhost:4000/todos",
      method: "GET",
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        setTodos(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const deleteTodo = (id) => {
    // console.log("hallo", id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios({
          url: "http://localhost:4000/todos/" + id,
          method: "DELETE",
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        })
          .then((response) => {
            // console.log(response.data);
            Swal.fire({
              icon: "success",
              title: "Success",
              text: response.data.msg,
            });
          })
          .catch((err) => {
            // console.log(err);
          })
          .finally(() => {
            getData();
          });
      }
    });
  };

  return (
    <div className="container">
      <div className="py-4">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">status</th>
              <th scope="col">Due Date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, index) => (
              <tr key={todo.id}>
                <th scope="row">{index + 1}</th>
                <td>{todo.title}</td>
                <td>{todo.description}</td>
                <td>{todo.status}</td>
                <td>{todo.due_date}</td>
                <td>
                  <Link
                    className="btn btn-primary"
                    to={`/update/todo/${todo.id}`}
                  >
                    Update
                  </Link>
                  <button
                    className="btn btn-danger ml-2"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
