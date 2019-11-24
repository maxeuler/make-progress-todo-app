/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import styled from '@emotion/styled';
import Hamburger from './styles/hamburger';

const StyledHeader = styled.header`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 1rem 2rem;
  border-bottom: 1px solid ${props => props.theme.colors.primary};

  .logo {
    display: flex;
    align-items: center;
    a {
      color: #fff;
    }
  }

  nav {
    grid-column: 1/3;
    grid-row: 2/2;
    height: auto;
    max-height: 0;
    overflow: hidden;
    transition: all 0.5s;
    display: flex;
    flex-direction: column;
    align-items: center;

    &.open {
      height: auto;
      max-height: 100vh;
    }

    li {
      list-style: none;
    }

    > a {
      padding: 1rem;
    }
  }
`;

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <StyledHeader>
      <div className="logo">
        <a href="">Logo</a>
      </div>
      <nav className={isNavOpen ? 'open' : null}>
        <a>Profile</a>
        <a>Settings</a>
      </nav>
      <Hamburger>
        <input
          type="checkbox"
          id="hamburg"
          onChange={() => setIsNavOpen(!isNavOpen)}
        />
        <label htmlFor="hamburg" className="hamburg">
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </label>
      </Hamburger>
    </StyledHeader>
  );
};

export default Header;
