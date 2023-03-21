/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import {
  Link, Outlet,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useAuth } from '../context/index.jsx';
import routes from '../routes.js';

const Home = () => {
  const { t } = useTranslation();
  const { logOut, user } = useAuth();
  const { loadingStatus, error } = useSelector((state) => state.loader);

  useEffect(() => {
    if (loadingStatus === 'failed') {
      if (!error.isAxiosError) {
        toast.error(t('toast.unknownErr'));
        return;
      }
      logOut();
      toast.error(t('toast.networkErr'));
    }
  }, [loadingStatus, logOut, error, t]);

  return (
    (
      <>
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <Link className="navbar-brand" to={routes.homePage}>{t('header.hexletChat')}</Link>
            {!!user && <Button type="button" onClick={logOut}>{t('header.logout')}</Button>}
          </div>
        </nav>
        {loadingStatus === 'loading' ? (
          <div className="h-100 d-flex justify-content-center align-items-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">{t('loading')}</span>
            </Spinner>
          </div>
        ) : <Outlet />}
      </>
    )
  );
};

export default Home;
