import React from "react";

const Home = () => {
  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }} // Fondo blanco
    >
      <div
        className="p-4 border rounded bg-white shadow"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        {/* Logo */}
        <div className="text-center mb-4">
          <img
            src="/images/logosdc.jpg" // Asegúrate de tener este logo en la carpeta adecuada
            alt="Logo"
            style={{ maxWidth: "150px", width: "100%" }} // Ajusta el tamaño según necesites
          />
        </div>

        {/* Título o mensaje de bienvenida */}
        <h2 className="text-center mb-4">Bienvenido a la página principal</h2>
        <p className="text-center">¡Has iniciado sesión correctamente!</p>
      </div>
    </div>
  );
};

export default Home;
