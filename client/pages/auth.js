import React, { useState } from 'react';
import styled from '@emotion/styled';
import Signup from '../components/signup';
import Signin from '../components/signin';

const AuthView = styled.div`
  display: flex;
  flex-direction: column;
  > button {
    border: none;
    background: none;
    font-size: 1rem;
    align-self: flex-end;
    cursor: pointer;
    outline: none;
    padding: 0.9rem 1.8rem;

    :hover {
      background: #eee;
    }
  }
`;

const Auth = () => {
  const [hasAccount, setHasAccount] = useState(true);
  return (
    <AuthView>
      <button
        type="button"
        onClick={() => setHasAccount(prevState => !prevState)}
      >
        {hasAccount ? 'No Account? Sign Up!' : 'Already on board? Sign In!'}
      </button>
      {hasAccount ? <Signin></Signin> : <Signup></Signup>}{' '}
    </AuthView>
  );
};

export default Auth;
