import { useSelector, useDispatch } from "react-redux";
import { fetchTasks, deleteTask, fetchEmployees } from "../redux/actions";
import TaskForm from "./TaskForm";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../styles/TaskList.css";

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const employees = useSelector((state) => state.employees.employees);

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchEmployees());
  }, [dispatch]);

  const tasksWithEmployeeNames = tasks.map((task) => {
    const employee = employees.find((emp) => emp.id === task.employeeId);
    return {
      ...task,
      employeeName: employee
        ? `${employee.firstName} ${employee.lastName}`
        : "Nobody",
    };
  });

  tasksWithEmployeeNames.sort((a, b) =>
    a.description.localeCompare(b.description)
  );

  return (
    <div>
      <TaskForm />
      {tasksWithEmployeeNames.length ? (
        tasksWithEmployeeNames.map((task) => (
          <div key={task.id} className="taskSpace">
            <h2 className="header2">
              <NavLink to={`/tasks/${task.id}`}>{task.description}</NavLink>
            </h2>
            <p>
              Priority:
              <span className={`priority-${task.priorityLevel.toLowerCase()}`}>
                {" "}
                {task.priorityLevel}
              </span>
            </p>
            <p>Assigned by: {task.employeeName}</p>
            <p>
              Status: {task.completionStatus ? "Completed" : "Not Completed"}
            </p>
            <button
              className="delete-button"
              onClick={() => dispatch(deleteTask(task.id))}
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p>There are no tasks at the moment</p>
      )}
    </div>
  );
};

export default TaskList;
