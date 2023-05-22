import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchTaskById,
  fetchEmployeeById,
  updateTaskStatus,
  updateTask,
} from "../redux/actions";

const TaskDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const task = useSelector((state) => state.tasks.selectedTask);
  const employee = useSelector((state) => state.employees.selectedEmployee);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    dispatch(fetchTaskById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (task) {
      if (task.employeeId) {
        dispatch(fetchEmployeeById(task.employeeId));
      } else {
        dispatch({ type: "FETCH_EMPLOYEE_BY_ID_SUCCESS", payload: null });
      }
    }
  }, [dispatch, task]);

  useEffect(() => {
    if (task) {
      setStatus(Boolean(task.completionStatus));
    }
  }, [task]);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value === "true";
    setStatus(newStatus);
    if (task) {
      dispatch(updateTaskStatus(task.id, newStatus));
    }
  };

  const handlePriorityChange = (e) => {
    console.log("Task ID: ", task.id);
    if (task) {
      dispatch(updateTask({ ...task, priorityLevel: e.target.value }));
    }
  };

  return task ? (
    <div>
      <h2>Description: {task.description}</h2>
      <p>
        Priority Level:
        <select
          value={task ? task.priorityLevel : ""}
          onChange={handlePriorityChange}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </p>
      <p>
        Assigned Employee:{" "}
        {employee ? employee.firstName + " " + employee.lastName : "Nobody"}
      </p>
      <p>
        Status:
        <select value={status} onChange={handleStatusChange}>
          <option value={false}>Not Completed</option>
          <option value={true}>Completed</option>
        </select>
      </p>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default TaskDetail;
