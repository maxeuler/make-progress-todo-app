import styled from '@emotion/styled';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.primary};

  .logo {
    display: flex;
    align-items: center;

    a {
      color: ${props => props.theme.colors.primary};
    }
  }

  > * {
    font-size: 1rem;
    padding: 1rem;
  }

  button {
    cursor: pointer;
    color: ${props => props.theme.colors.primary};
    background: none;
    border: none;
    outline: none;

    :hover {
      background: #eee;
    }
  }
`;

export default StyledHeader;
