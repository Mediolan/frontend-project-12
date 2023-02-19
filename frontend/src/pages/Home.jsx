import React from 'react';
import Button from 'react-bootstrap/Button';
import {
  Link, Outlet,
} from 'react-router-dom';
import { useAuth } from '../context/index.jsx';

const Home = () => {
  const { logOut, user } = useAuth();

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
