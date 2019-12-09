/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Router from 'next/router';
import Link from 'next/link';
import StyledHeader from './styles/header';

const SIGNOUT = gql`
  mutation SignOut {
    signout {
      message
    }
  }
`;

const Header = () => {
  const [signout, { loading, error }] = useMutation(SIGNOUT);

  return (
    <StyledHeader>
      <Link href="/">
        <a>Logo</a>
      </Link>
      <button
        type="button"
        disabled={loading}
        onClick={async () => {
          await signout();
          if (!error) {
            Router.push({ pathname: '/auth' });
          }
        }}
      >
        Sign Out
      </button>
    </StyledHeader>
  );
};

export default Header;
