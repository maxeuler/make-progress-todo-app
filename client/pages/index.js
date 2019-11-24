import React from 'react';
import styled from '@emotion/styled';
import AddTaskLink from '../components/addTaskLink';

const HomeLayout = styled.div`
  background: green;
  height: 100%;
`;

const Home = () => (
  <HomeLayout>
    <h3>Hello</h3>
    <AddTaskLink></AddTaskLink>
  </HomeLayout>
);

export default Home;
