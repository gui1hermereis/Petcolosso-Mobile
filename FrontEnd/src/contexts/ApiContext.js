import React, { createContext, useContext } from "react";
import axios from "axios";
import { ApiURL } from "../configs";

const api = axios.create({
    baseURL: ApiURL,
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
    },
});

export const ApiContext = createContext({});

export const ApiContextProvider = ({ children }) => {

    const listaServicos = async () => {
        try {
            const response = await api.get('/servicos');
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar serviços:', error);
            return null; 
        }
    }
    
    return (
        <ApiContext.Provider
            value={{
                listaServicos,
            }}
        >
            {children}
        </ApiContext.Provider>
    );
};

export const useApi = () => useContext(ApiContext);