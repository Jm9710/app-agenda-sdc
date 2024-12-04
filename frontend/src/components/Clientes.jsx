import React, {useState} from "react";
import { Link } from "react-router-dom";
import ModalCliente from './ModalCliente'

const Clientes = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

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

            <div className="d-flex justify-content-between align-items-center mb-3">
                <Link to="/home">
                <img
                    src="/images/logosdc.jpg"
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
                    Clientes
                </h1>
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    data-bs-toggle="modal"
                    data-bs-target="#modalAgregarCliente"
                >
                    Agregar Cliente
                </button> 
            </div>

            <div className="overflow-auto"
                style={{
                    maxHeight: "75vh",
                    overflowX: "auto",
                    whiteSpace: "nowrap",
                    paddingRight: "10px"
                }}
            >
                    
            <table className="table table-bordered table-striped text-center" style={{ width: "100%", tableLayout: "fixed"}}>
                <thead>
                    <tr>
                        <th className="bg-light text-dark" style={{ width: "300px"}}>Nombre</th>
                        <th className="bg-light text-dark" style={{ width: "300px"}}>Apellido</th>
                        <th className="bg-light text-dark" style={{ width: "200px"}}>Cedula</th>
                        <th className="bg-light text-dark" style={{ width: "300px"}}>Direccion</th>
                        <th className="bg-light text-dark" style={{ width: "300px"}}>Telefono</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className=" bg-light text-dark" style={{ width: "300px"}}></td>
                        <td className=" bg-light text-dark" style={{ width: "300px"}}></td>
                        <td className=" bg-light text-dark" style={{ width: "200px"}}></td>
                        <td className=" bg-light text-dark" style={{ width: "300px"}}></td>
                        <td className=" bg-light text-dark" style={{ width: "300px"}}></td>
                    </tr>
                </tbody>
            </table>                

            </div>

        </div>
        <ModalCliente isOpen={isModalOpen} onClose={handleCloseModal}/>

    </div>
  );
};

export default Clientes;
