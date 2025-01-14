import React, {useState, useEffect} from "react";
import MenuAmojs from './MenuAgrTr';

const ResumenAgrTr = () => {
  const [trabajos, setTrabajos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [clientes, setClientes] = useState([]);
  const [estados, setEstados] = useState([]);
  
  const apiUrl = process.env.BACKEND_URL || 'https://app-agenda-sdc-backend.onrender.com';
  
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
          width: "100%",  // Esto asegura que el contenedor ocupe todo el ancho disponible en pantalla.
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
            Agrimensura Tramites - Resumen de datos
          </h1>
            <button className="me-3" style={{background: "transparent", border: "none"}}
            onClick={toggleMenu}
            >          
              <i className="fas fa-bars" style={{ fontSize: "30px",}}
          ></i></button>
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
                    Costo
                  </th>
                  <th className="bg-light text-dark" style={{ width: "300px" }}>
                    Estado del trabajo
                  </th>
                </tr>
              </thead>
              <tbody>
                {trabajos.filter((trabajo) => trabajo.tipo_de_trabajo === 3).map((trabajo, index) => {
                    const cliente = clientes.find(
                      (cl) => cl.id === trabajo.cliente_id
                    );
                    const estado = estados.find(
                      (est) => est.id_estado === trabajo.estado_trabajo
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
                          {cliente ? cliente.nombre + " " + cliente.apellido : "Cliente no encontrado"}
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


export default ResumenAgrTr;
