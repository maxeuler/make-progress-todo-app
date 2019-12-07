import React from 'react';
import styled from '@emotion/styled';
import TaskList from '../components/taskList';
import AddTaskLink from '../components/addTaskLink';

const HomeLayout = styled.div`
  height: 100%;
`;

const Home = () => (
  <HomeLayout>
    <TaskList></TaskList>
    <AddTaskLink></AddTaskLink>
  </HomeLayout>
);

export default Home;
