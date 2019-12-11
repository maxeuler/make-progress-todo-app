/* eslint-disable no-shadow */
import React from 'react';
import Link from 'next/link';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import Router from 'next/router';
import { GET_TASKS } from './taskList';

const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id) {
      id
      name
    }
  }
`;

const TaskActionsSection = props => {
  const [deleteTask, { loading, error }] = useMutation(DELETE_TASK, {
    update(cache) {
      const { tasks } = cache.readQuery({ query: GET_TASKS });
      cache.writeQuery({
        query: GET_TASKS,
        data: { tasks: [...tasks.filter(task => task.id != props.id)] },
      });
    },
  });

  return (
    <section>
      <Link href="/">
        <a>&larr;</a>
      </Link>
      <button
        type="button"
        onClick={async () => {
          await deleteTask({ variables: { id: props.id } });
          Router.push({ pathname: '/' });
        }}
      >
        Delete
      </button>
    </section>
  );
};

export default TaskActionsSection;
