import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/actions';

const TaskForm = () => {
  const [description, setDescription] = useState('');
  const [priorityLevel, setPriorityLevel] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      description,
      priorityLevel,
      employeeId: null,
    };

    dispatch(addTask(newTask));

    setDescription('');
    setPriorityLevel('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>

      <label>
        Priority Level:
        <select value={priorityLevel} onChange={(e) => setPriorityLevel(e.target.value)}>
          <option value="">Select priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </label>

      <input type="submit" value="Add Task" />
    </form>
  );
};

export default TaskForm;