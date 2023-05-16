import { employeeReducer, taskReducer } from './reducer';

const rootReducer = {
  employees: employeeReducer,
  tasks: taskReducer
};

export default rootReducer;