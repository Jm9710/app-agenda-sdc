import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-success">
      <div className="card p-4 p-md-5 shadow-lg text-center" style={{ maxWidth: "800px", width: "100%" }}>
        {/* Logo */}
        <div className="mb-4">
          <img
            src="/images/logosdc.jpg" // Asegúrate de usar la ruta correcta
            alt="Logo"
            className="img-fluid"
            style={{ maxWidth: "300px" }}
          />
        </div>

        {/* Título */}
        <h2 className="mb-4">Agenda de Trabajos</h2>

        {/* Botones */}
        <div className="d-flex flex-column flex-md-row justify-content-center gap-3">
          <Link to="/agregar-trabajos" className="btn btn-outline-secondary fw-bolder p-2" >Agregar Trabajos</Link>
          <Link to="/amojonamientos" className="btn btn-outline-secondary fw-bolder p-2" >Amojonamientos</Link>
          <Link to="/arroz-topografia" className="btn btn-outline-secondary fw-bolder p-2" >Arroz topografía</Link>
          <Link to="/agrimensura-tramites" className="btn btn-outline-secondary fw-bolder p-2" >Agrimensura trámites</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;