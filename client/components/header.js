/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Router from 'next/router';
import Hamburger from './styles/hamburger';
import StyledHeader from './styles/header';

const SIGNOUT = gql`
  mutation SignOut {
    signout {
      message
    }
  }
`;

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [signout, { data, loading, error }] = useMutation(SIGNOUT);

  return (
    <StyledHeader>
      <div className="logo">
        <a href="">Logo</a>
      </div>
      <nav className={isNavOpen ? 'open' : null}>
        <a>Profile</a>
        <a>Settings</a>
        <button
          type="button"
          disabled={loading}
          onClick={async () => {
            setIsNavOpen(!isNavOpen);
            await signout();
            if (!error) {
              Router.push({ pathname: '/auth' });
            }
          }}
        >
          Sign Out
        </button>
      </nav>
      <Hamburger>
        <input
          type="checkbox"
          id="hamburg"
          onChange={() => setIsNavOpen(!isNavOpen)}
          checked={isNavOpen}
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
