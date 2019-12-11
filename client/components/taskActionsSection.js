/* eslint-disable no-shadow */
import React from 'react';
import Link from 'next/link';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import Router from 'next/router';
import styled from '@emotion/styled';
import { GET_TASKS } from './taskList';
import { ArrowLeft } from './styles/svgs';

const ActionSection = styled.section`
  display: flex;
  justify-content: space-between;
  margin: 0;

  a {
    text-decoration: none;
    font-size: 2rem;
    font-weight: 900;
    padding: 0.5rem 1rem;

    :hover {
      background: #eee;
    }
  }

  button {
    cursor: pointer;
    background: none;
    border: none;
    outline: none;
    :hover {
      background: #eee;
    }
  }
`;

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
    <ActionSection>
      <Link href="/">
        <a>
          <ArrowLeft></ArrowLeft>
        </a>
      </Link>
      <button
        type="button"
        onClick={async () => {
          await deleteTask({ variables: { id: props.id } });
          Router.push({ pathname: '/' });
        }}
      >
        <svg
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
        >
          <path d="M9 3h6v-1.75c0-.066-.026-.13-.073-.177-.047-.047-.111-.073-.177-.073h-5.5c-.066 0-.13.026-.177.073-.047.047-.073.111-.073.177v1.75zm11 1h-16v18c0 .552.448 1 1 1h14c.552 0 1-.448 1-1v-18zm-10 3.5c0-.276-.224-.5-.5-.5s-.5.224-.5.5v12c0 .276.224.5.5.5s.5-.224.5-.5v-12zm5 0c0-.276-.224-.5-.5-.5s-.5.224-.5.5v12c0 .276.224.5.5.5s.5-.224.5-.5v-12zm8-4.5v1h-2v18c0 1.105-.895 2-2 2h-14c-1.105 0-2-.895-2-2v-18h-2v-1h7v-2c0-.552.448-1 1-1h6c.552 0 1 .448 1 1v2h7z" />
        </svg>
      </button>
    </ActionSection>
  );
};

export default TaskActionsSection;
