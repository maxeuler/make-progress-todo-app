import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import styled from '@emotion/styled';
import Link from 'next/link';

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;

  a {
    text-decoration: none;
    padding: 0.8rem 1rem;
    color: ${props => props.theme.colors.primary};
    font-size: 1rem;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;

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
              <div>&rarr;</div>
            </a>
          </Link>
        ))}
      </List>
    </div>
  );
};

export default TaskList;
