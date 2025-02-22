import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Amojonamientos = () => {
  const [trabajos, setTrabajos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedState, setExpandedState] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const apiUrl = process.env.BACKEND_URL || 'https://app-agenda-sdc-backend.onrender.com';

  //const apiUrl = process.env.BACKEND_URL || 'http://127.0.0.1:3001';

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/clientes`);
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        const data = await response.json();
        console.log("Clientes:", data); // Registro de depuración
        setClientes(data);
      } catch (err) {
        setError(`Error fetching clients: ${err.message}`);
      }
    };

    const fetchTrabajos = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/trabajos`);
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        const data = await response.json();
        console.log("Trabajos:", data); // Registro de depuración
        setTrabajos(data.filter((trabajo) => trabajo.tipo_de_trabajo === 3));
        setLoading(false);
      } catch (err) {
        setError(`Error fetching jobs: ${err.message}`);
        setLoading(false);
      }
    };

    fetchTrabajos();
    fetchClientes();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  const obtenerNombreCliente = (clienteId) => {
    const cliente = clientes.find((cl) => cl.id === clienteId);
    return cliente ? `${cliente.nombre} ${cliente.apellido}` : "Desconocido";
  };

  const estadoColores = {
    1: "bg-danger text-white border-white", // Por hacer
    2: "bg-warning text-dark", // En progreso
    3: "bg-info text-dark", // Finalizado
    4: "bg-success text-white", // Para facturar
    5: "bg-primary text-white", // Facturado
    6: "bg-secondary text-white", // Cobrado
    7: "bg-dark text-white", // Cobrado y Facturado
  };

  const contarTrabajosPorEstado = (estadoId) => {
    return trabajos.filter((trabajo) => trabajo.estado === estadoId).length;
  };

  const contarTrabajosPorEstadoContable = (estadoContableId) => {
    return trabajos.filter((trabajo) => trabajo.estado_contable === estadoContableId).length;
  };

  const renderTrabajosPorEstado = (estadoId) => {
    const trabajosFiltrados = trabajos
      .filter((trabajo) => trabajo.estado === estadoId)
      .sort((a, b) => b.num_trabajo - a.num_trabajo);

    console.log(`Trabajos filtrados para estado ${estadoId}:`, trabajosFiltrados); // Registro de depuración

    const estadoNombre =
      estadoId === 1
        ? "Por hacer"
        : estadoId === 2
        ? "En progreso"
        : "Finalizado";

    return isMobile ? (
      <div className={`mb-3 p-2 rounded ${estadoColores[estadoId]}`}>
        <button
          className={`btn w-100 ${estadoColores[estadoId]}`}
          style={{ border: "none", fontSize: "20px" }}
          onClick={() =>
            setExpandedState(expandedState === `${estadoId}` ? null : `${estadoId}`)
          }
        >
          {estadoNombre}
        </button>
        {expandedState === `${estadoId}` && (
          <div className="mt-2 p-2">
            {trabajosFiltrados.map((trabajo) => (
              <p key={trabajo.id_trabajo}>
                {trabajo.num_trabajo} - {trabajo.localidad} -{" "}
                {trabajo.nombre_trabajo} -{" "}
                <strong>{obtenerNombreCliente(trabajo.cliente_id)}</strong> -{" "}
                {trabajo.telefono_cliente}
              </p>
            ))}
          </div>
        )}
      </div>
    ) : (
      <td className={estadoColores[estadoId]}>
        {trabajosFiltrados.map((trabajo) => (
          <p key={trabajo.id_trabajo}>
            {trabajo.num_trabajo} - {trabajo.localidad} -{" "}
            {trabajo.nombre_trabajo} -{" "}
            <strong>{obtenerNombreCliente(trabajo.cliente_id)}</strong> -{" "}
            {trabajo.telefono_cliente}
          </p>
        ))}
      </td>
    );
  };

  const renderTrabajosPorEstadoContable = (estadoContableId) => {
    const trabajosFiltrados = trabajos
      .filter((trabajo) => trabajo.estado_contable === estadoContableId)
      .sort((a, b) => b.num_trabajo - a.num_trabajo);

    console.log(`Trabajos filtrados para estado contable ${estadoContableId}:`, trabajosFiltrados); // Registro de depuración

    const estadoContableNombre =
      estadoContableId === 1
        ? "Por cobrar"
        : estadoContableId === 2
        ? "Para facturar"
        : estadoContableId === 3
        ? "Facturado"
        : estadoContableId === 4
        ? "Cobrado"
        : "Cobrado y Facturado";

    return isMobile ? (
      <div className={`mb-3 p-2 rounded ${estadoColores[estadoContableId]}`}>
        <button
          className={`btn w-100 ${estadoColores[estadoContableId]}`}
          style={{ border: "none", fontSize: "20px" }}
          onClick={() =>
            setExpandedState(expandedState === `${estadoContableId}` ? null : `${estadoContableId}`)
          }
        >
          {estadoContableNombre}
        </button>
        {expandedState === `${estadoContableId}` && (
          <div className="mt-2 p-2">
            {trabajosFiltrados.map((trabajo) => (
              <p key={trabajo.id_trabajo}>
                {trabajo.num_trabajo} - {trabajo.localidad} -{" "}
                {trabajo.nombre_trabajo} -{" "}
                <strong>{obtenerNombreCliente(trabajo.cliente_id)}</strong> -{" "}
                {trabajo.telefono_cliente}
              </p>
            ))}
          </div>
        )}
      </div>
    ) : (
      <td className={estadoColores[estadoContableId]}>
        {trabajosFiltrados.map((trabajo) => (
          <p key={trabajo.id_trabajo}>
            {trabajo.num_trabajo} - {trabajo.localidad} -{" "}
            {trabajo.nombre_trabajo} -{" "}
            <strong>{obtenerNombreCliente(trabajo.cliente_id)}</strong> -{" "}
            {trabajo.telefono_cliente}
          </p>
        ))}
      </td>
    );
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-success">
      <div
        className="card p-4 p-md-2 shadow-lg text-center"
        style={{
          width: "100%",
          height: "90vh",
          maxWidth: "95%",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <img
            src="/images/logosdc.png"
            alt="Logo SDC"
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          />
          <h1
            className="flex-grow-1 text-black text-center m-0"
            style={{ fontSize: "24px" }}
          >
            Agrimensura tramites - Progreso General
          </h1>

          <div className="d-flex justify-content-end">
            <Link
              to="/home-progreso"
              className="btn btn-outline-dark fw-bolder p-2"
            >
              Volver
            </Link>
          </div>
                  <div className="d-flex justify-content-end">
                    <Link to="/contabilidad-tramites" className="btn btn-outline-dark fw-bolder p-2">
                      Ir a contabilidad
                    </Link>
                  </div>
        </div>
        <div
          className="overflow-auto"
          style={{ maxHeight: "75vh", paddingRight: "10px" }}
        >
          {isMobile ? (
            <div>
              {renderTrabajosPorEstado(1)}
              {renderTrabajosPorEstado(2)}
              {renderTrabajosPorEstado(3)}
              {renderTrabajosPorEstadoContable(1)}
              {renderTrabajosPorEstadoContable(2)}
              {renderTrabajosPorEstadoContable(3)}
              {renderTrabajosPorEstadoContable(4)}
              {renderTrabajosPorEstadoContable(5)}
            </div>
          ) : (
            <table
              className="table table-bordered text-center"
              style={{ width: "100%", tableLayout: "auto" }}
            >
              <thead
                style={{ position: "sticky", top: -1, backgroundColor: "#fff" }}
              >
                <tr>
                  <th className="bg-light text-dark">Por hacer ({contarTrabajosPorEstado(1)})</th>
                  <th className="bg-light text-dark">En progreso ({contarTrabajosPorEstado(2)})</th>
                  <th className="bg-light text-dark">Finalizado ({contarTrabajosPorEstado(3)})</th>
                  <th className="bg-light text-dark">Por cobrar ({contarTrabajosPorEstadoContable(1)})</th>
                  <th className="bg-light text-dark">Para facturar ({contarTrabajosPorEstadoContable(2)})</th>
                  <th className="bg-light text-dark">Facturado ({contarTrabajosPorEstadoContable(3)})</th>
                  <th className="bg-light text-dark">Cobrado ({contarTrabajosPorEstadoContable(4)})</th>
                  <th className="bg-light text-dark">Cobrado y Facturado ({contarTrabajosPorEstadoContable(5)})</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {renderTrabajosPorEstado(1)}
                  {renderTrabajosPorEstado(2)}
                  {renderTrabajosPorEstado(3)}
                  {renderTrabajosPorEstadoContable(1)}
                  {renderTrabajosPorEstadoContable(2)}
                  {renderTrabajosPorEstadoContable(3)}
                  {renderTrabajosPorEstadoContable(4)}
                  {renderTrabajosPorEstadoContable(5)}
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Amojonamientos;