import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AllEmployees from './components/AllEmployees';
import AllTasks from './components/AllTasks';

function AppRouter() {
  return (
    <Router>
      <Route path="/employees" exact component={AllEmployees} />
      <Route path="/tasks" exact component={AllTasks} />
    </Router>
  );
}

export default AppRouter;