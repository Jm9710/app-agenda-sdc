import React, { useState, useEffect } from "react";
import MenuTopo from "./MenuTopo";

const ArrozTopo = () => {
  const [trabajos, setTrabajos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedState, setExpandedState] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const apiUrl =
    process.env.BACKEND_URL || "https://app-agenda-sdc-backend.onrender.com";

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
        setClientes(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchTrabajos = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/trabajos`);
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        const data = await response.json();
        setTrabajos(data.filter((trabajo) => trabajo.tipo_de_trabajo === 2));
        setLoading(false);
      } catch (err) {
        setError(err.message);
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
    2: "bg-danger text-white border-white",
    3: "bg-warning text-dark",
    4: "bg-info text-dark",
    5: "bg-success text-white",
    6: "bg-primary text-white",
  };

  const renderTrabajosPorEstado = (estadoId) =>
    isMobile ? (
      <div className={`mb-3 p-2 rounded ${estadoColores[estadoId]}`}>
        <button
          className={`btn w-100 ${estadoColores[estadoId]}`} style={{ border: "none", fontSize: "20px" }}
          onClick={() =>
            setExpandedState(expandedState === estadoId ? null : estadoId)
          }
        >
          {estadoId === 2
            ? "Por hacer"
            : estadoId === 3
            ? "En progreso"
            : estadoId === 4
            ? "Por cobrar"
            : estadoId === 5
            ? "Para facturar"
            : "Facturado"}
        </button>
        {expandedState === estadoId && (
          <div className="mt-2 p-2">
            {trabajos
              .filter((trabajo) => trabajo.estado_trabajo === estadoId)
              .sort((a, b) => b.num_trabajo - a.num_trabajo)
              .map((trabajo) => (
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
        {trabajos
          .filter((trabajo) => trabajo.estado_trabajo === estadoId)
          .sort((a, b) => b.num_trabajo - a.num_trabajo)
          .map((trabajo) => (
            <p key={trabajo.id_trabajo}>
              {trabajo.num_trabajo} - {trabajo.localidad} -{" "}
              {trabajo.nombre_trabajo} -{" "}
              <strong>{obtenerNombreCliente(trabajo.cliente_id)}</strong> -{" "}
              {trabajo.telefono_cliente}
            </p>
          ))}
      </td>
    );

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
            Arroz Topografia - Progreso
          </h1>
          <button
            className="me-3"
            style={{ background: "transparent", border: "none" }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className="fas fa-bars" style={{ fontSize: "30px" }}></i>
          </button>
        </div>
        {isMenuOpen && <MenuTopo />}
        <div
          className="overflow-auto"
          style={{ maxHeight: "75vh", paddingRight: "10px" }}
        >
          {isMobile ? (
            <div>
              {renderTrabajosPorEstado(2)}
              {renderTrabajosPorEstado(3)}
              {renderTrabajosPorEstado(4)}
              {renderTrabajosPorEstado(5)}
              {renderTrabajosPorEstado(6)}
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
                  <th className="bg-light text-dark">Por hacer</th>
                  <th className="bg-light text-dark">En progreso</th>
                  <th className="bg-light text-dark">Por cobrar</th>
                  <th className="bg-light text-dark">Para facturar</th>
                  <th className="bg-light text-dark">Facturado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {renderTrabajosPorEstado(2)}
                  {renderTrabajosPorEstado(3)}
                  {renderTrabajosPorEstado(4)}
                  {renderTrabajosPorEstado(5)}
                  {renderTrabajosPorEstado(6)}
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArrozTopo;
