import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"

const Login = () => {
  const history = useHistory();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const onInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let { email, password } = data;
    if (!email) {
      console.log("email cant be empty");
    } else if (!password) {
      console.log("password cant be empty");
    } else {
      axios({
        url: "http://localhost:4000/login",
        method: "POST",
        data: {
          email,
          password,
        },
      })
        .then((response) => {
          console.log(response.data);
          localStorage.setItem("access_token", response.data.access_token);
          history.push("/");
        })
        .catch((err) => {
        //   console.log(err.response.data.msg);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.response.data.msg,
          });
        })
        .finally(() => {
          //   setData({ email: "", password: "" });
          email = "";
          password = "";
        });
    }
  };

  const { email, password } = data;
  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            name="email"
            value={email}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link className="btn btn-warning ml-2" to={`/register`}>
          Register
        </Link>
      </form>
    </div>
  );
};

export default Login;
