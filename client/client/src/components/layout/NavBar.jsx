import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";

const NavBar = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const logout = () => {
    localStorage.clear();
    history.push("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" exact="true" to="/">
            Navbar
          </Link>
          {pathname === "/" && (
            <div>
              <Link
                className="btn btn-outline-primary"
                exact="true"
                to="/add/todo"
              >
                Add Todo
              </Link>
              <button
                type="button"
                className="btn btn-danger ml-2"
                onClick={() => logout()}
              >
                Logout
              </button>
            </div>
          )}
        </nav>
      </div>
    </nav>
  );
};

export default NavBar;
