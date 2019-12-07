import styled from '@emotion/styled';

const StyledHeader = styled.header`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 1rem 2rem;
  border-bottom: 1px solid ${props => props.theme.colors.primary};

  .logo {
    display: flex;
    align-items: center;
    a {
      color: ${props => props.theme.colors.primary};
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

    > a,
    button {
      width: 100%;
      padding: 1rem;
      text-align: center;
      cursor: pointer;
      font-size: 1.2rem;
      color: ${props => props.theme.colors.primary};
      :hover {
        background: #eee;
      }
    }

    > button {
      background: none;
      border: none;
    }
  }
`;

export default StyledHeader;
