import React, { useRef } from 'react';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/index.jsx';

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { logIn } = useAuth();
  const inputRef = useRef();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values, actions) => {
      try {
        const { data } = await axios.post('/api/v1/login', values);
        if (data.token) {
          const user = { token: data.token, username: data.username };
          logIn(user);
          navigate('/');
        }
      } catch (error) {
        if (error.code === 'ERR_NETWORK') {
          console.log(error);
        }
        if (error.response?.status === 401) {
          actions.setFieldError('authentication', 'auth');
          inputRef.current.select();
        }
      }
    },
  });
  const Test = { test: 'test' };

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center" />
              <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('login.title')}</h1>
                <Form.Group className="form-floating mb-3" controlId="username">
                  <FloatingLabel className={formik.values.username && 'filled'} label={t('login.username')} controlId="username">
                    <Form.Control
                      name="username"
                      autoComplete="username"
                      placeholder={t('login.username')}
                      required
                      autoFocus
                      isInvalid={formik.errors.authentication}
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      ref={inputRef}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="form-floating mb-4" controlId="password">
                  <FloatingLabel className={formik.values.password && 'filled'} label={t('login.password')} controlId="password">
                    <Form.Control
                      name="password"
                      autoComplete="current-password"
                      placeholder={t('login.password')}
                      required
                      type="password"
                      isInvalid={formik.errors.authentication}
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    <Test />
                    <Form.Control.Feedback type="invalid" tooltip>
                      {formik.errors.authentication && t('validation.loginFailed')}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Button className="w-100 mb-3" variant="outline-primary" type="submit">{t('login.submit')}</Button>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('login.notRegistered')}</span>
                {' '}
                <Link to="/signup">{t('login.signup')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
