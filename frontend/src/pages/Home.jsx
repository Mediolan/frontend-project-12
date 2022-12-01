/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { redirect } from 'react-router-dom';

// eslint-disable-next-line consistent-return
export const loader = () => {
  const token = localStorage.getItem('token');
  if (token === null) {
    return redirect('login');
  }
};
const Home = () => <div>Hello, World!</div>;

export default Home;
