import React from 'react';
import { Link } from 'react-router-dom';

const MenuAgrTr= () => {
  return (
    <div
      className="menu"
      style={{
        position: "absolute",
        top: "70px",  // Ajusta la posición para que aparezca debajo del ícono
        right: "0",   // Se alinea a la derecha del contenedor
        backgroundColor: "#fff",  // Fondo blanco
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",  // Sombra sutil para dar efecto flotante
        borderRadius: "8px",  // Bordes redondeados
        padding: "10px",  // Espaciado alrededor del contenido
        zIndex: "1000",  // Asegura que se quede encima de otros elementos
      }}
    >
      <ul
        className="navbar-nav"
        style={{
          listStyleType: "none",  // Elimina los puntos de la lista
          padding: "0",
          margin: "0",
        }}
      >
        <li className="nav-item" style={{ marginBottom: "10px" }}>
          <Link
            to="/arroz-topografia"
            className="btn btn-outline-secondary"
            style={{
              display: "block",  // Hace que el enlace ocupe todo el espacio disponible
              padding: "10px",  // Espaciado alrededor del texto
              border: "none", // Bordes redondeados
              textDecoration: "none",  // Elimina el subrayado
              color: "#333",  // Color de texto
              width: "100%",  // Hace que el enlace ocupe todo el ancho
              textAlign: "center",  // Centra el texto
            }}
          >
            Progreso
          </Link>
        </li>

        <li className="nav-item" style={{ marginBottom: "10px" }}>
          <Link
            to="/edicion-AgrTr"
            className="btn btn-outline-secondary"
            style={{
              display: "block",  // Hace que el enlace ocupe todo el espacio disponible
              padding: "10px",  // Espaciado alrededor del texto
              border: "none", // Bordes redondeados
              textDecoration: "none",  // Elimina el subrayado
              color: "#333",  // Color de texto
              width: "100%",  // Hace que el enlace ocupe todo el ancho
              textAlign: "center",  // Centra el texto
            }}
          >
            Editar datos
          </Link>
        </li>

        <li className="nav-item" style={{ marginBottom: "10px" }}>
          <Link
            to="/resumen-AgrTr"
            className="btn btn-outline-secondary"
            style={{
              display: "block",  // Hace que el enlace ocupe todo el espacio disponible
              padding: "10px",  // Espaciado alrededor del texto
              border: "none", // Bordes redondeados
              textDecoration: "none",  // Elimina el subrayado
              color: "#333",  // Color de texto
              width: "100%",  // Hace que el enlace ocupe todo el ancho
              textAlign: "center",  // Centra el texto
            }}
          >
            Resumen 
          </Link>
        </li>


        <li className="nav-item" style={{ marginBottom: "10px" }}>
          <Link
            to="/home"
            className="btn btn-outline-secondary"
            style={{
              display: "block",  // Hace que el enlace ocupe todo el espacio disponible
              padding: "10px",  // Espaciado alrededor del texto
              border: "none", // Bordes redondeados
              textDecoration: "none",  // Elimina el subrayado
              color: "#333",  // Color de texto
              width: "100%",  // Hace que el enlace ocupe todo el ancho
              textAlign: "center",  // Centra el texto
            }}
          >
            Menú principal
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MenuAgrTr;
