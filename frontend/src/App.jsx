/* eslint-disable consistent-return */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Chat from './pages/chat/Chat.jsx';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import SingUp from './pages/SingUp.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import { fetchAuthData } from './store/slices/loaderSlice.js';
import AuthContext, { useAuth } from './context/index.jsx';

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(currentUser ? { username: currentUser.username } : null);
  const logIn = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser({ username: userData.username });
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      logIn, logOut, user,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  return auth.user ? children : <Navigate to="/login" />;
};

const App = () => {
  const dispatch = useDispatch();

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <AuthProvider>
          <Home />
          <ToastContainer />
        </AuthProvider>),
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <PrivateRoute><Chat /></PrivateRoute>,
          loader: async () => {
            const userData = JSON.parse(localStorage.getItem('user'));
            if (userData) {
              await dispatch(fetchAuthData(userData.token));
            }
          },
        },
        {
          path: 'login',
          element: <Login />,
        },
        {
          path: 'signup',
          element: <SingUp />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
