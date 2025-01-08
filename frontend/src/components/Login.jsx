import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import { ClipLoader } from "react-spinners"; // Importa el spinner

const Login = () => {
  // Declarar los estados de username, password, error y loading
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Para mostrar mensajes de error
  const [loading, setLoading] = useState(false); // Estado para manejar el spinner
  const navigate = useNavigate(); // Hook para navegación

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    setLoading(true); // Activar el spinner
  
    try {
      // Realiza la solicitud POST al backend para el login utilizando fetch
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Especifica el tipo de contenido
        },
        body: JSON.stringify({
          nombre: username, // Envia el nombre de usuario
          contrasena: password, // Envia la contraseña
        }),
      });
  
      const data = await response.json(); // Obtiene la respuesta del servidor
  
      if (response.ok) {
        // Si el login es exitoso, guarda el token en el localStorage
        localStorage.setItem("Token", data.token);
  
        // Redirige a la página principal
        navigate("/home"); // Cambia "/home" por la ruta de tu página principal
      } else {
        // Si hay un error (por ejemplo, credenciales incorrectas), muestra el mensaje de error
        setError(data.error || "Usuario o contraseña incorrectos");
      }
    } catch (err) {
      // Si hay un error en la conexión o en la solicitud, maneja el error
      setError("Hubo un problema al intentar conectarse al servidor");
    } finally {
      setLoading(false); // Desactivar el spinner cuando termine la solicitud
    }
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
            src="/images/logosdc.png"
            alt="Logo"
            style={{ maxWidth: "150px", width: "100%" }} // Ajusta el tamaño según necesites
          />
        </div>

        <h2 className="text-center mb-4">Iniciar Sesión</h2>

        {/* Mostrar mensaje de error si ocurre */}
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Usuario
          </label>
          <input
            type="text"
            id="username"
            className="form-control"
            placeholder="Ingrese su usuario"
            value={username} // Asocia el valor al estado username
            onChange={(e) => setUsername(e.target.value)} // Actualiza el estado de username
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
            value={password} // Asocia el valor al estado password
            onChange={(e) => setPassword(e.target.value)} // Actualiza el estado de password
          />
        </div>

        {/* Spinner de carga */}
        {loading ? (
          <div className="d-flex justify-content-center mb-3">
            <ClipLoader size={50} color="#0FA14B" />
          </div>
        ) : (
          <button type="submit" className="btn btn-success w-100">
            Ingresar
          </button>
        )}
      </form>
    </div>
  );
};

export default Login;
