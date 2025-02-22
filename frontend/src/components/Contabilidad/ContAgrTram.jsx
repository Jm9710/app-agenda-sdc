import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ContAmoj = () => {
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

  //const apiUrl = process.env.BACKEND_URL || 'http://127.0.0.1:3001';

  // Toggle de menú
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // Obtener los estados disponibles desde la API
    const fetchEstados = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/estados_contables`);
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

  // Función para editar un trabajo (abre el formulario con los datos del trabajo)
  const handleEdit = (trabajo) => {
    // Calculamos la deuda si no está definida, restando lo entregado al costo
    const deudaCalculada =
      trabajo.deuda !== undefined
        ? trabajo.deuda
        : trabajo.costo - trabajo.entrego;

    setSelectedTrabajo({
      ...trabajo,
      deuda: deudaCalculada, // Deuda calculada si no está definida
      entrego: trabajo.entrego || 0, // Inicializar entrego si no está definido
    });
  };

  const handleSaveEdit = async (event) => {
    event.preventDefault();

    const updatedTrabajo = { ...selectedTrabajo };

    // Restar el monto de entrega de la deuda
    updatedTrabajo.deuda = updatedTrabajo.costo - updatedTrabajo.entrego;

    // Si la deuda es menor o igual a 0, y si no hay un estado seleccionado,
    // permite elegir entre los estados 3, 4 y 5
    if (updatedTrabajo.deuda <= 0) {
      updatedTrabajo.deuda = 0; // Asegurarse de que la deuda no sea negativa

      // Solo asignar el estado a "Cobrado" si no se selecciona otro estado
      if (!updatedTrabajo.estado_contable) {
        updatedTrabajo.estado_contable = 4; // Cobrado
      }
    }

    try {
      // Hacer el PUT request para guardar los cambios
      const response = await fetch(
        `${apiUrl}/api/trabajos/${updatedTrabajo.id_trabajo}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTrabajo),
        }
      );

      if (!response.ok) {
        throw new Error("Error al guardar los cambios");
      }

      // Actualizar el estado de todos los trabajos con la deuda recalculada
      setTrabajos((prevTrabajos) => {
        return prevTrabajos.map((trabajo) =>
          trabajo.id_trabajo === updatedTrabajo.id_trabajo
            ? updatedTrabajo
            : trabajo
        );
      });

      window.alert("¡El trabajo se ha editado con éxito!");
      setSelectedTrabajo(null); // Cerrar el formulario
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
      const response = await fetch(`${apiUrl}/api/estados_contables`);
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
          <Link to="/home">
            <img
              src="/images/logosdc.png"
              alt="Logo SDC"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
              }}
            />
          </Link>
          <h1
            className="flex-grow-1 text-black text-center m-0"
            style={{
              fontSize: "24px",
            }}
          >
            Agrimensura tramites - Contabilidad
          </h1>
          <div className="d-flex justify-content-end">
            <Link
              to="/menu-contabilidad"
              className="btn btn-outline-dark fw-bolder p-2"
            >
              Volver
            </Link>
          </div>
          <div className="d-flex justify-content-end">
            <Link
              to="/progreso-agrimensura-tramites"
              className="btn btn-outline-dark fw-bolder p-2"
            >
              Ir a progreso
            </Link>
          </div>
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

          {isMenuOpen && <MenuAmojs />}

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
                      style={{ width: "250px" }}
                    >
                      Telefono cliente
                    </th>
                    <th
                      className="bg-light text-dark"
                      style={{ width: "150px" }}
                    >
                      Moneda
                    </th>
                    <th
                      className="bg-light text-dark"
                      style={{ width: "150px" }}
                    >
                      Costo
                    </th>
                    <th
                      className="bg-light text-dark"
                      style={{ width: "150px" }}
                    >
                      Iva
                    </th>
                    <th
                      className="bg-light text-dark"
                      style={{ width: "150px" }}
                    >
                      Entrego
                    </th>
                    <th
                      className="bg-light text-dark"
                      style={{ width: "150px" }}
                    >
                      Deuda
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
                          .includes(searchTerm.toLowerCase()) // Filtrado por el término de búsqueda
                    )
                    .sort((a, b) => a.num_trabajo - b.num_trabajo) // Ordenar por el número de trabajo
                    .map((trabajo) => {
                      const cliente = clientes.find(
                        (cl) => cl.id === trabajo.cliente_id
                      ); // Buscar cliente
                      const estado = estados.find(
                        (est) =>
                          est.id_estado_contable === trabajo.estado_contable
                      ); // Buscar estado
                      const tipoTrabajo = tiposDeTrabajo.find(
                        (tipo) => tipo.id === trabajo.nombre_tipo_trabajo
                      ); // Buscar tipo de trabajo

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
                            style={{ width: "150px" }}
                          >
                            {trabajo.entrego}
                          </td>
                          <td
                            className="bg-light text-dark"
                            style={{ width: "150px" }}
                          >
                            {trabajo.deuda !== undefined
                              ? trabajo.deuda
                              : trabajo.costo}{" "}
                            {/* Muestra deuda o costo si deuda es undefined */}
                          </td>

                          <td
                            className="bg-light text-dark"
                            style={{ width: "150px" }}
                          >
                            {" "}
                            {estado
                              ? estado.tipo_estado_contable
                              : "Estado no encontrado"}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          )}
          {selectedTrabajo && (
            <div
              className="modal fade show"
              style={{
                display: "block",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
            >
              <div className="modal-dialog modal-lg">
                <div className="modal-content rounded-3 shadow-lg">
                  <div className="modal-header bg-primary text-white">
                    <h5 className="modal-title">Editar Contabilidad</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setSelectedTrabajo(null)}
                    ></button>
                  </div>
                  <div className="modal-body py-4">
                    <form onSubmit={handleSaveEdit}>
                      {/* Fila para Costo e IVA */}
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <label className="form-label fw-bold">Costo</label>
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
                        <div className="row">
                          {/* Campo IVA */}
                          <div className="col-md-6 mb-4">
                            <label className="form-label fw-bold">IVA</label>
                            <div className="d-flex align-items-center">
                              <input
                                type="checkbox"
                                checked={selectedTrabajo.iva}
                                onChange={(e) => {
                                  const isChecked = e.target.checked;
                                  const updatedCosto = isChecked
                                    ? selectedTrabajo.costo * 1.22
                                    : selectedTrabajo.costo / 1.22;
                                  setSelectedTrabajo({
                                    ...selectedTrabajo,
                                    iva: isChecked,
                                    costo: updatedCosto.toFixed(2),
                                  });
                                }}
                              />
                              {selectedTrabajo.iva && (
                                <small className="form-text text-muted ms-2">
                                  IVA calculado: 22%
                                </small>
                              )}
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6 mb-4">
                              <label className="form-label fw-bold">
                                Entrego
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                value={selectedTrabajo.entrego}
                                onChange={(e) =>
                                  setSelectedTrabajo({
                                    ...selectedTrabajo,
                                    entrego: parseFloat(e.target.value),
                                  })
                                }
                              />
                            </div>
                            <div className="col-md-6 mb-4">
                              <label className="form-label fw-bold">
                                Deuda
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                value={selectedTrabajo.deuda}
                                readOnly
                              />
                            </div>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">
                              Estado de trabajo
                            </label>
                            <select
                              className="form-control"
                              value={selectedTrabajo.estado_contable}
                              onChange={(e) =>
                                setSelectedTrabajo({
                                  ...selectedTrabajo,
                                  estado_contable: e.target.value,
                                })
                              }
                            >
                              <option value="">Seleccionar estado</option>
                              {estados.map((estado) => (
                                <option
                                  key={estado.id_estado_contable}
                                  value={estado.id_estado_contable}
                                >
                                  {estado.tipo_estado_contable}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
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

export default ContAmoj;
