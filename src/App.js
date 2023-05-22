import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import HomePage from "./components/HomePage";
import EmployeeList from "./components/EmployeeList";
import EmployeeDetail from "./components/EmployeeDetail";
import TaskList from "./components/TaskList";
import TaskDetail from "./components/TaskDetail";

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <NavLink to="/" end>
            Home
          </NavLink>{" "}
          | <NavLink to="/employees">Employee List</NavLink> |{" "}
          <NavLink to="/tasks">Task List</NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/employees/:id" element={<EmployeeDetail />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/tasks/:id" element={<TaskDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
