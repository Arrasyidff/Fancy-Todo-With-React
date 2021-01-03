import "./App.css";
import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Home from "./components/pages/Home";
import PageNotFound from "./components/pages/PageNotFound";
import NavBar from "./components/layout/NavBar";
import AddTodo from "./components/Todos/AddTodo";
import UpdateTodo from "./components/Todos/UpdateTodo";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register"
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        {/* {!authenticate ? history.push("/login") : history.push("/")} */}
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/" component={Home} />
          <Route exact path="/add/todo" component={AddTodo} />
          <Route exact path="/update/todo/:id" component={UpdateTodo} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
