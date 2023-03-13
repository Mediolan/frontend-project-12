import React from 'react';
import Button from 'react-bootstrap/Button';
import {
  Link, Outlet,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/index.jsx';

const Home = () => {
  const { t } = useTranslation();
  const { logOut, user } = useAuth();
  const makeError = () => {
    throw new Error();
  };

  return (
    <>
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <Link className="navbar-brand" to="/">{t('header.hexletChat')}</Link>
          <Button type="button" onClick={makeError}>Ошибка</Button>
          {!!user && <Button type="button" onClick={logOut}>{t('header.logout')}</Button>}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Home;
