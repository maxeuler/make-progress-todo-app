/* eslint-disable no-shadow */
import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import Router from 'next/router';
import AuthForm from './styles/authForm';
import { GET_TASKS } from './taskList';

const ADD_TASK = gql`
  mutation AddTask($name: String!, $unit: String!, $unitCount: String!) {
    addTask(input: { name: $name, unit: $unit, unitCount: $unitCount }) {
      id
      name
    }
  }
`;

const AddTask = () => {
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [unitCount, setUnitCount] = useState(0);

  const [addTask, { loading, error }] = useMutation(ADD_TASK, {
    update(
      cache,
      {
        data: { addTask },
      }
    ) {
      const { tasks } = cache.readQuery({ query: GET_TASKS });
      cache.writeQuery({
        query: GET_TASKS,
        data: { tasks: [...tasks, addTask] },
      });
    },
  });

  return (
    <AuthForm
      method="POST"
      onSubmit={async e => {
        e.preventDefault();
        const { data } = await addTask({
          variables: { name, unit, unitCount },
        });
        Router.push({
          pathname: '/task',
          query: { id: data.addTask.id },
        });
        setName('');
        setUnit('');
        setUnitCount(0);
      }}
    >
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </label>
        <label htmlFor="unit">
          Unit
          <input
            type="text"
            name="unit"
            value={unit}
            onChange={e => setUnit(e.target.value)}
          />
        </label>
        <label htmlFor="count">
          Unit count
          <input
            type="number"
            name="count"
            value={unitCount}
            onChange={e => setUnitCount(e.target.value)}
          />
        </label>
        <button type="submit">Add</button>
      </fieldset>
    </AuthForm>
  );
};

export default AddTask;
