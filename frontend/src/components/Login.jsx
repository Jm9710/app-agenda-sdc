import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

const Login = () => {
  const navigate = useNavigate(); // Hook para navegación

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    // Aquí puedes agregar la lógica de validación de usuario/contraseña si es necesario
    // Si es correcto, rediriges a la página principal
    navigate("/home"); // Cambia "/home" por la ruta de tu página principal
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <form
        onSubmit={handleSubmit} // Maneja el envío del formulario
        className="p-4 border rounded bg-white shadow"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <div className="text-center mb-4">
          <img
            src="/images/logosdc.jpg"
            alt="Logo"
            style={{ maxWidth: "150px", width: "100%" }} // Ajusta el tamaño según necesites
          />
        </div>

        <h2 className="text-center mb-4">Iniciar Sesión</h2>

        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Usuario
          </label>
          <input
            type="text"
            id="username"
            className="form-control"
            placeholder="Ingrese su usuario"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Ingrese su contraseña"
          />
        </div>

        <button type="submit" className="btn btn-success w-100">
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default Login;
