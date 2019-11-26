import React from 'react';
import TaskView from '../components/taskView';

const Task = props => (
  <div>
    <TaskView id={props.query.id}></TaskView>
  </div>
);

export default Task;
