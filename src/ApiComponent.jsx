import React, { useEffect, useState } from "react";
import axios from "axios";

const ApiComponent = () => {
    const [data, setData] = useState(null);
    const [postResponse, setPostResponse] = useState(null);

    // GET request para obtener datos del backend
    useEffect(() => {
        axios
            .get("http://127.0.0.1:5000/api/data")
            .then((response) => setData(response.data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    // POST request para enviar datos al backend
    const sendData = () => {
        axios
            .post("http://127.0.0.1:5000/api/data", { name: "React User" })
            .then((response) => setPostResponse(response.data))
            .catch((error) => console.error("Error sending data:", error));
    };

    return (
        <div>
            <h1>Conexión React - Flask</h1>
            {data ? (
                <div>
                    <h2>Mensaje del backend:</h2>
                    <p>{data.message}</p>
                </div>
            ) : (
                <p>Cargando datos...</p>
            )}
            <button onClick={sendData}>Enviar Datos al Backend</button>
            {postResponse && (
                <div>
                    <h2>Respuesta del Backend:</h2>
                    <pre>{JSON.stringify(postResponse, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default ApiComponent;
