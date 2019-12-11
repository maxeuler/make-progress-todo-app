import React, { useState } from 'react';
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
      __typename
    }
  }
`;

const ADD_UNITS = gql`
  mutation AddUnits($units: Int!, $task: ID!) {
    addUnits(input: { units: $units, task: $task }) {
      id
      name
      unit
      unitCount
      doneUnitCount
      __typename
    }
  }
`;

const TaskView = props => {
  const [newUnits, setNewUnits] = useState(1);

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

  const changeValue = units => setNewUnits(units);
  const onSubmit = async () => {
    // update range to start value 1
    setNewUnits(1);
    await addUnits({
      variables: { units: newUnits, task: task.id },
      optimisticResponse: {
        __typename: 'Mutation',
        addUnits: {
          id: task.id,
          name: task.name,
          unit: task.unit,
          unitCount: task.unitCount,
          doneUnitCount: task.doneUnitCount + newUnits,
          __typename: 'Task',
        },
      },
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
            style={{ width: `${(task.doneUnitCount / task.unitCount) * 100}%` }}
          ></div>
        </div>
        <div className="units">
          <p>{task.doneUnitCount}</p>
          <p>{task.unitCount}</p>
        </div>
      </div>
      {task.unitCount - task.doneUnitCount > 0 ? (
        <AddUnitForm
          max={task.unitCount - task.doneUnitCount}
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
