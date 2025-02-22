//App.js

import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
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
import Clientes from "./components/Clientes";
import MenuCont from "./components/Contabilidad/MenuCont";
import ContAmojs from "./components/Contabilidad/ContAmojs";
import ContAgrTram from "./components/Contabilidad/ContAgrTram";
import ContArrozTopo from "./components/Contabilidad/ContArrTopo";
import HomeProgreso from "./components/Progreso/HomeProgreso";
import ProAmojsDJCU from "./components/Progreso/ProAmojsDJCU";
import ProAgrTram from "./components/Progreso/ProAgrTram";
import ProArrTopo from "./components/Progreso/ProArrTopo";


const App = () => {
  const location = useLocation(); // Obtiene la ubicación actual

  useEffect(() => {
    // Cambiar el título de la página según la ruta actual
    switch (location.pathname) {
      case "/":
        document.title = "Login - SDC Agenda";
        break;
      case "/home":
        document.title = "Página Principal - SDC Agenda";
        break;
      case "/agregar-trabajos":
        document.title = "Agregar Trabajos - SDC Agenda";
        break;
      case "/amojonamientos":
        document.title = "Amojonamientos - SDC Agenda";
        break;
      case "/arroz-topografia":
        document.title = "Arroz Topografía - SDC Agenda";
        break;
      case "/agrimensura-tramites":
        document.title = "Trámites Agrimensura - SDC Agenda";
        break;
      case "/agregar-cliente":
        document.title = "Agregar Cliente - SDC Agenda";
        break;
      case "/guardar-trabajo":
        document.title = "Guardar Trabajo - SDC Agenda";
        break;
      case "/edicion-amojs":
        document.title = "Edición Amojs - SDC Agenda";
        break;
      case "/resumen-amojs":
        document.title = "Resumen Amojs - SDC Agenda";
        break;
      case "/edicion-topo":
        document.title = "Edición Topografía - SDC Agenda";
        break;
      case "/resumen-topo":
        document.title = "Resumen Topografía - SDC Agenda";
        break;
      case "/edicion-AgrTr":
        document.title = "Edición Trmites- SDC Agenda";
        break;
      case "/resumen-AgrTr":
        document.title = "Resumen Trmites - SDC Agenda";
        break;
      case "/clientes":
        document.title = "Clientes - SDC Agenda";
        break;
      case "/menu-contabilidad":
        document.title = "Menu Contabilidad - SDC Agenda";
        break;
      case "/contabilidad-Amojs":
        document.title = "Contabilidad Amojs y DJCU - SDC Agenda";
        break;
      case "/contabilidad-ArrozTopo":
        document.title = "Contabilidad Arroz Topografia - SDC Agenda";
        break;
      case "/contabilidad-tramites":
        document.title = "Contabilidad Agrimensura Tramites - SDC Agenda";
        break;
      case "/home-progreso":
        document.title = "Progreso General - SDC Agenda";
      case "/progreso-amojs":
        document.title = "Progreso Amojs y DJCU - SDC Agenda";
      case "/progreso-arroz-topo":
        document.title = "Progreso Arroz Topografia - SDC Agenda";
      case "/progreso-agrimensura-tramites":
        document.title = "Progreso Agrimensura Tramites - SDC Agenda";
      default:
        document.title = "SDC Agenda";
    }
  }, [location]); // Ejecutar cada vez que cambia la ruta

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/agregar-trabajos" element={<AgregarTrabajos />} />
      <Route path="/amojonamientos" element={<Amojonamientos />} />
      <Route path="/arroz-topografia" element={<ArrozTopografia />} />
      <Route path="/agrimensura-tramites" element={<AgrimensuraTramites />} />
      <Route path="/agregar-cliente" element={<AgregarCliente />} />
      <Route path="/guardar-trabajo" element={<GuardarTrabajo />} />
      <Route path="/edicion-amojs" element={<EdicionAmojs />} />
      <Route path="/resumen-amojs" element={<ResumenAmojs />} />
      <Route path="/edicion-topo" element={<EdicionTopo />} />
      <Route path="/resumen-topo" element={<ResumenTopo />} />
      <Route path="/edicion-AgrTr" element={<EdicionAgrTr />} />
      <Route path="/resumen-AgrTr" element={<ResumenAgrTr />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/menu-contabilidad" element={<MenuCont />} />
      <Route path="/contabilidad-Amojs" element={<ContAmojs />} />
      <Route path="/contabilidad-ArrozTopo" element={<ContArrozTopo />} />
      <Route path="/contabilidad-tramites" element={<ContAgrTram />} />
      <Route path="/home-progreso" element={<HomeProgreso />} />
      <Route path="/progreso-amojs" element={<ProAmojsDJCU />} />
      <Route path="/progreso-arroz-topo" element={<ProArrTopo />} />
      <Route path="/progreso-agrimensura-tramites" element={<ProAgrTram />} />
    </Routes>
  );
};


export default App;
