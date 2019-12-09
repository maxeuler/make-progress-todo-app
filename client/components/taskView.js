import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Router from 'next/router';
import { TaskViewStyle, CompleteMessage } from './styles/task';
import AddUnitForm from './addUnitForm';

const GET_TASK = gql`
  query GetTask($id: ID!) {
    task(id: $id) {
      id
      name
      unit
      unitCount
      doneUnitCount
    }
  }
`;

const ADD_UNITS = gql`
  mutation AddUnits($units: Int!, $task: ID!) {
    addUnits(input: { units: $units, task: $task }) {
      id
    }
  }
`;

const TaskView = props => {
  const [newUnits, setNewUnits] = useState(1);
  const [progress, setProgress] = useState(-1);

  const { loading, error: queryError, data } = useQuery(GET_TASK, {
    variables: { id: props.id },
  });
  const [addUnits, { loading: mutationLoading, error }] = useMutation(
    ADD_UNITS
  );

  if (loading) return <p>Loading...</p>;
  // return if something is wrong with the url
  if (!data) return Router.push('/');

  const { task } = data;
  if (progress == -1) setProgress(task.doneUnitCount);

  const changeValue = units => setNewUnits(units);
  const onSubmit = async () => {
    setProgress(prevState => prevState + newUnits);
    // update range to start value 1
    setNewUnits(1);
    const res = await addUnits({
      variables: { units: newUnits, task: task.id },
    });
  };

  return (
    <TaskViewStyle>
      <h2>{task.name}</h2>
      <div className="progress">
        <div className="status">{task.unit}</div>
        <div className="bar">
          <div
            className="filled-bar"
            style={{ width: `${(progress / task.unitCount) * 100}%` }}
          ></div>
        </div>
        <div className="units">
          <p>{progress}</p>
          <p>{task.unitCount}</p>
        </div>
      </div>
      {task.unitCount - progress > 0 ? (
        <AddUnitForm
          max={task.unitCount - progress}
          onChange={changeValue}
          value={newUnits}
          disabled={mutationLoading}
          submit={onSubmit}
        ></AddUnitForm>
      ) : (
        <CompleteMessage>
          <p>Completed 💯</p>
        </CompleteMessage>
      )}
    </TaskViewStyle>
  );
};

export default TaskView;
