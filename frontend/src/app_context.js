import React, { useState, useEffect } from "react";
import getState from "./flux";

export const Context = React.createContext(null);

const injectContext = (PassedComponent) => {
    const StoreWrapper = (props) => {
        const [state, setState] = useState(
            getState({
                getStore: () => state.store,
                getActions: () => state.actions,
                setStore: (updatedStore) =>
                    setState({
                        store: { ...state.store, ...updatedStore },
                        actions: { ...state.actions },
                    }),
            })
        );

        useEffect(() => {
            const initializeApp = async () => {
                const actions = state.actions;
                if (localStorage.getItem("token")) {
                    console.log("Usuario autenticado con token almacenado");
                }
                await actions.fetchTrabajos();
            };
            initializeApp();
        }, [state.actions]);

        return (
            <Context.Provider value={state}> {/* Corrige `this.state.first` */}
                <PassedComponent {...props} />
            </Context.Provider>
        );
    };

    return StoreWrapper;
};

export default injectContext;
