import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login"; 
import Home from "./components/Home"; 
import AgregarTrabajos from "./components/AgregarTrabajos";
import Amojonamientos from "./components/Agrimensura/Amojonamientos";
import ArrozTopografia from "./components/ArrozTopo/ArrozTopografia";
import AgrimensuraTramites from "./components/AgrTr/AgrimensuraTramites";
import AgregarCliente from "./components/ModalCliente";
import GuardarTrabajo from "./components/ModalGuardarTrabajo"
import EdicionAmojs from "./components/Agrimensura/EdicionAmojs"
import ResumenAmojs from "./components/Agrimensura/ResumenAmojs"
import EdicionTopo from "./components/ArrozTopo/EdicionTopo"
import ResumenTopo from "./components/ArrozTopo/ResumenTopo"
import EdicionAgrTr from "./components/AgrTr/EdicionAgrTr"
import ResumenAgrTr from "./components/AgrTr/ResumenAgrTr"

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
      <Route path="/guardar-trabajo" element={<GuardarTrabajo />} /> {/* Ruta para guardar trabajo*/}
      <Route path="/edicion-amojs" element={<EdicionAmojs />} /> {/* Ruta para editar amojs*/}
      <Route path="/resumen-amojs" element={<ResumenAmojs />} /> {/* Ruta para editar amojs*/}
      <Route path="/edicion-topo" element={<EdicionTopo />} /> {/* Ruta para editar amojs*/}
      <Route path="/resumen-topo" element={<ResumenTopo />} /> {/* Ruta para editar amojs*/}
      <Route path="/edicion-AgrTr" element={<EdicionAgrTr/>} /> {/* Ruta para editar amojs*/}
      <Route path="/resumen-AgrTr" element={<ResumenAgrTr/>} /> {/* Ruta para editar amojs*/}

    </Routes>
  );
};

export default App;
