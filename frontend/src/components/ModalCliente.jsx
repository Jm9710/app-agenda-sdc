// ModalCliente.jsx
import React, { useState } from 'react';

const ModalCliente = () => {
const [nombre, setNombre] = useState("");
const [apellido, setApellido] = useState("");
const [cedula, setCedula] = useState("");
const [direccion, setDireccion] = useState("");
const [telefono, setTelefono] = useState("");
const [loading, setLoading] = useState("");
const [error, setError] = useState("");

const apiUrl = process.env.BACKEND_URL || 'http://localhost:3001';

const handleSubmit = async (e) => {
  e.preventDefault();

  // Mostrar el spinner
  setLoading(true);
  setError(""); // Limpiar cualquier error previo

  // Enviar los datos al backend
  try {
    const response = await fetch(`${apiUrl}/api/clientes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        apellido,
        cedula,
        direccion,
        telefono,
      }),
    });

    const data = await response.json();

    if (response.ok){
      alert("Cliente creado exitosamente");
      setNombre("");
      setApellido("");
      setCedula("");
      setDireccion("");
      setTelefono("");
    }else{
      setError(data.Error || "Hubo un problema al creare el cliente");
    }
  }catch{
    setError("Hubo un problema de conexion")
  } finally {
    setLoading(false)
  }
};
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
          {/* Mostrar mensaje de error si ocurre */}
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Formulario de cliente */}
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="clienteNombre" className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="clienteNombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="clienteApellido" className="form-label">Apellido</label>
                <input
                  type="text"
                  className="form-control"
                  id="clienteApellido"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="clienteCedula" className="form-label">Cédula</label>
                <input
                  type="text"
                  className="form-control"
                  id="clienteCedula"
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="clienteDireccion" className="form-label">Dirección</label>
                <input
                  type="text"
                  className="form-control"
                  id="clienteDireccion"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="clienteTelefono" className="form-label">Teléfono</label>
              <input
                type="tel"
                className="form-control"
                id="clienteTelefono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                required
              />
            </div>

            {/* Botón de guardar */}
            <button type="submit" className="btn btn-success w-100" disabled={loading}>
              {loading ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
              ) : (
                "Guardar Cliente"
              )}
            </button>
          </form>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
);
};

export default ModalCliente;