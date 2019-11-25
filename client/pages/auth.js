import React, { useState } from 'react';
import Signup from '../components/signup';
import Signin from '../components/signin';

const Auth = () => {
  const [hasAccount, setHasAccount] = useState(true);
  return <div>{hasAccount ? <Signin></Signin> : <Signup></Signup>}</div>;
};

export default Auth;
