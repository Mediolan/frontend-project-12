import React from 'react';
import { useTranslation } from 'react-i18next';
import routes from '../routes.js';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center" id="error-page">
      <img alt={t('notFound.title')} className="img-fluid h-25" src="https://cdn2.hexlet.io/assets/error-pages/404-4b6ef16aba4c494d8101c104236304e640683fa9abdb3dd7a46cab7ad05d46e9.svg" />
      <h1 className="h4 text-muted">
        {t('notFound.title')}
      </h1>
      {t('notFound.message')}
      <a href={routes.homePage}>{t('notFound.link')}</a>
    </div>
  );
};

export default NotFoundPage;
