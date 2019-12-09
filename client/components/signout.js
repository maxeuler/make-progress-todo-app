import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Router from 'next/router';

const SIGNOUT = gql`
  mutation SignOut {
    signout {
      message
    }
  }
`;

const SignOut = () => {
  const [signout, { loading, error }] = useMutation(SIGNOUT);

  return (
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
  );
};

export default SignOut;
