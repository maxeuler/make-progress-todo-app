import React from 'react';
import styled from '@emotion/styled';
import { css, Global } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import Header from './header';

const Inner = styled.div`
  margin: 2rem auto;
  width: 90%;
  max-width: 900px;
`;

const theme = {
  colors: {
    primary: '#20123A',
    secondary: 'ree',
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
          background: #fff;
          color: #20123a;
          box-sizing: border-box;
        }
        *,
        *:before,
        *:after {
          box-sizing: inherit;
          -webkit-tap-highlight-color: transparent;
        }
      `}
    ></Global>
    <ThemeProvider theme={theme}>
      <Header></Header>
      <Inner>{children}</Inner>
    </ThemeProvider>
  </>
);

export default Page;
