import React, { useRef } from 'react';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/index.jsx';

const SingUp = () => {
  const navigate = useNavigate();
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
        if (error.response.status === 401) {
          actions.setFieldError('authentication', 'auth');
          inputRef.current.select();
        }
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">Регистрация</h1>
                <Form.Group className="form-floating mb-3" controlId="username">
                  <FloatingLabel className={formik.values.username && 'filled'} label="Имя пользователя" controlId="username">
                    <Form.Control
                      name="username"
                      autoComplete="username"
                      placeholder="Your username"
                      required
                      autoFocus
                      isInvalid={formik.errors.authentication}
                      onChange={formik.handleChange}
                      value={formik.values.username}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="form-floating mb-3" controlId="username">
                  <FloatingLabel className={formik.values.username && 'filled'} label="Пароль" controlId="password">
                    <Form.Control
                      name="password"
                      autoComplete="new-password"
                      placeholder="Your password"
                      required
                      isInvalid={formik.errors.authentication}
                      onChange={formik.handleChange}
                      value={formik.values.username}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="form-floating mb-4" controlId="password">
                  <FloatingLabel className={formik.values.password && 'filled'} label="Подтвердите пароль" controlId="confirmPassword">
                    <Form.Control
                      name="confirmPassword"
                      autoComplete="current-password"
                      placeholder="Repeat password"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingUp;
