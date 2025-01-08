import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ModalCliente from "./ModalCliente";
import ModalGuardarTrabajo from "./ModalGuardarTrabajo";

const AgregarTrabajos = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const [numTrabajo, setNumTrabajo] = useState("");
  const [fechaSol, setFechaSol] = useState("");
  const [nomTrabajo, setNomTrabajo] = useState("");
  const [manzana, setManzana] = useState("");
  const [solar, setSolar] = useState("");
  const [padron, setPadron] = useState("");
  const [departamento, setDepto] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [cliente, setCliente] = useState("");
  const [telefono, setTelefono] = useState("");
  const [moneda, setMoneda] = useState("");
  const [costo, setCosto] = useState("");
  const [iva, setIva] = useState(false);
  const [comentarios, setComentarios] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [planillas, setPlanillas] = useState([]);
  const [selectedPlanilla, setSelectedPlanilla] = useState("");
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/clientes");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Clientes:", data); // Verifica que los datos sean correctos
        setClientes(data);
      } catch (err) {
        console.error("Error al obtener clientes:", err);
      }
    };
    const fetchPlanillas = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/tipo_de_trabajos"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Planillas:", data);
        setPlanillas(data); // Actualiza el estado de planillas con los datos recibidos
      } catch (err) {
        console.error("Error al obtener planillas:", err); // Usa console.error para errores
      }
    };

    const fetchUltimoNumeroTrabajo = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/ultimo_numero_trabajo"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setNumTrabajo(data.ultimo_numero); // Establece el número de trabajo
      } catch (err) {
        console.error("Error al obtener el último número de trabajo:", err);
      }
    };

    fetchUltimoNumeroTrabajo();
    fetchPlanillas();
    fetchClientes();
  }, []);

  const handlePlanillasChangue = (e) => {
    setSelectedPlanilla(e.target.value);
  };

  const handleClienteChange = (e) => {
    const id = e.target.value;
    setCliente(id);

    // Cambia `id` por el atributo real del backend (por ejemplo, `id_cliente`)
    const selectedCliente = clientes.find(
      (cliente) => cliente.id === parseInt(id)
    );

    if (selectedCliente) {
      setTelefono(selectedCliente.telefono || ""); // Asigna el teléfono si se encuentra
    } else {
      console.warn("Cliente no encontrado");
      setTelefono(""); // Limpia el teléfono si no se encuentra
    }
  };

  if (error) {
    alert(error);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Verificar campos requeridos
    if (
      !numTrabajo ||
      !nomTrabajo ||
      !costo ||
      !cliente ||
      !fechaSol ||
      !selectedPlanilla
    ) {
      setError("Por favor, complete todos los campos requeridos.");
      console.log("Campos faltantes:", {
        numTrabajo,
        nomTrabajo,
        costo,
        cliente,
        fechaSol,
        selectedPlanilla,
      });
      setLoading(false);
      return;
    }

    try {
      // Asegúrate de obtener el ID de la planilla seleccionada
      const selectedTipoDeTrabajo = planillas.find(
        (planilla) => planilla.id_tipo_trabajo === parseInt(selectedPlanilla)
      );

      if (!selectedTipoDeTrabajo) {
        setError("Selecciona un tipo de trabajo válido.");
        setLoading(false);
        return;
      }

      const requestData = {
        tipo_de_trabajo: selectedTipoDeTrabajo.id_tipo_trabajo, // Aquí cambiamos para enviar el ID
        num_trabajo: numTrabajo,
        fecha_solicitud: fechaSol,
        nombre_trabajo: nomTrabajo,
        manzana,
        solar,
        padron,
        departamento,
        localidad,
        cliente_id: cliente,
        telefono_cliente: telefono,
        moneda,
        costo: iva ? parseFloat(costo) * 1.22 : parseFloat(costo),
        iva,
        comentarios,
      };

      console.log("Datos preparados para enviar:", requestData);

      const response = await fetch("http://localhost:3001/api/trabajo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Trabajo creado con éxito:", data);
        alert("Trabajo agregado con éxito");
        setFechaSol("");
        setNomTrabajo("");
        setManzana("");
        setSolar("");
        setPadron("");
        setDepto("");
        setLocalidad("");
        setCliente("");
        setTelefono("");
        setMoneda("");
        setCosto("");
        setIva(false);
        setComentarios("");
        setSelectedPlanilla("");
      } else {
        console.error("Error del servidor:", data);
        setError(data.error || "Hubo un problema al crear el trabajo");
      }
    } catch (err) {
      console.error("Error de conexión:", err);
      setError("Hubo un problema de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-success">
      <div
        className="card p-4 p-md-5 shadow-lg"
        style={{
          maxWidth: "800px",
          width: "100%",
          height: "90vh",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        <div className="d-flex justify-content-between mb-3">
          <Link to="/home" className="btn btn-outline-secondary">
            Volver
          </Link>
          <h3 className="text-center flex-grow-1">Agregar Trabajo</h3>
          <button
            type="button"
            className="btn btn-outline-secondary"
            data-bs-toggle="modal"
            data-bs-target="#modalAgregarCliente"
            onClick={handleOpenModal}
          >
            Agregar Cliente
          </button>
        </div>

        <div
          style={{
            overflowY: "auto",
            maxHeight: "75vh",
            paddingRight: "10px",
          }}
        >
          <div className="mb-3">
            <label htmlFor="planilla" className="form-label">
              Selección de planilla
            </label>
            <select
              id="planilla"
              className="form-select"
              value={selectedPlanilla} // Establece el valor del select como la planilla seleccionada
              onChange={handlePlanillasChangue} // Llama a la función cuando el usuario cambia la selección
            >
              <option value="">Selecciona una planilla</option>
              {planillas.map((planilla) => (
                <option
                  key={planilla.id_tipo_trabajo}
                  value={planilla.id_tipo_trabajo}
                >
                  {planilla.nombre_tipo_trabajo}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="numTrabajo" className="form-label">
              Número de Trabajo
            </label>
            <input
              type="text"
              id="numTrabajo"
              className="form-control"
              value={numTrabajo} // Asocia el valor al estado numTrabajo
              readOnly // Evita que el usuario edite el número
            />
          </div>

          <div className="mb-3">
            <label htmlFor="fechaSol" className="form-label">
              Fecha de Solicitud
            </label>
            <input
              type="date"
              id="fechaSol"
              className="form-control"
              value={fechaSol}
              onChange={(e) => setFechaSol(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="nomTrabajo" className="form-label">
              Nombre del Trabajo
            </label>
            <input
              type="text"
              id="nomTrabajo"
              className="form-control"
              value={nomTrabajo}
              onChange={(e) => setNomTrabajo(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="manzana" className="form-label">
              Manzana
            </label>
            <input
              type="text"
              id="manzana"
              className="form-control"
              value={manzana}
              onChange={(e) => setManzana(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="solar" className="form-label">
              Solar
            </label>
            <input
              type="text"
              id="solar"
              className="form-control"
              value={solar}
              onChange={(e) => setSolar(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="padron" className="form-label">
              Padrón
            </label>
            <input
              type="text"
              id="padron"
              className="form-control"
              value={padron}
              onChange={(e) => setPadron(e.target.value)}
            />
          </div>

          <div className="row mb-3">
            <label htmlFor="departamento" className="form-label">
              Selecciona el departamento
            </label>
            <select
              id="departamento"
              className="form-select"
              value={departamento}
              onChange={(e) => setDepto(e.target.value)}
            >
              <option>Seleccione un departamento</option>
              <option value={"Rocha"}>Rocha</option>
              <option value={"Artigas"}>Artigas</option>
              <option value={"Canelones"}>Canelones</option>
              <option value={"Cerro Largo"}>Cerro Largo</option>
              <option value={"Colonia"}>Colonia</option>
              <option value={"Durazno"}>Durazno</option>
              <option value={"Flores"}>Flores</option>
              <option value={"Florida"}>Florida</option>
              <option value={"Lavalleja"}>Lavalleja</option>
              <option value={"Maldonado"}>Maldonado</option>
              <option value={"Montevideo"}>Montevideo</option>
              <option value={"Paysandu"}>Paysandu</option>
              <option value={"Rio Negro"}>Rio Negro</option>
              <option value={"Rivera"}>Rivera</option>
              <option value={"Salto"}>Salto</option>
              <option value={"San Jose"}>San Jose</option>
              <option value={"Soriano"}>Soriano</option>
              <option value={"Tacuarembo"}>Tacuarembo</option>
              <option value={"Treinta y Tres"}>Treinta y Tres</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="localidad" className="form-label">
              Localidad
            </label>
            <input
              type="text"
              id="localidad"
              className="form-control"
              value={localidad}
              onChange={(e) => setLocalidad(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="cliente" className="form-label">
              Cliente
            </label>
            <select
              id="cliente"
              className="form-select"
              value={cliente}
              onChange={handleClienteChange}
            >
              <option value="">Selecciona un cliente</option>
              {clientes.map((clienteItem) => (
                <option key={clienteItem.id} value={clienteItem.id}>
                  {clienteItem.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="telefono" className="form-label">
              Teléfono del Cliente
            </label>
            <input
              type="text"
              id="telefono"
              className="form-control"
              value={telefono || ""} // Aseguramos que se muestra como una cadena
              disabled
            />
          </div>

          <div className="row mb-3">
            <label htmlFor="moneda" className="form-label">
              Selecciona la moneda
            </label>
            <select
              id="moneda"
              className="form-select"
              value={moneda}
              onChange={(e) => setMoneda(e.target.value)}
            >
              <option>Seleccione una moneda</option>
              <option value={"USD"}>USD</option>
              <option value={"UYU"}>UYU</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="costo" className="form-label">
              Costo
            </label>
            <input
              type="number"
              id="costo"
              className="form-control"
              value={costo}
              onChange={(e) => setCosto(e.target.value)}
            />
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              id="iva"
              className="form-check-input"
              checked={iva}
              onChange={(e) => setIva(e.target.checked)}
            />
            <label htmlFor="iva" className="form-check-label">
              Incluir IVA
            </label>
          </div>

          <div className="mb-3">
            <label htmlFor="comentarios" className="form-label">
              Comentarios
            </label>
            <textarea
              id="comentarios"
              className="form-control"
              value={comentarios}
              onChange={(e) => setComentarios(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className="footer">
          <button
            type="submit"
            className="btn btn-success"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "Guardando..." : "Guardar Trabajo"}
          </button>
        </div>
      </div>

      <ModalCliente isOpen={isModalOpen} onClose={handleCloseModal} />
      <ModalGuardarTrabajo isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default AgregarTrabajos;
