import React, { useRef } from 'react';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/index.jsx';
import { registrationFormValidation } from '../schemas/validations.js';

const SingUp = () => {
  const navigate = useNavigate();
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
        const res = await axios.post('/api/v1/signup', { username: values.username, password: values.password });
        logIn(res.data);
        navigate('/');
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
                  src="./gav.png"
                  className="rounded-circle"
                  alt="Регистрация"
                />
              </div>
              <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">Регистрация</h1>
                <Form.Group className="form-floating mb-4" controlId="username">
                  <FloatingLabel className={formik.values.username && 'filled'} label="Имя пользователя" controlId="username">
                    <Form.Control
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="username"
                      autoComplete="username"
                      placeholder="Your username"
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
                      {formik.errors.username}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="form-floating mb-4" controlId="password">
                  <FloatingLabel className={formik.values.password && 'filled'} label="Пароль" controlId="password">
                    <Form.Control
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="password"
                      autoComplete="new-password"
                      placeholder="Your password"
                      required
                      type="password"
                      isInvalid={
                        (formik.errors.password && formik.touched.password)
                      || formik.errors.registration
                      }
                      value={formik.values.password}
                    />
                    <Form.Control.Feedback type="invalid" tooltip placement="right">
                      {formik.errors.password}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="form-floating mb-4" controlId="confirmPassword">
                  <FloatingLabel className={formik.values.confirmPassword && 'filled'} label="Подтвердите пароль" controlId="confirmPassword">
                    <Form.Control
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="confirmPassword"
                      autoComplete="current-password"
                      placeholder="Repeat password"
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
                        ? 'Пользователь с таким именем уже существует'
                        : 'Пароли не совпадают'}
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
