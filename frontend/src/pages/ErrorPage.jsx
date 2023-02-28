import React from 'react';
import { useRouteError } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ErrorPage = () => {
  const { t } = useTranslation();
  const error = useRouteError();
  const errorMessage = error.statusText ? (
    <>
      {t('notFound.message')}
      <a href="/">{t('notFound.linkText')}</a>
    </>
  ) : <i>{error.message}</i>;

  return (
    <div className="text-center" id="error-page">
      <h1 className="h4 text-muted">
        {t('notFound.title')}
      </h1>
      {errorMessage}
    </div>
  );
};

export default ErrorPage;
