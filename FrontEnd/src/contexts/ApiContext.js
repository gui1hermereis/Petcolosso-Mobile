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

    const postLogin = async (username, password) => {
        try {
            const response = await api.post("/login", { username, password });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "Erro ao acessar servidor");
        }
    };

    const postEnviarCodigo = async (email) => {
        try {
            const response = await api.post("/enviarCodigo", { email });
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || "Erro ao acessar servidor";
            throw new Error(message);
        }
    };

    const postValidarCodigo = async (email, codigo) => {
        try {
            const response = await api.post("/validarCodigo", { email, codigo });
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || "Erro ao acessar servidor";
            throw new Error(message);
        }
    };

    return (
        <ApiContext.Provider
            value={{
                postEnviarCodigo,
                postValidarCodigo,
                postLogin,
            }}
        >
            {children}
        </ApiContext.Provider>
    );
};

export const useApi = () => useContext(ApiContext);
