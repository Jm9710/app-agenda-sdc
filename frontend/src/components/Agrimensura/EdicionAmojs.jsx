import React, { useState, useEffect } from "react";
import MenuAmojs from "./MenuAmojs";

const Amojonamientos = () => {
  const [trabajos, setTrabajos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tiposDeTrabajo, setTiposDeTrabajo] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [estados, setEstados] = useState([]);
  const [selectedTrabajo, setSelectedTrabajo] = useState(null); // Para almacenar el trabajo que se edita
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const apiUrl = process.env.BACKEND_URL || 'https://app-agenda-sdc-backend.onrender.com';

  // Toggle de menú
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // Obtener los estados disponibles desde la API
    const fetchEstados = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/estados`); 
        if (!response.ok) {
          throw new Error("No se pudieron obtener los estados.");
        }
        const data = await response.json();
        setEstados(data); // Aquí se guardan los estados en el estado de React
      } catch (err) {
        setError("Error al obtener los estados: " + err.message);
      }
    };

    fetchEstados();
  }, []);

  // Función para eliminar un trabajo
  const handleDelete = async (id) => {
    // Mostrar una alerta de confirmación
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este trabajo?"
    );

    if (!confirmDelete) {
      // Si el usuario cancela, no hacemos nada
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/trabajos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Error al eliminar:", errorMessage);
        throw new Error(`Error al eliminar el trabajo: ${response.statusText}`);
      }
      // Actualizamos el estado para reflejar el trabajo eliminado
      setTrabajos(trabajos.filter((trabajo) => trabajo.id_trabajo !== id));
    } catch (err) {
      setError("Error al eliminar el trabajo: " + err.message);
    }
  };

  // Función para editar un trabajo (abre el formulario con los datos del trabajo)
  const handleEdit = (trabajo) => {
    setSelectedTrabajo(trabajo);
  };

  const handleSaveEdit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/api/trabajos/${selectedTrabajo.id_trabajo}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedTrabajo),
      });
  
      if (!response.ok) {
        throw new Error("Error al guardar los cambios");
      }
  
      // Actualizamos la lista de trabajos
      const fetchTrabajos = async () => {
        const trabajosResponse = await fetch(`${apiUrl}/api/trabajos`);
        const trabajosData = await trabajosResponse.json();
        setTrabajos(trabajosData); // Actualizamos la lista de trabajos en el estado
      };
  
      await fetchTrabajos(); // Recargamos la lista de trabajos
  
      window.alert("¡El trabajo se ha editado con éxito!"); // Mostrar mensaje de éxito
      setSelectedTrabajo(null); // Cerrar el formulario de edición
    } catch (err) {
      setError("Error al guardar los cambios: " + err.message);
    }
  };
  

  // Funciones para cargar los datos
  const fetchTrabajos = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/trabajos`);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();
      setTrabajos(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchClientes = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/clientes`);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();
      setClientes(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchEstados = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/estados`);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();
      setEstados(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchTiposDeTrabajo = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/api/tipo_de_trabajos`
      );
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();
      setTiposDeTrabajo(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchTiposDeTrabajo();
    fetchTrabajos();
    fetchClientes();
    fetchEstados();
  }, []);
  
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-success">
      <div
        className="card p-4 p-md-2 shadow-lg text-center"
        style={{
          width: "100%", // Esto asegura que el contenedor ocupe todo el ancho disponible en pantalla.
          height: "90vh", // La altura sigue siendo un porcentaje de la altura del viewport.
          maxWidth: "1200px", // Mantiene la proporción del contenedor sin que se estire más allá de este ancho
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <img
            src="/images/logosdc.png"
            alt="Logo SDC"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
            }}
          />
          <h1
            className="flex-grow-1 text-black text-center m-0"
            style={{
              fontSize: "24px",
            }}
          >
            Amojonamientos - Edicion de datos
          </h1>
          <button
            className="me-3"
            style={{ background: "transparent", border: "none" }}
            onClick={toggleMenu}
          >
            <i className="fas fa-bars" style={{ fontSize: "30px" }}></i>
          </button>
        </div>

        {/* Contenedor con scroll horizontal */}
        <div
          className="overflow-auto"
          style={{
            maxHeight: "75vh", // Se mantiene la altura máxima para el scroll vertical si es necesario
            overflowX: "auto", // Permite el desplazamiento horizontal si el contenido excede el contenedor
            whiteSpace: "nowrap", // Evita que el contenido se rompa en varias líneas
            paddingRight: "10px",
          }}
        >
          {isMenuOpen && <MenuAmojs />}

          {/* Tabla con contenido */}
          {loading ? (
            <p> Cargando Trabajos...</p>
          ) : error ? (
            <p> Error: {error}</p>
          ) : (
            <table
              className="table table-bordered table-striped text-center"
              style={{ width: "100%", tableLayout: "auto" }}
            >
              <thead>
                <tr>
                  <th className="bg-light text-dark" style={{ width: "250px" }}>
                    Acciones
                  </th>
                  <th className="bg-light text-dark" style={{ width: "160px" }}>
                    Numero de trabajo
                  </th>
                  <th className="bg-light text-dark" style={{ width: "300px" }}>
                    Fecha de solicitud
                  </th>
                  <th className="bg-light text-dark" style={{ width: "250px" }}>
                    Nombre de trabajo
                  </th>
                  <th className="bg-light text-dark" style={{ width: "100px" }}>
                    Manzana
                  </th>
                  <th className="bg-light text-dark" style={{ width: "100px" }}>
                    Solar
                  </th>
                  <th className="bg-light text-dark" style={{ width: "100px" }}>
                    Padron
                  </th>
                  <th className="bg-light text-dark" style={{ width: "150px" }}>
                    Departamento
                  </th>
                  <th className="bg-light text-dark" style={{ width: "150px" }}>
                    Localidad
                  </th>
                  <th className="bg-light text-dark" style={{ width: "250px" }}>
                    Nombre cliente
                  </th>
                  <th className="bg-light text-dark" style={{ width: "250px" }}>
                    Telefono cliente
                  </th>
                  <th className="bg-light text-dark" style={{ width: "150px" }}>
                    Moneda
                  </th>
                  <th className="bg-light text-dark" style={{ width: "150px" }}>
                    Costo
                  </th>
                  <th className="bg-light text-dark" style={{ width: "150px" }}>
                    Iva
                  </th>
                  <th className="bg-light text-dark" style={{ width: "300px" }}>
                    Comentarios
                  </th>
                  <th className="bg-light text-dark" style={{ width: "150px" }}>
                    Estado de trabajo
                  </th>
                </tr>
              </thead>
              <tbody>
                {trabajos
                  .filter((trabajo) => trabajo.tipo_de_trabajo === 1)
                  .sort((a, b) => a.num_trabajo - b.num_trabajo)
                  .map((trabajo) => {
                    const cliente = clientes.find(
                      (cl) => cl.id === trabajo.cliente_id
                    );
                    const estado = estados.find(
                      (est) => est.id_estado === trabajo.estado_trabajo
                    );
                    const tipoTrabajo = tiposDeTrabajo.find(
                      (tipo) => tipo.id === trabajo.nombre_tipo_trabajo
                    );

                    return (
                      <tr key={trabajo.id_trabajo}>
                        <td>
                          <button
                            onClick={() => handleEdit(trabajo)}
                            className="btn btn-warning me-2"
                          >
                            <i className="fas fa-edit"></i> Editar
                          </button>
                          <button
                            onClick={() => handleDelete(trabajo.id_trabajo)}
                            className="btn btn-danger"
                          >
                            <i className="fas fa-trash-alt"></i> Eliminar
                          </button>
                        </td>
                        <td
                          className="bg-light text-dark"
                          style={{ width: "160px" }}
                        >
                          {trabajo.num_trabajo}
                        </td>
                        <td
                          className="bg-light text-dark"
                          style={{ width: "200px" }}
                        >
                          {new Date(trabajo.fecha_solicitud).toLocaleDateString()}
                        </td>
                        <td
                          className="bg-light text-dark"
                          style={{ width: "250px" }}
                        >
                          {trabajo.nombre_trabajo}
                        </td>
                        <td
                          className="bg-light text-dark"
                          style={{ width: "100px" }}
                        >
                          {trabajo.manzana}
                        </td>
                        <td
                          className="bg-light text-dark"
                          style={{ width: "100px" }}
                        >
                          {trabajo.solar}
                        </td>
                        <td
                          className="bg-light text-dark"
                          style={{ width: "100px" }}
                        >
                          {trabajo.padron}
                        </td>
                        <td
                          className="bg-light text-dark"
                          style={{ width: "150px" }}
                        >
                          {trabajo.departamento}
                        </td>
                        <td
                          className="bg-light text-dark"
                          style={{ width: "150px" }}
                        >
                          {trabajo.localidad}
                        </td>
                        <td
                          className="bg-light text-dark"
                          style={{ width: "250px" }}
                        >
                          {" "}
                          {cliente ? cliente.nombre : "Cliente no encontrado"}
                        </td>
                        <td
                          className="bg-light text-dark"
                          style={{ width: "250px" }}
                        >
                          {trabajo.telefono_cliente}
                        </td>
                        <td
                          className="bg-light text-dark"
                          style={{ width: "150px" }}
                        >
                          {trabajo.moneda}
                        </td>
                        <td
                          className="bg-light text-dark"
                          style={{ width: "150px" }}
                        >
                          {trabajo.costo}
                        </td>
                        <td
                          className="bg-light text-dark"
                          style={{ width: "150px" }}
                        >
                          {trabajo.iva ? (
                            <i
                              className="fas fa-check"
                              style={{ color: "green" }}
                            ></i> // Tick verde
                          ) : (
                            <i
                              className="fas fa-times"
                              style={{ color: "red" }}
                            ></i> // X roja
                          )}
                        </td>
                        <td
                          className="bg-light text-dark"
                          style={{ width: "300px" }}
                        >
                          {trabajo.comentarios}
                        </td>
                        <td
                          className="bg-light text-dark"
                          style={{ width: "150px" }}
                        >
                          {" "}
                          {estado ? estado.tipo_estado : "Estado no encontrado"}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
          {/* Formulario de Edición */}
          {selectedTrabajo && (
            <div
              className="modal fade show"
              style={{
                display: "block",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Editar Trabajo</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setSelectedTrabajo(null)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handleSaveEdit}>
                      <div className="mb-3">
                        <label className="form-label">Nombre de trabajo</label>
                        <input
                          type="text"
                          className="form-control"
                          value={selectedTrabajo.nombre_trabajo}
                          onChange={(e) =>
                            setSelectedTrabajo({
                              ...selectedTrabajo,
                              nombre_trabajo: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Manzana</label>
                        <input
                          type="text"
                          className="form-control"
                          value={selectedTrabajo.manzana}
                          onChange={(e) =>
                            setSelectedTrabajo({
                              ...selectedTrabajo,
                              manzana: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Solar</label>
                        <input
                          type="text"
                          className="form-control"
                          value={selectedTrabajo.solar}
                          onChange={(e) =>
                            setSelectedTrabajo({
                              ...selectedTrabajo,
                              solar: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Padron</label>
                        <input
                          type="text"
                          className="form-control"
                          value={selectedTrabajo.padron}
                          onChange={(e) =>
                            setSelectedTrabajo({
                              ...selectedTrabajo,
                              padron: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Costo</label>
                        <input
                          type="number"
                          className="form-control"
                          value={selectedTrabajo.costo}
                          onChange={(e) =>
                            setSelectedTrabajo({
                              ...selectedTrabajo,
                              costo: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">IVA</label>
                        <input
                          type="checkbox"
                          checked={selectedTrabajo.iva} // Si está marcado, se aplica el cálculo del IVA
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            const updatedCosto = isChecked
                              ? selectedTrabajo.costo * 1.22 // Aplica el IVA del 21% si está marcado
                              : selectedTrabajo.costo / 1.22; // Vuelve al costo original si no está marcado
                            setSelectedTrabajo({
                              ...selectedTrabajo,
                              iva: isChecked,
                              costo: updatedCosto.toFixed(2), // Ajusta el costo con IVA y lo formatea
                            });
                          }}
                        />
                        {selectedTrabajo.iva && (
                          <small className="form-text text-muted">
                            IVA calculado: 22%
                          </small>
                        )}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Comentarios</label>
                        <textarea
                          className="form-control"
                          value={selectedTrabajo.comentarios}
                          onChange={(e) =>
                            setSelectedTrabajo({
                              ...selectedTrabajo,
                              comentarios: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Estado de trabajo</label>
                        <select
                          className="form-control"
                          value={selectedTrabajo.estado_trabajo}
                          onChange={(e) =>
                            setSelectedTrabajo({
                              ...selectedTrabajo,
                              estado_trabajo: e.target.value,
                            })
                          }
                        >
                          <option value="">Seleccionar estado</option>
                          {estados.map((estado) => (
                            <option
                              key={estado.id_estado}
                              value={estado.id_estado}
                            >
                              {estado.tipo_estado}
                            </option>
                          ))}
                        </select>
                      </div>

                      <button type="submit" className="btn btn-success">
                        Guardar cambios
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Amojonamientos;
