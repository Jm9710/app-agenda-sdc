const getState = ({ getStore, setAction, getStore}) => ({
    store: {
        clientes:[],
        trabajos:[],
        estados:[],
        tipoDeTrabajo:[],
        mensaje: "",
        usuario: null, 
        token: localStorage.getItem("Token") || null
    },

    actions: {
        //LoginUsuario
        login: async (nombre, contrasena) => {
            try {
                const resp = await fetch("/api/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        nombre: nombre,
                        contrasena: contrasena, 
                    }),
                });

                if (!resp.ok) {
                    const error = await resp.json();
                    console.error("Error al inicar sesion:", error.Error);
                    return false;
                }
                const data = await resp.json();

                setStore({
                    usuario: data.usuario,
                    token: data.token,
                });
                localStorage.setItem("token", data.token);
                console.log("Inicio de sesion exitoso");
                return true;
            } catch (error){
                console.error("Error en la conexion al servidor:", error);
                return false
            }
        },
        
        //Clientes
        obtenerClientes: async () => {
            try {
                const resp = await fetch("/api/clientes");
            }
            catch{
                console.error("Error al obtener clientes:", error);
            }
        },
        agregarCliente: async (nuevoCliente) => {
            try {
                const resp = await fetch("/api/cliente",{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(nuevoCliente)
                });
                const data = await resp.json();
                setStore({
                    clientes: [...getStore().clientes, data],
                    mensaje: "Cliente agregado exitosamente"
                });
            } catch (error) {
                console.error("Error al agregar cliente:", error)
            }
        },
        eliminarCliente: async (id) => {
            try {
                const resp = await fetch(`/api/clientes/${id}`,{
                    method: "DELETE"
                });
                if (resp.ok) {
                    setStore({
                        clientes: getStore().clientes.filter(cliente => cliente.id_cliente !== id),
                        mensaje: "Cliente eliminado"
                    });
                }
            } catch (error) {
                console.error("Error al eliminar cliente:", error);
            }
        },
        // Trabajos
        obtenerTrabajos: async (nuevoTrabajo) => {
            try {
                const resp = await fetch("/api/trabajos", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(nuevoTrabajo)
                });
                const data = await resp.json();
                setStore({
                    trabajos: [...getStore().trabajos, data],
                    mensaje: "Trabajo agregado exitosamente"
                });
            }catch (error) {
                console.error("Error al agregar trabajo:", error);
            }
        },
        actualizarTrabajo: async (id, datosActualizados) => {
            try{
                const resp = await fetch(`/api/trabajos/${id}`,{
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(datosActualizados)
                });
                const data = await resp.json();
                const trabajosActualizados = getStore().trabajos.map(trabajo =>
                    trabajo.id_trabajo === id ? data : trabajo
                );
                setStore({ trabajos: trabajosActualizados, mensaje: "Trabajo actualizado" });
            }catch (error) {
                console.error("Error al actualizar trabajo:", error)
            }
        },
        eliminarTrabajo: async (id) => {
            try {
                const resp = await fetch(`/api/trabajos/${id}`, {
                    method: "DELETE"
                });
                if(resp.ok){
                    setStore({
                        trabajos: getStore().trabajos.filter(trabajo => trabajo.id_trabajo !== id),
                        mensaje: "Trabajo eliminado"
                    });
                }
            }catch (error) {
                console.error("Errir al elimiinar trabajo:", error);
            }
        },

        // Estados y tipos de trabajo
        obtenerEstados: async () => {
            try {
                const resp = await fetch("/api/estados");
                const data = await resp.json();
                setStore({ estados: data });
            }catch (error){
                console.error("Error al obtener estados:", error);
            }
        },
        obtenerTipoDeTrabajo: async () => {
            try{
                const resp = await fetch("/api/tipo_de_trabajos");
                const data = await resp.json();
                setStore({ tipoDeTrabajo: data });
            }catch (error) {
                console.error("Error al obtener tipo de trabajo:", error)
            }
        }
    }
});

export default getState;