import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/index.jsx';
import routes from '../routes.js';

const Nav = () => {
  const { t } = useTranslation();
  const { logOut, user } = useAuth();

  return (
    (
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <Link className="navbar-brand" to={routes.homePage}>{t('header.hexletChat')}</Link>
          {!!user && <Button type="button" onClick={logOut}>{t('header.logout')}</Button>}
        </div>
      </nav>
    )
  );
};

export default Nav;
