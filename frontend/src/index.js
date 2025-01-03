//index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';  // Importa aquí el archivo CSS global
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';  // Si usas Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  // Si usas Bootstrap JS
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App /> {/* Asegúrate de que App esté envuelto */}
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals(console.log);
