// ModalCliente.jsx
import React from 'react';

const ModalCliente = () => {
  return (
    <div
      className="modal fade"
      id="modalAgregarCliente"
      tabIndex="-1"
      aria-labelledby="modalAgregarClienteLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modalAgregarClienteLabel">Agregar Cliente</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Cerrar"
            ></button>
          </div>
          <div className="modal-body">
            {/* Formulario de cliente */}
            <form>
              <div className="mb-3">
                <label htmlFor="clienteNombre" className="form-label">Nombre y Apellido</label>
                <input type="text" className="form-control" id="clienteNombre" />
              </div>
              <div className="mb-3">
                <label htmlFor="clienteTelefono" className="form-label">Teléfono</label>
                <input type="tel" className="form-control" id="clienteTelefono" />
              </div>
              {/* Otros campos del formulario */}
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Cerrar
            </button>
            <button type="button" className="btn btn-primary">Guardar Cliente</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCliente;
