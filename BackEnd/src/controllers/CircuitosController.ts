import axios from "axios";
import { Request, Response } from "express";
import { CircuitosService } from "../service/CircuitosService";

const CircuitosController = {
    listaCircuitos: async (request: Request, response: Response) => {
        try {
            const result = await CircuitosService.listaCircuitos();
            if (result) return response.status(200).json(result);
            else return response.status(400).json({ message: "Erro ao listar Circuitos." });
        } catch (err) {
            return response.status(400).json({ message: "Erro ao listar Circuitos." });
        }
    },

    insereCircuito: async (request: Request, response: Response) => {
        try {
            const body = request.body;
            const result = await CircuitosService.insereCircuito(body);
            if (result) {
                return response.status(200).json({ message: "Sucesso ao inserir Circuito." });
            } else return response.status(400).json({ message: "Erro ao inserir Circuito." });
        } catch (err) {
            return response.status(400).json({ message: "Erro ao inserir Circuito." });
        }
    },

    atualizaCircuito: async (request: Request, response: Response) => {
        try {
            const body = request.body;

            const result = await CircuitosService.atualizaCircuito(body);
            if (result) {
                return response.status(200).json({ message: "Sucesso ao editar Circuito." });
            } else return response.status(400).json({ message: "Erro ao editar Circuito." });
        } catch (err) {
            return response.status(400).json({ message: "Erro ao editar Circuito." });
        }
    },

    getCircuitoById: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const result = await CircuitosService.getCircuitoById(parseInt(id));
            if (result) return response.status(200).json(result);
            else return response.status(400).json({ message: "Erro ao encontrar Circuito." });
        } catch (err) {
            return response.status(400).json({ message: "Erro ao encontrar Circuito." });
        }
    },
};

export { CircuitosController };