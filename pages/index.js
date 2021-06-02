import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'

const App = () => {

  const router = useRouter();
  const isLoggedIn = false;

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/home');
    } else {
      router.push('/auth/login');
    }
  }, []);

  return null;
};

export default App;
