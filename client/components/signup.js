import React, { useState } from 'react';
import Router from 'next/router';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import AuthForm from './styles/authForm';

const ADD_USER = gql`
  mutation AddUser($email: String!, $password: String!) {
    addUser(input: { email: $email, password: $password }) {
      id
    }
  }
`;

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');

  const [addUser, { loading, error }] = useMutation(ADD_USER);

  return (
    <AuthForm
      method="POST"
      onSubmit={async e => {
        e.preventDefault();
        if (!email) setEmailError('Please provide an E-Mail address');
        if (!password) setPasswordError('Please provide a password');
        if (password != confirmPassword)
          setConfirmError(`Passwords don't match`);

        if (email && password && password == confirmPassword) {
          const user = await addUser({ variables: { email, password } });
          if (!error) {
            Router.push({ pathname: '/' });
            setEmail('');
            setPassword('');
            setConfirmPassword('');
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
        <label htmlFor="confirm">
          Confirm Password
          <input
            type="password"
            name="confirm"
            placeholder="should be your password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
          {confirmError ? <p className="error">{confirmError}</p> : null}
        </label>
        <button type="submit">{`Sign${loading ? 'ing' : ''} Up!`}</button>
      </fieldset>
    </AuthForm>
  );
};

export default Signup;
