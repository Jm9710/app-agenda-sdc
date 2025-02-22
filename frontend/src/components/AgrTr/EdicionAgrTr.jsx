import React, { useState, useEffect } from "react";
import MenuAgrTr from "./MenuAgrTr";

const Amojonamientos = () => {
  const [trabajos, setTrabajos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tiposDeTrabajo, setTiposDeTrabajo] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [estados, setEstados] = useState([]);
  const [selectedTrabajo, setSelectedTrabajo] = useState(null); // Para almacenar el trabajo que se edita
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [zoom, setZoom] = useState(1);
  const [maxHeight, setMaxHeight] = useState("600px");

  const apiUrl = process.env.BACKEND_URL || 'https://app-agenda-sdc-backend.onrender.com';

  //const apiUrl = process.env.BACKEND_URL || "http://127.0.0.1:3001";

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

    const updateMaxHeight = () => {
      const width = window.innerWidth;

      if (width < 576) {
        setMaxHeight("600px"); // Para pantallas muy pequeñas (móviles)
      } else if (width < 768) {
        setMaxHeight("800px"); // Para tablets
      } else if (width < 992) {
        setMaxHeight("900px"); // Para pantallas medianas
      } else {
        setMaxHeight("600px"); // Para pantallas grandes
      }
    };

    updateMaxHeight();
    window.addEventListener("resize", updateMaxHeight);

    return () => {
      window.removeEventListener("resize", updateMaxHeight);
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
      const response = await fetch(
        `${apiUrl}/api/trabajos/${selectedTrabajo.id_trabajo}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedTrabajo),
        }
      );

      if (!response.ok) {
        throw new Error("Error al guardar los cambios");
      }

      // Actualizamos el trabajo en la lista sin necesidad de hacer otra consulta
      setTrabajos((prevTrabajos) =>
        prevTrabajos.map((trabajo) =>
          trabajo.id_trabajo === selectedTrabajo.id_trabajo
            ? selectedTrabajo
            : trabajo
        )
      );

      window.alert("¡El trabajo se ha editado con éxito!"); // Mostrar mensaje de éxito
      setSelectedTrabajo(null); // Cerrar el formulario de edición
    } catch (err) {
      setError("Error al guardar los cambios: " + err.message);
    }

    // Después de guardar los cambios, recargar la página
    window.location.reload();
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
      const response = await fetch(`${apiUrl}/api/tipo_de_trabajos`);
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
          maxWidth: "95%", // Mantiene la proporción del contenedor sin que se estire más allá de este ancho
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
            Agrimensura tramites - Edicion de datos
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
            maxHeight: "75vh",
            overflowY: "auto",
            overflowX: "hidden",
            WebkitOverflowScrolling: "touch", // Scroll suave en iOS
            paddingRight: "10px",
            // Estilos para desktop
            "@media (min-width: 768px)": {
              overflowX: "auto",
              whiteSpace: "nowrap",
            },
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center", // Centra verticalmente los elementos
              gap: "5px", // Espaciado uniforme entre elementos
              marginBottom: "10px", // Separación inferior
            }}
          >
            <input
              type="text"
              style={{ width: "350px" }}
              className="form-control input-search"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search..."
            />
            <button
              onClick={() => setZoom((prev) => prev + 0.1)}
              style={{ fontSize: "18px" }}
              className="btn btn-primary m-0"
            >
              +
            </button>
            <button
              onClick={() => setZoom((prev) => Math.max(0.1, prev - 0.1))}
              style={{ fontSize: "18px" }}
              className="btn btn-primary m-0"
            >
              -
            </button>
            <button
              onClick={() => setZoom(1)} // Restablece el zoom al valor predeterminado
              className="btn btn-secondary m-0"
            >
              Restablecer Zoom
            </button>
          </div>

          {isMenuOpen && <MenuAgrTr/>}

          {/* Tabla con contenido */}
          {loading ? (
            <p> Cargando Trabajos...</p>
          ) : error ? (
            <p> Error: {error}</p>
          ) : (
            <div
              style={{
                overflow: "auto",
                maxHeight: maxHeight, // Tamaño ajustable por breakpoint
                transform: `scale(${zoom})`,
                transformOrigin: "top left",
                border: "1px solid #ddd",
                width: "fit-content",
              }}
            >
              <table
                className="table table-bordered table-striped text-center"
                style={{
                  borderCollapse: "collapse",
                  width: "100%",
                  minWidth: "500px", // Para evitar que la tabla colapse en tamaños pequeños
                }}
              >
                <thead
                  style={{
                    position: "sticky",
                    top: 0,
                    backgroundColor: "#fff",
                  }}
                >
                  <tr>
                    <th
                      className="bg-light text-dark"
                      style={{ width: "250px" }}
                    >
                      Acciones
                    </th>
                    <th
                      className="bg-light text-dark"
                      style={{ width: "160px" }}
                    >
                      Numero de trabajo
                    </th>
                    <th
                      className="bg-light text-dark"
                      style={{ width: "300px" }}
                    >
                      Fecha de solicitud
                    </th>
                    <th
                      className="bg-light text-dark"
                      style={{ width: "100px" }}
                    >
                      Comentarios
                    </th>
                    <th
                      className="bg-light text-dark"
                      style={{ width: "250px" }}
                    >
                      Nombre cliente
                    </th>
                    <th
                      className="bg-light text-dark"
                      style={{ width: "250px" }}
                    >
                      Nombre de trabajo
                    </th>
                    <th
                      className="bg-light text-dark"
                      style={{ width: "150px" }}
                    >
                      Localidad
                    </th>
                    <th
                      className="bg-light text-dark"
                      style={{ width: "100px" }}
                    >
                      Manzana
                    </th>
                    <th
                      className="bg-light text-dark"
                      style={{ width: "100px" }}
                    >
                      Solar
                    </th>
                    <th
                      className="bg-light text-dark"
                      style={{ width: "100px" }}
                    >
                      Padron
                    </th>
                    <th
                      className="bg-light text-dark"
                      style={{ width: "150px" }}
                    >
                      Departamento
                    </th>

                    <th
                      className="bg-light text-dark"
                      style={{ width: "250px" }}
                    >
                      Telefono cliente
                    </th>
                    <th
                      className="bg-light text-dark"
                      style={{ width: "150px" }}
                    >
                      Estado de trabajo
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {trabajos
                    .filter(
                      (trabajo) =>
                        trabajo.tipo_de_trabajo === 3 &&
                        Object.values(trabajo)
                          .join(" ")
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                    )
                    .sort((a, b) => a.num_trabajo - b.num_trabajo)
                    .map((trabajo) => {
                      const cliente = clientes.find(
                        (cl) => cl.id === trabajo.cliente_id
                      );
                      const estado = estados.find(
                        (est) => est.id_estado === trabajo.estado
                      );
                      const tipoTrabajo = tiposDeTrabajo.find(
                        (tipo) => tipo.id === trabajo.nombre_tipo_trabajo
                      );

                      return (
                        <tr key={trabajo.id_trabajo}>
                          <td
                            style={{
                              display: "flex",
                              gap: "8px",
                              alignItems: "center",
                              whiteSpace: "nowrap",
                            }}
                          >
                            <button
                              onClick={() => handleEdit(trabajo)}
                              className="btn btn-warning p-1 m-0"
                            >
                              <i className="fas fa-edit"></i> Editar
                            </button>
                            <button
                              onClick={() => handleDelete(trabajo.id_trabajo)}
                              className="btn btn-danger p-1 m-0"
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
                            {new Date(
                              trabajo.fecha_solicitud
                            ).toLocaleDateString()}
                          </td>
                          <td
                            className="bg-light text-dark"
                            style={{ width: "100px", whiteSpace: "pre-wrap" }}
                          >
                            {trabajo.comentarios}
                          </td>
                          <td
                            className="bg-light text-dark"
                            style={{ width: "250px" }}
                          >
                            {" "}
                            {cliente
                              ? cliente.nombre + " " + cliente.apellido
                              : "Cliente no encontrado"}
                          </td>

                          <td
                            className="bg-light text-dark"
                            style={{ width: "250px" }}
                          >
                            {trabajo.nombre_trabajo}
                          </td>
                          <td
                            className="bg-light text-dark"
                            style={{ width: "150px" }}
                          >
                            {trabajo.localidad}
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
                            style={{ width: "250px" }}
                          >
                            {trabajo.telefono_cliente}
                          </td>
                          <td
                            className="bg-light text-dark"
                            style={{ width: "150px" }}
                          >
                            {" "}
                            {estado
                              ? estado.tipo_estado
                              : "Estado no encontrado"}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
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
                      <div className="mb-3 row">
                        <div className="col">
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
                        <div className="col">
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
                        <div className="col">
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
                          value={selectedTrabajo.estado}
                          onChange={(e) =>
                            setSelectedTrabajo({
                              ...selectedTrabajo,
                              estado: e.target.value,
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
