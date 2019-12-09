import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import Router from 'next/router';
import AuthForm from './styles/authForm';

const SIGNIN = gql`
  mutation SignIN($email: String!, $password: String!) {
    signin(input: { email: $email, password: $password }) {
      id
    }
  }
`;

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [signin, { loading, error }] = useMutation(SIGNIN);

  return (
    <AuthForm
      method="POST"
      onSubmit={async e => {
        e.preventDefault();
        if (!email) setEmailError('Please provide an E-Mail address');
        if (!password) setPasswordError('Please provide a password');

        if (email && password) {
          await signin({ variables: { email, password } });
          if (!error) {
            Router.push({ pathname: '/' });
            setEmail('');
            setPassword('');
          }
        }
      }}
    >
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="email">
          E-Mail
          <input
            type="email"
            name="email"
            placeholder="sheev.palpatine@gmail.con"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          {emailError ? <p className="error">{emailError}</p> : null}
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="e.g. iamthesenate12"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {passwordError ? <p className="error">{passwordError}</p> : null}
        </label>
        <button type="submit">{`Sign${loading ? 'ing' : ''} In!`}</button>
      </fieldset>
    </AuthForm>
  );
};

export default Signin;
