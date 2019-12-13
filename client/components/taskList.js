import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import styled from '@emotion/styled';
import Link from 'next/link';
import { ArrowRight } from './styles/svgs';

export const List = styled.ul`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 0;

  button {
    border: none;
    cursor: pointer;
    background: none;
  }

  a,
  button {
    text-decoration: none;
    padding: 0.8rem 1rem;
    color: ${props => props.theme.colors.primary};
    font-size: 1rem;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    outline: none;

    :hover {
      background: #eee;
    }
  }
`;

export const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      name
    }
  }
`;

const TaskList = () => {
  const { loading, error, data } = useQuery(GET_TASKS);

  // throw new Error('TODO: cache update für sign out?');

  if (loading) return 'Loading...';
  if (error)
    return (
      <div>
        <p>Error...</p>
      </div>
    );

  return (
    <div>
      <List>
        {data.tasks.map(task => (
          <Link href={`/task?id=${task.id}`} key={task.id}>
            <a>
              {task.name}
              <ArrowRight></ArrowRight>
            </a>
          </Link>
        ))}
      </List>
    </div>
  );
};

export default TaskList;
