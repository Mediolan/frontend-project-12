/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useMemo, useState } from 'react';
import {
  // createBrowserRouter,
  // RouterProvider,
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  Outlet,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Chat from './pages/chat/Chat.jsx';
import Login from './pages/Login.jsx';
import Nav from './pages/Nav.jsx';
import SingUp from './pages/SingUp.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import AuthContext, { useAuth } from './context/index.jsx';
import routes from './routes.js';

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(currentUser
    ? { ...currentUser } : null);

  const logIn = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
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

const PrivateRoute = () => {
  const auth = useAuth();
  return auth.user ? <Outlet /> : <Navigate to={routes.loginPage} />;
};

const App = () => (
  <AuthProvider>
    <Router>
      <Nav />
      <Routes>
        <Route path={routes.loginPage} element={<Login />} />
        <Route path={routes.signupPage} element={<SingUp />} />
        <Route path={routes.homePage} element={<PrivateRoute />}>
          <Route path="" element={<Chat />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer />
    </Router>
  </AuthProvider>
);

export default App;
