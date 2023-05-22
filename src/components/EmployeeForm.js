import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addEmployee } from "../redux/actions";
import "../styles/Form.css";

const EmployeeForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [department, setDepartment] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const employeeData = {
      firstName: firstName,
      lastName: lastName,
      department: department,
    };

    dispatch(addEmployee(employeeData));

    setFirstName("");
    setLastName("");
    setDepartment("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="formSpace">
        First Name:
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>
      <label className="formSpace">
        Last Name:
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </label>
      <label className="formSpace">
        Department:
        <input
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
      </label>
      <button type="submit" className="add-button">
        Add Employee
      </button>
    </form>
  );
};

export default EmployeeForm;
