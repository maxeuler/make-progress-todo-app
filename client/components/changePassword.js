import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import AuthForm from './styles/authForm';

const CHANGE_PASSWORD = gql`
  mutation ChangePassword($password: String!) {
    changePassword(password: $password) {
      message
    }
  }
`;

const ChangePassword = () => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const [changePassword, { loading, error }] = useMutation(CHANGE_PASSWORD);

  return (
    <main>
      <h3>Change Your Password</h3>
      {isSuccess && <p>Successfully updated password!</p>}
      <AuthForm
        method="POST"
        onSubmit={async e => {
          e.preventDefault();
          await changePassword({ variables: { password } });
          if (!error) {
            setPassword('');
            setPasswordConfirm('');
            setIsSuccess(true);
          }
        }}
      >
        <fieldset disabled={loading}>
          <label htmlFor="password">
            <input
              type="password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Type new password"
            />
          </label>
          <label htmlFor="confirm">
            <input
              type="password"
              name="confirm"
              value={passwordConfirm}
              onChange={e => setPasswordConfirm(e.target.value)}
              placeholder="Confirm new password"
            />
          </label>
          <button type="submit">Submit</button>
        </fieldset>
      </AuthForm>
    </main>
  );
};

export default ChangePassword;
