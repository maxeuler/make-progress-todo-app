import React from 'react';

const TaskView = props => {
  const a = 5;

  return (
    <div>
      <h3>Task Title</h3>
      <p>{props.id}</p>
    </div>
  );
};

export default TaskView;
