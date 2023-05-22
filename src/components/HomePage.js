import React from "react";
import { Link } from "react-router-dom";
import "../styles/HomePage.css";

const HomePage = () => {
  return (
    <div className="home-page-container">
      <h1 className="title">Welcome to Employee Management System</h1>
      <Link className="styled-link" to="/employees">
        View Employees
      </Link>
      <Link className="styled-link" to="/tasks">
        View Tasks
      </Link>
    </div>
  );
};

export default HomePage;
