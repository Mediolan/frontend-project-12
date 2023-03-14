import React from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import {
  Link, Outlet,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAuth } from '../context/index.jsx';

const Home = () => {
  const { t } = useTranslation();
  const { logOut, user } = useAuth();
  const { loadingStatus } = useSelector((state) => state.loader);
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
      {loadingStatus === 'loading'
        ? (
          <div className="h-100 d-flex justify-content-center align-items-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">{t('loading')}</span>
            </Spinner>
          </div>
        ) : <Outlet />}
    </>
  );
};

export default Home;
