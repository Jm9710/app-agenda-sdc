const getState = (helpers) => {
  const { getStore, setStore } = helpers; // Extraemos getStore y setStore del objeto helpers.

  return {
    store: {
      clientes: [],
      trabajos: [],
      estados: [],
      tipoDeTrabajo: [],
      mensaje: "",
      usuario: null,
      token: localStorage.getItem("token") || null,
    },

    actions: {
      login: async (nombre, contrasena) => {
        try {
          const resp = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, contrasena }),
          });

          if (!resp.ok) {
            const error = await resp.json();
            console.error("Error al iniciar sesión:", error.Error);
            return false;
          }

          const data = await resp.json();
          setStore({ usuario: data.usuario, token: data.token });
          localStorage.setItem("token", data.token);
          console.log("Inicio de sesión exitoso");
          return true;
        } catch (error) {
          console.error("Error en la conexión al servidor:", error);
          return false;
        }
      },

      isAuthenticated: () => {
        const store = getStore();
        return store.token !== null;
      },

      logout: () => {
        setStore({ usuario: null, token: null });
        localStorage.removeItem("token");
        console.log("Sesión cerrada exitosamente");
      },
      obtenerClientes: async () => {
        try {
          const resp = await fetch("/api/clientes");
          if (resp.ok) {
            const data = await resp.json();
            setStore({ clientes: data });
          } else {
            console.error("Error al obtener clientes");
          }
        } catch (error) {
          console.error("Error al obtener clientes:", error);
        }
      },
      agregarCliente: async (nuevoCliente) => {
        try {
          const user_id = getStore().usuario.id_us; // Asegúrate de que el usuario actual esté disponible

          const resp = await fetch("/api/clientes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...nuevoCliente, // Asegúrate de incluir todos los datos del cliente
              user_id: user_id, // Agregar el id del usuario que está creando el cliente
            }),
          });

          if (resp.ok) {
            const data = await resp.json();
            setStore({
              clientes: [...getStore().clientes, data],
              mensaje: "Cliente agregado exitosamente",
            });
          } else {
            const errorData = await resp.json();
            console.error("Error al agregar cliente:", errorData);
          }
        } catch (error) {
          console.error("Error al agregar cliente:", error);
        }
      },

      eliminarCliente: async (id) => {
        try {
          const resp = await fetch(`/api/clientes/${id}`, { method: "DELETE" });
          if (resp.ok) {
            setStore({
              clientes: getStore().clientes.filter(
                (cliente) => cliente.id_cliente !== id
              ),
              mensaje: "Cliente eliminado",
            });
          } else {
            console.error("Error al eliminar cliente");
          }
        } catch (error) {
          console.error("Error al eliminar cliente:", error);
        }
      },
      fetchTipoDeTrabajos: async () => {
        try {
          const resp = await fetch("/api/tipoDeTrabajo", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
          if (!resp.ok) {
            console.error("Error al obtener tipos de trabajo");
            return;
          }

          const data = await resp.json();
          setStore({ tipoDeTrabajo: data });
          console.log("Tipos de trabajos carhgador exitosamente");
        } catch (error) {
          console.error("Error en la conezion al servidor:", error);
        }
      },

      // Obtener estados de trabajo
      fetchEstados: async () => {
        try {
          const resp = await fetch("/api/estados", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });

          if (!resp.ok) {
            console.error("Error al obtener estados");
            return;
          }

          const data = await resp.json();
          setStore({ estados: data });
          console.log("Estados cargados exitosamente");
        } catch (error) {
          console.error("Error en la conexión al servidor:", error);
        }
      },

      fetchTrabajos: async () => {
        const store = getStore();
        if (!store.token) {
          console.error("No se puede acceder a los trabajos sin autenticación");
          return;
        }

        try {
          const resp = await fetch("/api/trabajos", {
            method: "GET",
            headers: { Authorization: `Bearer ${store.token}` },
          });

          if (!resp.ok) {
            console.error("Error al obtener trabajos");
            return;
          }

          const data = await resp.json();
          setStore({ trabajos: data });
          console.log("Trabajos obtenidos exitosamente");
        } catch (error) {
          console.error("Error en la conexión al servidor:", error);
        }
      },
      agregarTrabajo: async (nuevoTrabajo) => {
        const store = getStore();
        if (!store.token) {
          console.error("No se puede crear un trabajo sin autenticación");
          return;
        }

        try {
          const resp = await fetch("/api/trabajos", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${store.token}`,
            },
            body: JSON.stringify(nuevoTrabajo),
          });

          if (!resp.ok) {
            console.error("Error al agregar trabajo");
            return;
          }

          const data = await resp.json();
          setStore({
            trabajos: [...store.trabajos, data],
            mensaje: "Trabajo agregado exitosamente",
          });
          console.log("Trabajo agregado exitosamente");
        } catch (error) {
          console.error("Error en la conexión al servidor:", error);
        }
      },

      editarTrabajo: async (id, trabajoEditado) => {
        const store = getStore();
        if (!store.token) {
          console.error("No se puede editar un trabajo sin autenticacion");
          return;
        }

        try {
          const resp = await fetch(`/api/trabajos/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${store.token}`,
            },
            body: JSON.stringify(trabajoEditado)
          });

          if (!resp.ok) {
            console.error("Error al editar el trabajo");
            return
          }

          const data = await resp.json();
          setStore({
            trabajos: store.trabajos.map((trabajo) =>
              trabajo.id_trabajo === id ? data : trabajo
            ),
            mensaje: "Trabajo editado exitosamente",
          });
          console.log("Trabajo editado exitosamente");
        } catch (error) {
          console.error("Error en la conexion al servidor:", error);
        }
      },

      eliminarTrabajo: async (id) => {
        const store = getStore();
        if (!store.token) {
          console.error("No se puede eliminar un trabajo sin autenticacion");
          return;
        }

        try {
          const resp = await fetch(`/api/trabajos/${id}`,{
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${store.token}`,
            },
          });

          if (!resp.ok) {
            console.error("Error al eliminar un trabajo");
            return;
          }
          setStore({
            trabajos: store.trabajos.filter(
              (trabajo) => trabajo.id_trabajo !== id
            ),
            mensaje: "Trabajo eliminado exitosamente",
          });
          console.log("Trabajo Eliminado exitosamente");
        } catch (error) {
          console.error("Error en la conexion al servidor:", error);
        }
      },

      filterTrabajoPorTipo: (tipoId) => {
        const store = getStore();
        const trabajosFiltrados = store.trabajos.filter(
          (trabajo) => trabajo.tipoDeTrabajo === tipoId
        );

        setStore({ trabajos: trabajosFiltrados });
      },

      // Filtrar trabajos por estado
      filterTrabajosPorEstado: (estadoId) => {
        const store = getStore();
        const trabajosFiltrados = store.trabajos.filter(
          (trabajo) => trabajo.estado_trabajo === estadoId
        );
        setStore({ trabajos: trabajosFiltrados });
      },
    },
  };
};

export default getState;
