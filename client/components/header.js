/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Link from 'next/link';
import StyledHeader from './styles/header';
import { Gear } from './styles/svgs';

const Header = () => (
  <StyledHeader>
    <Link href="/">
      <a>Logo</a>
    </Link>
    <Link href="/settings">
      <a>
        <Gear></Gear>
      </a>
    </Link>
  </StyledHeader>
);

export default Header;
