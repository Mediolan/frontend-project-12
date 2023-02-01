/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import Button from 'react-bootstrap/Button';
import {
  // eslint-disable-next-line no-unused-vars
  Link, Outlet, useNavigate,
} from 'react-router-dom';
import { useAuth } from '../context/index.jsx';

const Home = () => {
  // const navigate = useNavigate();
  const { logOut, user } = useAuth();
  // const logout = () => {
  //  localStorage.clear();
  //  navigate('/login');
  // };

  return (
    <>
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <Link className="navbar-brand" to="/">Hexlet Chat</Link>
          {!!user && <Button type="button" onClick={logOut}>Выход</Button>}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Home;
