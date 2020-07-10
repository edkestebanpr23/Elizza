import React, { useReducer, useEffect } from "react";
import ClientReducer from "./clientReducer";
import ClientContext from "./clientContext";
import { SET_CLIENTS } from "../types";
import { useQuery } from "@apollo/client";
import { GET_CUSTOMERS } from "../../graphql/petitions";

const ClientState = props => {
    console.log('Hola desde el cliente state');
    // Creando un state inicial
    const initialState = {
        clients: []
    };

    useEffect (() => {
        loadClients();
    }, []);

    // useReducer con dispatch para ejecutar las funciones
    const [state, dispatch] = useReducer(ClientReducer, initialState);

    


    const setClient = clients => {
        dispatch({
            type: SET_CLIENTS,
            payload: clients
        })
    };

    async function loadClients () {
        const { data, loading, error } = useQuery(GET_CUSTOMERS);
        console.log('State Cliente');
        console.log(data);
        console.log(loading);
        console.log(error);
        if (data) {
            setClient(data.getClients);
        }
    }

    

    return (
        <ClientContext.Provider
            value={{
                clients: state.clients
            }}
        >
            {props.children}
        </ClientContext.Provider>
    );
};

export default ClientState;