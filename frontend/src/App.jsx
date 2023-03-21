/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import Chat from './pages/chat/Chat.jsx';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import SingUp from './pages/SingUp.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import AuthContext, { useAuth } from './context/index.jsx';
import routes from './routes.js';
import { fetchAuthData } from './store/slices/loaderSlice.js';

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(currentUser
    ? { ...currentUser } : null);

  const logIn = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser({ ...userData });
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const memoizedValues = useMemo(() => ({
    logIn, logOut, user,
  }), [user]);

  return (
    <AuthContext.Provider value={memoizedValues}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  return auth.user ? children : <Navigate to={routes.loginPage} />;
};

const Router = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  console.log(user);
  const router = createBrowserRouter([
    {
      path: routes.homePage,
      element: <Home />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <PrivateRoute><Chat /></PrivateRoute>,
          loader: () => {
            if (user) {
              dispatch(fetchAuthData(user.token));
            }
          },
        },
        {
          path: routes.loginPage,
          element: <Login />,
        },
        {
          path: routes.signupPage,
          element: <SingUp />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

const App = () => (
  <AuthProvider>
    <Router />
    <ToastContainer />
  </AuthProvider>
);

export default App;
