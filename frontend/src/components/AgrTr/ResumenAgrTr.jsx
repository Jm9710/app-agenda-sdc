import React, { useEffect, useState } from "react";
import MenuAmojs from "./MenuAgrTr";
import MenuAgrTr from "./MenuAgrTr";

const Amojonamientos = () => {
  const [trabajos, setTrabajos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [clientes, setClientes] = useState([]);
  const [estados, setEstados] = useState([]);

  const apiUrl = process.env.BACKEND_URL || 'https://app-agenda-sdc-backend.onrender.com';

  //const apiUrl = process.env.BACKEND_URL || 'http://127.0.0.1:3001';

  // Estado para controlar la visibilidad del menú
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Función para cambiar el estado de visibilidad del menú
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const fetchTrabajos = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/trabajos`);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();
      console.log(data); // Verifica la estructura de los trabajos
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

  useEffect(() => {
    fetchTrabajos();
    fetchClientes();
    fetchEstados();
  }, []);

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
            Agrimensura Tramites - Resumen de datos
          </h1>
          <button
            className="me-3"
            style={{ background: "transparent", border: "none" }}
            onClick={toggleMenu}
          >
            <i
              className="fas fa-bars"
              style={{
                fontSize: "30px",
              }}
            ></i>
          </button>
        </div>

        {/* Contenedor con scroll horizontal */}
        <div
          className="overflow-auto"
          style={{
            maxHeight: "75vh",
            overflowX: "auto",
            whiteSpace: "nowrap",
            paddingRight: "10px",
          }}
        >
          {isMenuOpen && <MenuAgrTr />}

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
              <thead
                style={{ position: "sticky", top: -1, backgroundColor: "#fff" }}
              >
                <tr>
                  <th className="bg-light text-dark" style={{ width: "200px" }}>
                    Numero de trabajo
                  </th>
                  <th className="bg-light text-dark" style={{ width: "300px" }}>
                    Nombre de trabajo
                  </th>
                  <th className="bg-light text-dark" style={{ width: "250px" }}>
                    Nombre de cliente
                  </th>
                  <th className="bg-light text-dark" style={{ width: "100px" }}>
                    Moneda
                  </th>
                  <th className="bg-light text-dark" style={{ width: "100px" }}>
                    Costo
                  </th>
                  <th className="bg-light text-dark" style={{ width: "300px" }}>
                    Estado del trabajo
                  </th>
                </tr>
              </thead>
              <tbody>
                {trabajos
                  .filter((trabajo) => trabajo.tipo_de_trabajo === 3)
                  .sort((a, b) => {
                    const estadoA = estados.find(
                      (est) => est.id_estado === a.estado_trabajo
                    )?.tipo_estado;
                    const estadoB = estados.find(
                      (est) => est.id_estado === b.estado_trabajo
                    )?.tipo_estado;

                    // Prioriza los estados que no son "Finalizado"
                    if (estadoA === "Finalizado" && estadoB !== "Finalizado")
                      return 1;
                    if (estadoA !== "Finalizado" && estadoB === "Finalizado")
                      return -1;

                    // Si ambos son iguales, ordena por número de trabajo
                    return a.num_trabajo - b.num_trabajo;
                  })
                  .map((trabajo, index) => {
                    const cliente = clientes.find(
                      (cl) => cl.id === trabajo.cliente_id
                    );
                    const estado = estados.find(
                      (est) => est.id_estado === trabajo.estado
                    );

                    return (
                      <tr key={`${trabajo.id}-${index}`}>
                        <td
                          className="bg-light text-dark"
                          style={{ width: "200px" }}
                        >
                          {trabajo.num_trabajo}
                        </td>
                        <td
                          className="bg-light text-dark"
                          style={{ width: "300px" }}
                        >
                          {trabajo.nombre_trabajo}
                        </td>
                        <td
                          className="bg-light text-dark"
                          style={{ width: "250px" }}
                        >
                          {cliente
                            ? cliente.nombre + " " + cliente.apellido
                            : "Cliente no encontrado"}
                        </td>
                        <td
                          className="bg-light text-dark"
                          style={{ width: "100px" }}
                        >
                          {trabajo.moneda}
                        </td>
                        <td
                          className="bg-light text-dark"
                          style={{ width: "100px" }}
                        >
                          {trabajo.costo}
                        </td>
                        <td
                          className="bg-light text-dark"
                          style={{ width: "300px" }}
                        >
                          {estado ? estado.tipo_estado : "Estado no encontrado"}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Amojonamientos;
