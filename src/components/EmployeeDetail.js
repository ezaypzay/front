import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchEmployeeById, fetchTasks, assignTaskToEmployee, fetchTasksByEmployeeId } from '../redux/actions';
import '../styles/EmployeeDetail.css';

const EmployeeDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const employee = useSelector((state) => state.employees.selectedEmployee);
  const tasks = useSelector((state) => state.tasks.tasks);

  const unassignedTasks = tasks ? tasks.filter((task) => task && task.employeeId === null) : [];
  const assignedTasks = tasks && employee ? tasks.filter((task) => task.employeeId === employee.id) : [];

  useEffect(() => {
    dispatch(fetchEmployeeById(id));
    dispatch(fetchTasks());
    dispatch(fetchTasksByEmployeeId(id));
  }, [dispatch, id]);

  const handleAssignTask = (taskId) => {
    const taskToAssign = tasks.find((task) => task.id === taskId);
    if (taskToAssign && employee) {
      dispatch(assignTaskToEmployee(taskToAssign, employee));
    }
  };

  return (
    <div className = "ed">
      {employee ? (
        <>
          <h2>{employee.firstName} {employee.lastName}</h2>
          <p>{employee.department}</p>

          <h2 className = "header">Assigned Tasks:</h2>
          {assignedTasks.map((task) => (
            <div key={task.id} className = "taskSpace">
              <p>{task.description}</p>
              <p>Priority: {task.priorityLevel}</p>
            </div>
          ))}

          <h2 className = "header2">Assign a Task:</h2>
          {unassignedTasks.map((task) => (
            <div key={task.id} className = "taskSpace">
              <p>{task.description}</p>
              <p>Priority: {task.priorityLevel}</p>
              <button className = "assign-button" onClick={() => handleAssignTask(task.id)}>Assign Task</button>
            </div>
          ))}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EmployeeDetail;