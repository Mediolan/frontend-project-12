/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useFormik } from 'formik';
import '../index.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/index.jsx';

const Login = () => {
  const navigate = useNavigate();
  const { logIn } = useAuth();
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
          formik.setErrors();
        }
        if (error.response.status === 401) {
          actions.setFieldError('authentication', 'auth');
        }
      }
    },
  });

  return (
    <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
      <Form.Group className="form-floating mb-3" controlId="username">
        <FloatingLabel className={formik.values.username && 'filled'} label="Ваш ник" controlId="username">
          <Form.Control
            name="username"
            autoComplete="username"
            placeholder="Your nickname"
            required
            isInvalid={formik.errors.authentication}
            onChange={formik.handleChange}
            value={formik.values.username}
          />
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="form-floating mb-4" controlId="password">
        <FloatingLabel className={formik.values.password && 'filled'} label="Пароль" controlId="username">
          <Form.Control
            name="password"
            autoComplete="current-password"
            placeholder="Your password"
            required
            type="password"
            isInvalid={formik.errors.authentication}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {formik.errors.authentication && 'Неверные имя пользователя или пароль'}
          </Form.Control.Feedback>
        </FloatingLabel>
      </Form.Group>
      <Button className="w-100 mb-3" variant="outline-primary" type="submit">Войти</Button>
    </Form>
  );
};

export default Login;
