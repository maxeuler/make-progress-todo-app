import React from 'react';
import styled from '@emotion/styled';
import { css, Global } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';

const Inner = styled.div`
  margin: 2rem auto;
  width: 90%;
  max-width: 1200px;
`;

const theme = {
  colors: {
    primary: '#ffda79',
    secondary: '#f7f1e3',
  },
};

const Page = ({ children }) => (
  <>
    <Global
      styles={css`
        html,
        body {
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: #333335;
          color: #ffda79;
          box-sizing: border-box;
        }
        *,
        *:before,
        *:after {
          box-sizing: inherit;
        }
      `}
    ></Global>
    <ThemeProvider theme={theme}>
      <Inner>{children}</Inner>
    </ThemeProvider>
  </>
);

export default Page;
