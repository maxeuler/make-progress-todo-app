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
      color: #fff;
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
      padding: 1rem;
    }
  }
`;

export default StyledHeader;
