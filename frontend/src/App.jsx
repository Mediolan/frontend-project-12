import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Login from './pages/Login.jsx';
import Home, { loader as rootLoader } from './pages/Home.jsx';
import ErrorPage from './pages/ErrorPage.jsx';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      errorElement: <ErrorPage />,
      loader: rootLoader,
    },
    {
      path: 'login',
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
