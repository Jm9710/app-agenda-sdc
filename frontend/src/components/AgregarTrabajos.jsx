import React, { useState } from "react";
import { Link } from "react-router-dom";
import ModalCliente from './ModalCliente';

const AgregarTrabajos = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-success">
      <div
        className="card p-4 p-md-5 shadow-lg"
        style={{
          maxWidth: "800px",
          width: "100%",
          height: "90vh", // Altura fija para la tarjeta
          borderRadius: "20px",
          overflow: "hidden", // Evita que elementos se desborden
        }}
      >
        {/* Encabezado */}
        <div className="d-flex justify-content-between mb-3">
          <Link to="/home" className="btn btn-outline-secondary">
            Volver
          </Link>
          <h3 className="text-center flex-grow-1">Agregar trabajo</h3>
          <button
            type="button"
            className="btn btn-outline-secondary"
            data-bs-toggle="modal"
            data-bs-target="#modalAgregarCliente"
          >
            Agregar Cliente
          </button> 
        </div>

        {/* Contenedor con scroll */}
        <div
          style={{
            overflowY: "auto", // Habilita scroll vertical
            maxHeight: "75vh", // Límite de altura del área scrollable
            paddingRight: "10px", // Espacio para evitar que el scroll tape contenido
          }}
        >
          {/* Selección de Planilla */}
          <div className="mb-3">
            <label htmlFor="planilla" className="form-label">
                Seleccion de planilla
            </label>
            <select id="planilla" className="form-select"> 
                <option >Seleccionar planilla</option>
                <option >Amojonamientos</option>
                <option >Arroz topografia</option>
                <option >Agrimensura tramites</option>
                
            </select>
          </div>

          {/* Filas principales */}
          <div className="row mb-3">
            <div className="col-md-6 mb-3 mb-md-0">
              <label htmlFor="numeroTrabajo" className="form-label">
                Número de trabajo
              </label>
              <input type="text" id="numeroTrabajo" className="form-control" />
            </div>
            <div className="col-md-6">
              <label htmlFor="fechaSolicitud" className="form-label">
                Fecha de solicitud
              </label>
              <input type="date" id="fechaSolicitud" className="form-control" />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="nombreTrabajo" className="form-label">
              Nombre de trabajo
            </label>
            <input type="text" id="nombreTrabajo" className="form-control" />
          </div>

          {/* Datos de ubicación */}
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="manzana" className="form-label">
                Manzana
              </label>
              <input type="text" id="manzana" className="form-control" />
            </div>
            <div className="col-md-4">
              <label htmlFor="solar" className="form-label">
                Solar
              </label>
              <input type="text" id="solar" className="form-control" />
            </div>
            <div className="col-md-4">
              <label htmlFor="padron" className="form-label">
                Padrón
              </label>
              <input type="text" id="padron" className="form-control" />
            </div>
          </div>

          {/* Información del cliente */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="cliente" className="form-label">
                Cliente
              </label>
              <input type="text" id="cliente" className="form-control" />
            </div>
            <div className="col-md-6">
              <label htmlFor="telefono" className="form-label">
                Teléfono
              </label>
              <input type="tel" id="telefono" className="form-control" />
            </div>
          </div>

          {/* Costo e IVA */}
          <div className="row mb-3 align-items-end">
            <div className="col-md-4">
              <label htmlFor="costo" className="form-label">
                Costo
              </label>
              <input type="number" id="costo" className="form-control" />
            </div>
            <div className="col-md-4 d-flex align-items-center">
              <label htmlFor="iva" className="form-label me-2">
                ¿Es con IVA?
              </label>
              <input type="checkbox" id="iva" className="form-check-input" />
            </div>
          </div>

          {/* Comentarios */}
          <div className="mb-3">
            <label htmlFor="comentarios" className="form-label">
              Comentarios
            </label>
            <textarea
              id="comentarios"
              className="form-control"
              rows="4"
            ></textarea>
          </div>

          {/* Botón Guardar */}
          <div className="text-end">
            <button className="btn btn-success fw-bold">Guardar trabajo</button>
          </div>
        </div>
      </div>

        <ModalCliente isOpen={isModalOpen} onClose={handleCloseModal}/>      

    </div>
  );
};

export default AgregarTrabajos;
