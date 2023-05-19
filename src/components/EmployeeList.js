import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchEmployees, deleteEmployee } from '../redux/actions';
import EmployeeForm from './EmployeeForm';
import '../styles/EmployeeList.css';

const EmployeeList = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => {
    return state.employees.employees
  });
  
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  return (
    <div className = "el">
      <EmployeeForm />
      {employees.length ? (
        employees.map((employee) => (
          <div key={employee.id} className = "taskSpace">
            <h2 className='header2'><NavLink to={`/employees/${employee.id}`}>{employee.firstName} {employee.lastName}</NavLink></h2>
            <p>{employee.department}</p>
            <button className = "delete-button" onClick={() => dispatch(deleteEmployee(employee.id))}>
              Delete
            </button>
          </div>
        ))
      ) : (
        <p>There are no employees registered yet</p>
      )}
    </div>
  );
};

export default EmployeeList;