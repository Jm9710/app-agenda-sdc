import React, { useState, useEffect } from "react";
import MenuAmojs from "./MenuTopo";

const ArrozTopo = () => {
  const [trabajos, setTrabajos] = useState([]);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState(null);
  const [clientes, setClientes] = useState([]);
  const [clientesMap, setClientesMap] = useState({});
  const apiUrl =
    process.env.BACKEND_URL || "https://app-agenda-sdc-backend.onrender.com";

  // Estado para controlar la visibilidad del menú
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Función para cambiar el estado de visibilidad del menú
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const fetchClientes = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/clientes`);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();
      setClientes(data); // Guardamos los clientes
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchTrabajos = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/trabajos`);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();

      // Filtrar los trabajos que tienen tipo_trabajo === 2
      const trabajosFiltrados = data.filter(
        (trabajo) => trabajo.tipo_de_trabajo === 2
      );
      setTrabajos(trabajosFiltrados);

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrabajos();
    fetchClientes();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  // Función para obtener el nombre del cliente asociado
  const obtenerNombreCliente = (clienteId) => {
    const cliente = clientes.find((cl) => cl.id === clienteId);
    if (!cliente) {
      return "Desconocido";
    }
    return `${cliente.nombre} ${cliente.apellido}`;
  };

  // Renderizar los trabajos filtrados por estado
  // Renderizar los trabajos filtrados por estado
  const renderTrabajosPorEstado = (estadoId) =>
    trabajos
      .filter((trabajo) => trabajo.estado_trabajo === estadoId)
      .sort((a, b) => b.num_trabajo - a.num_trabajo) // Orden descendente por num_trabajo
      .map((trabajo) => (
        <p key={trabajo.id_trabajo}>
          {trabajo.num_trabajo} - {trabajo.localidad} - {trabajo.nombre_trabajo}{" "}
          - <strong>{obtenerNombreCliente(trabajo.cliente_id)}</strong> -{" "}
          {trabajo.telefono_cliente}
        </p>
      ));

      
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
            Arroz Topografia - Progreso
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
          <table
            className="table table-bordered table-striped text-center"
            style={{ width: "100%", tableLayout: "auto" }}
          >
            <thead>
              <tr>
                <th className="bg-light text-dark" style={{ width: "350px" }}>
                  Por hacer
                </th>
                <th className="bg-light text-dark" style={{ width: "350px" }}>
                  En progreso
                </th>
                <th className="bg-light text-dark" style={{ width: "350px" }}>
                  Por cobrar
                </th>
                <th className="bg-light text-dark" style={{ width: "350px" }}>
                  Para facturar
                </th>
                <th className="bg-light text-dark" style={{ width: "350px" }}>
                  Facturado
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="bg-danger text-white border-white">
                  {renderTrabajosPorEstado(2)}
                </td>
                <td className="bg-warning text-dark">
                  {renderTrabajosPorEstado(3)}
                </td>
                <td className="bg-info text-dark">
                  {renderTrabajosPorEstado(4)}
                </td>
                <td className="bg-success text-white">
                  {renderTrabajosPorEstado(5)}
                </td>
                <td className="bg-primary text-white">
                  {renderTrabajosPorEstado(6)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ArrozTopo;
