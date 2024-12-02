import React, {useState} from "react";
import MenuAmojs from './MenuAgrTr';

const ResumenAgrTr = () => {

    // Estado para controlar la visibilidad del menú
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Función para cambiar el estado de visibilidad del menú
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };

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
            src="/images/logosdc.jpg"
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
            Resumen de datos
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
          <table className="table table-bordered table-striped text-center" style={{ width: "100%", tableLayout: "fixed" }}>
            <thead>
              <tr>
                <th className="bg-light text-dark" style={{ width: "350px" }}>Tablas editables</th>
              </tr>
            </thead>
            <tbody>
               <tr>
                    <td className="bg-danger text-white" style={{ width: "350px" }}>
                        <p>Contenido aquí</p>
                    </td>
                </tr>            
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResumenAgrTr;
