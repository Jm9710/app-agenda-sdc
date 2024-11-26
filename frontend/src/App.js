import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login"; 
import Home from "./components/Home"; 
import AgregarTrabajos from "./components/AgregarTrabajos";
import Amojonamientos from "./components/Amojonamientos";
import ArrozTopografia from "./components/ArrozTopografia";
import AgrimensuraTramites from "./components/AgrimensuraTramites";
import AgregarCliente from "./components/ModalCliente";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} /> {/* Ruta para Login */}
      <Route path="/home" element={<Home />} /> {/* Ruta para la página principal */}
      <Route path="/agregar-trabajos" element={<AgregarTrabajos />} /> {/* Ruta para agregar trabajos */}
      <Route path="/amojonamientos" element={<Amojonamientos />} /> {/* Ruta para agenda agrimensura */}
      <Route path="/arroz-topografia" element={<ArrozTopografia />} /> {/* Ruta para agenda arroz topografia */}
      <Route path="/agrimensura-tramites" element={<AgrimensuraTramites />} /> {/* Ruta para agenda agrimensura tramites */}
      <Route path="/agregar-cliente" element={<AgregarCliente />} /> {/* Ruta para agrgegar cliente */}
    </Routes>
  );
};

export default App;
