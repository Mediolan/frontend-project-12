import React, { useRef } from 'react';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/index.jsx';
import { registrationFormValidation } from '../schemas/validations.js';
import routes from '../routes.js';

const SingUp = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { logIn } = useAuth();
  const inputRef = useRef();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registrationFormValidation,
    onSubmit: async (values, actions) => {
      try {
        const res = await axios.post(
          routes.signup,
          { username: values.username, password: values.password },
        );
        logIn(res.data);
        navigate(routes.homePage);
      } catch (error) {
        if (!error.isAxiosError) {
          throw error;
        }
        if (error.response.status === 409) {
          actions.setFieldError('registration', 'reg');
          inputRef.current.select();
          return;
        }
        throw error;
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img
                  src="./registration.jpg"
                  className="rounded-circle"
                  alt={t('signup.title')}
                />
              </div>
              <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('signup.title')}</h1>
                <Form.Group className="form-floating mb-4" controlId="username">
                  <FloatingLabel className={formik.values.username && 'filled'} label={t('signup.username')} controlId="username">
                    <Form.Control
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="username"
                      autoComplete="username"
                      placeholder={t('signup.username')}
                      ref={inputRef}
                      required
                      autoFocus
                      isInvalid={
                        (formik.errors.username && formik.touched.username)
                      || formik.errors.registration
                      }
                      value={formik.values.username}
                    />
                    <Form.Control.Feedback type="invalid" tooltip placement="right">
                      {t(formik.errors.username)}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="form-floating mb-4" controlId="password">
                  <FloatingLabel className={formik.values.password && 'filled'} label={t('signup.password')} controlId="password">
                    <Form.Control
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="password"
                      autoComplete="new-password"
                      placeholder={t('signup.password')}
                      required
                      type="password"
                      isInvalid={
                        (formik.errors.password && formik.touched.password)
                      || formik.errors.registration
                      }
                      value={formik.values.password}
                    />
                    <Form.Control.Feedback type="invalid" tooltip placement="right">
                      {t(formik.errors.password)}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="form-floating mb-4" controlId="confirmPassword">
                  <FloatingLabel className={formik.values.confirmPassword && 'filled'} label={t('signup.confirm')} controlId="confirmPassword">
                    <Form.Control
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="confirmPassword"
                      autoComplete="current-password"
                      placeholder={t('signup.confirm')}
                      required
                      type="password"
                      isInvalid={
                        (formik.errors.confirmPassword && formik.touched.confirmPassword)
                      || formik.errors.registration
                      }
                      value={formik.values.confirmPassword}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>
                      {formik.errors.registration
                        ? t('validation.alreadyExists')
                        : t('validation.mustMatch')}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Button className="w-100 mb-3" variant="outline-primary" type="submit">{t('signup.submit')}</Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingUp;
