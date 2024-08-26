import axios from "axios";
import { Request, Response } from "express";
import { GravacoesService } from "../service/GravacoesService";

const GravacoesController = {
    listaDeGravacao: async (request: Request, response: Response) => {
        try {
            const result = await GravacoesService.listaDeGravacao();
            if (result) return response.status(200).json(result);
            else return response.status(400).json({ message: "Erro ao listar Gravações." });
        } catch (err) {
            return response.status(400).json({ message: "Erro ao listar Gravações." });
        }
    },

    atualizaGravacao: async (request: Request, response: Response) => {
        try {
            const body = request.body;
            const result = await GravacoesService.atualizaGravacao(body);
            if (result) {
                return response.status(200).json({ message: "Sucesso ao atualizar Gravação." });
            } else return response.status(400).json({ message: "Erro ao atualizar Gravação." });
        } catch (err) {
            return response.status(400).json({ message: "Erro ao atualizar Gravação." });
        }
    },

    getGravacaoById: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const result = await GravacoesService.getGravacaoById(parseInt(id));
            if (result) return response.status(200).json(result);
            else return response.status(400).json({ message: "Erro ao encontrar Gravação." });
        } catch (err) {
            return response.status(400).json({ message: "Erro ao encontrar Gravação." });
        }
    },
};

export { GravacoesController };