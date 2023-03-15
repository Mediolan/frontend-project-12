import React, { useEffect } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import {
  Link, Outlet,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useAuth } from '../context/index.jsx';

const Home = () => {
  const { t } = useTranslation();
  const { logOut, user } = useAuth();
  const { loadingStatus, error } = useSelector((state) => state.loader);

  useEffect(() => {
    if (loadingStatus === 'failed') {
      logOut();
      if (!error.isAxiosError) {
        toast.error(t('toast.unknownErr'));
      }
      toast.error(t('toast.networkErr'));
    }
  }, [loadingStatus, logOut, error, t]);

  return (loadingStatus === 'loading'
    ? (
      <div className="h-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">{t('loading')}</span>
        </Spinner>
      </div>
    )
    : (
      <>
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <Link className="navbar-brand" to="/">{t('header.hexletChat')}</Link>
            {!!user && <Button type="button" onClick={logOut}>{t('header.logout')}</Button>}
          </div>
        </nav>
        <Outlet />
      </>
    )
  );
};

export default Home;
