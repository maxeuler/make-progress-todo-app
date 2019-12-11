import React from 'react';
import Link from 'next/link';
import { List } from './taskList';
import Signout from './signout';
import { ArrowRight } from './styles/svgs';

const SettingList = () => (
  <List>
    <Link href="/">
      <a>
        Change password
        <ArrowRight></ArrowRight>
      </a>
    </Link>
    <Signout>
      <ArrowRight></ArrowRight>
    </Signout>
  </List>
);

export default SettingList;
