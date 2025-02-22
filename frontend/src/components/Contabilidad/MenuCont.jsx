import React from "react";
import { Link } from "react-router-dom";

const MenuCont = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-success">
      <div
        className="card p-4 p-md-5 shadow-lg text-center position-relative"
        style={{ maxWidth: "900px", width: "100%" }}
      >
        <div className="d-flex justify-content-start">
          <Link to="/home" className="btn btn-outline-dark fw-bolder p-2">
            Volver al menú principal
          </Link>
        </div>
        {/* Logo */}
        <div className="mb-4 mt-3">
          <img
            src="/images/logosdc.png" // Asegúrate de usar la ruta correcta
            alt="Logo"
            className="img-fluid"
            style={{ maxWidth: "300px" }}
          />
        </div>

        {/* Título */}
        <h2 className="mb-4">Menu contabilidad</h2>

        {/* Botones */}
        <div className="d-flex flex-column flex-md-row justify-content-center gap-3">
          <Link
            to="/contabilidad-Amojs"
            className="btn btn-outline-dark fw-bolder p-2"
          >
            Amojonamientos y DJCU
          </Link>
          <Link
            to="/contabilidad-ArrozTopo"
            className="btn btn-outline-dark fw-bolder p-2"
          >
            Arroz Topografia
          </Link>
          <Link
            to="/contabilidad-tramites"
            className="btn btn-outline-dark fw-bolder p-2"
          >
            Agrimensura Tramites
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MenuCont;