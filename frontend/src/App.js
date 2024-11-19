import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login"; // Importa el componente Login
import Home from "./components/Home"; // Asegúrate de tener un componente Home

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} /> {/* Ruta para Login */}
      <Route path="/home" element={<Home />} /> {/* Ruta para la página principal */}
    </Routes>
  );
};

export default App;
