import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';

const StyledLink = styled.a`
  position: absolute;
  left: 0;
  bottom: 0;
  cursor: pointer;
  width: 100vw;
  /* border-top: 1px solid ${props => props.theme.colors.primary}; */
  background: ${props => props.theme.colors.primary};
  color: #fff;
  padding: 1rem;
  text-align: center;
`;

const AddTaskLink = () => (
  <Link href="/add-task">
    <StyledLink>Add Task</StyledLink>
  </Link>
);

export default AddTaskLink;
