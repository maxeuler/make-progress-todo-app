import styled from '@emotion/styled';

const AuthForm = styled.form`
  margin-top: 2rem;

  fieldset {
    border: none;
    margin: 0;
    padding: 0;
  }

  label {
    display: block;
    margin-bottom: 3rem;
  }

  input {
    width: 100%;
    padding: 0.5rem;
    border: none;
    background: none;
    border-bottom: 2px solid #ccc;
    font-size: 1rem;
    color: ${props => props.theme.colors.secondary};

    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.primary};
    }
  }

  button {
    background: none;
    border: none;
    padding: 0.5rem;
    color: ${props => props.theme.colors.primary};
    cursor: pointer;
    float: right;
    font-size: 1rem;
    font-weight: 700;
    text-align: center;
    width: auto;
    &:focus,
    &:active {
      outline: none;
      border-bottom: 2px solid ${props => props.theme.colors.primary};
    }
  }

  .error {
    margin: 0;
    padding: 0;
    font-size: 0.8rem;
  }
`;

export default AuthForm;
