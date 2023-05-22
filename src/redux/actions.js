import api from "../services/api";

export const fetchEmployees = () => {
  return (dispatch) => {
    api
      .get("/employees")
      .then((response) => {
        dispatch({ type: "FETCH_EMPLOYEES_SUCCESS", payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: "FETCH_EMPLOYEES_ERROR", error });
      });
  };
};

export const deleteEmployee = (id) => async (dispatch) => {
  try {
    await api.delete(`/employees/${id}`);
    dispatch({ type: "DELETE_EMPLOYEE_SUCCESS", payload: id });
  } catch (error) {
    dispatch({ type: "DELETE_EMPLOYEE_ERROR", error });
  }
};

export const addEmployee = (employee) => async (dispatch) => {
  try {
    const response = await api.post("/employees", employee);
    dispatch({
      type: "ADD_EMPLOYEE_SUCCESS",
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: "ADD_EMPLOYEE_ERROR",
      error: error.message,
    });
  }
};

export const fetchEmployeeById = (id) => {
  return (dispatch) => {
    api
      .get(`/employees/${id}`)
      .then((response) => {
        dispatch({
          type: "FETCH_EMPLOYEE_BY_ID_SUCCESS",
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({ type: "FETCH_EMPLOYEE_BY_ID_ERROR", error });
      });
  };
};

export const addTask = (task) => async (dispatch) => {
  try {
    const response = await api.post("/tasks", task);
    dispatch({
      type: "ADD_TASK_SUCCESS",
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: "ADD_TASK_ERROR",
      error: error.message,
    });
  }
};

export const deleteTask = (id) => async (dispatch) => {
  try {
    await api.delete(`/tasks/${id}`);
    dispatch({ type: "DELETE_TASK_SUCCESS", payload: id });
  } catch (error) {
    dispatch({ type: "DELETE_TASK_ERROR", error });
  }
};

export const fetchTasks = () => async (dispatch) => {
  try {
    const res = await fetch("http://localhost:3001/tasks");
    const data = await res.json();
    dispatch({ type: "FETCH_TASKS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "FETCH_TASKS_ERROR", error });
  }
};

export const updateTask = (task) => async (dispatch) => {
  try {
    const response = await api.put(`/tasks/${task.id}`, task);
    dispatch({
      type: "UPDATE_TASK_SUCCESS",
      payload: response.data,
    });
    dispatch({
      type: "FETCH_TASK_BY_ID_SUCCESS",
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: "UPDATE_TASK_ERROR",
      error: error.message,
    });
  }
};
export const assignTaskToEmployee = (task, employee) => async (dispatch) => {
  try {
    const response = await api.put(`/tasks/${task.id}`, {
      ...task,
      employeeId: employee.id,
    });

    dispatch({
      type: "ASSIGN_TASK_SUCCESS",
      payload: response.data,
    });

    const res = await fetch("http://localhost:3001/tasks");
    const data = await res.json();
    dispatch({ type: "FETCH_TASKS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "ASSIGN_TASK_ERROR",
      error: error.message,
    });
  }
};

export const fetchTasksByEmployeeId = (employeeId) => async (dispatch) => {
  try {
    const response = await api.get(`/tasks?employeeId=${employeeId}`);
    dispatch({
      type: "FETCH_TASKS_BY_EMPLOYEE_ID_SUCCESS",
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: "FETCH_TASKS_BY_EMPLOYEE_ID_ERROR", error });
  }
};

export const fetchTaskById = (id) => {
  return (dispatch) => {
    api
      .get(`/tasks/${id}`)
      .then((response) => {
        dispatch({ type: "FETCH_TASK_BY_ID_SUCCESS", payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: "FETCH_TASK_BY_ID_ERROR", error });
      });
  };
};

export const updateTaskStatus = (taskId, completionStatus) => {
  return async (dispatch) => {
    try {
      const response = await api.put(`/tasks/${taskId}`, { completionStatus });
      dispatch({ type: "UPDATE_TASK_STATUS_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "UPDATE_TASK_STATUS_ERROR", error });
    }
  };
};
