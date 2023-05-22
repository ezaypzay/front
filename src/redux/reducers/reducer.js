import { combineReducers } from "redux";

const initialEmployeeState = {
  employees: [],
  selectedEmployee: null,
};

const initialTaskState = {
  tasks: [],
};

export const employeeReducer = (state = initialEmployeeState, action) => {
  switch (action.type) {
    case "FETCH_EMPLOYEES_SUCCESS":
      return { ...state, employees: action.payload };
    case "FETCH_EMPLOYEES_ERROR":
      return state;
    case "DELETE_EMPLOYEE_SUCCESS":
      return {
        ...state,
        employees: state.employees.filter(
          (employee) => employee.id !== action.payload
        ),
      };
    case "DELETE_EMPLOYEE_ERROR":
      return state;
    case "ADD_EMPLOYEE_SUCCESS":
      return { ...state, employees: [...state.employees, action.payload] };
    case "ADD_EMPLOYEE_ERROR":
      return state;
    case "FETCH_EMPLOYEE_BY_ID_SUCCESS":
      return { ...state, selectedEmployee: action.payload };
    case "FETCH_EMPLOYEE_BY_ID_ERROR":
      return state;
    default:
      return state;
  }
};

export const taskReducer = (state = initialTaskState, action) => {
  switch (action.type) {
    case "FETCH_TASKS_SUCCESS":
      return { ...state, tasks: action.payload };
    case "FETCH_TASKS_ERROR":
      return state;
    case "DELETE_TASK_SUCCESS":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "DELETE_TASK_ERROR":
      return state;
    case "ADD_TASK_SUCCESS":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "ADD_TASK_ERROR":
      return state;
    case "UPDATE_TASK_SUCCESS": {
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    }
    case "UPDATE_TASK_ERROR":
      return state;
    default:
      return state;
    case "FETCH_TASK_BY_ID_SUCCESS":
      return {
        ...state,
        selectedTask: action.payload,
      };
    case "UPDATE_TASK_STATUS_SUCCESS":
      if (state.selectedTask && state.selectedTask.id === action.payload.id) {
        return { ...state, selectedTask: action.payload };
      }
      return state;

    case "UPDATE_TASK_STATUS_ERROR":
      console.error(action.error);
      return state;
  }
};

const rootReducer = combineReducers({
  employees: employeeReducer,
  tasks: taskReducer,
});

export default rootReducer;
