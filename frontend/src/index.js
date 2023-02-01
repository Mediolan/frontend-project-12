import 'bootstrap/dist/css/bootstrap.min.css';
// import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import init from './init.jsx';
import reportWebVitals from './reportWebVitals';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  const vdom = await init();
  root.render(
    <React.StrictMode>
      {vdom}
    </React.StrictMode>,
  );
};

app();

reportWebVitals();
