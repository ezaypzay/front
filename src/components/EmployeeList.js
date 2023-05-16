import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchEmployees, deleteEmployee } from '../redux/actions';
import EmployeeForm from './EmployeeForm';

const EmployeeList = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => {
    return state.employees.employees
  });
  
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  return (
    <div>
      <EmployeeForm />
      {employees.length ? (
        employees.map((employee) => (
          <div key={employee.id}>
            <NavLink to={`/employees/${employee.id}`}>
              <h2>{employee.firstName} {employee.lastName}</h2>
            </NavLink>
            <p>{employee.department}</p>
            <button onClick={() => dispatch(deleteEmployee(employee.id))}>
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