import React from 'react';
import Link from 'next/link';
import { List } from './taskList';
import Signout from './signout';

const SettingList = () => (
  <List>
    <Link href="/">
      <a>
        Change password
        <div>&rarr;</div>
      </a>
    </Link>
    <Link href="/">
      <a>
        Other settings
        <div>&rarr;</div>
      </a>
    </Link>
    <Signout></Signout>
  </List>
);

export default SettingList;
