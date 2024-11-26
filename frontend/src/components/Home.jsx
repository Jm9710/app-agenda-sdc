import React from "react";

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
            style={{ maxWidth: "200px" }}
          />
        </div>

        {/* Título */}
        <h2 className="mb-4">Agenda de Trabajos</h2>

        {/* Botones */}
        <div className="d-flex flex-column flex-md-row justify-content-center gap-3">
          <button className="btn btn-outline-secondary">Agregar Trabajos</button>
          <button className="btn btn-outline-secondary">Amojonamientos</button>
          <button className="btn btn-outline-secondary">Arroz topografía</button>
          <button className="btn btn-outline-secondary">Agrimensura trámites</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
