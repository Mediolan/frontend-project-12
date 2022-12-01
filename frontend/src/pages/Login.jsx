/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useFormik } from 'formik';
import '../index.css';
import axios from 'axios';
import { redirect } from 'react-router-dom';

const Login = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const userToken = await axios.post('/api/v1/login', values);
        localStorage.setItem('token', userToken.data.token);
        localStorage.setItem('user', userToken.data.username);
      } catch (e) {
        formik.setErrors();
      }
      redirect('/');
    },
  });

  return (
    <form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
      <div className="form-floating">
        <input
          id="username"
          className="form-control"
          name="username"
          autoComplete="username"
          required=""
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        <label className={formik.values.username && 'filled'} htmlFor="username">
          Ваш ник
        </label>
      </div>
      <div className="form-floating">
        <input
          id="password"
          className="form-control"
          name="password"
          autoComplete="current-password"
          required=""
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        <label className={formik.values.password && 'filled'} htmlFor="password">
          Пароль
        </label>
        {!formik.isValid ? (
          <div className="invalid-tooltip">Неверные имя пользователя или пароль</div>
        ) : null}
      </div>
      <button className="w-100 mb-3 btn btn-outline-primary" type="submit">Войти</button>
    </form>
  );
};

export default Login;
