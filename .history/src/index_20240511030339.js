import React from 'react';
import ReactDOM from 'react-dom/client';  // Import modifié pour utiliser react-dom/client
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './App.css';

const root = ReactDOM.createRoot(document.getElementById('root'));  // Utilisez createRoot ici
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
