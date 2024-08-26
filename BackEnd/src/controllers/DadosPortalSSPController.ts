import axios from "axios";
import { Request, Response } from "express";
import { DadosPortalSSPService } from "../service/DadosPortalSSPService";

const DadosPortalSSPController = {
    listaDados: async (request: Request, response: Response) => {
        try {
            const result = await DadosPortalSSPService.listaDados();
            if (result) return response.status(200).json(result);
            else return response.status(400).json({ message: "Erro ao listar Dados." });
        } catch (err) {
            return response.status(400).json({ message: "Erro ao listar Dados." });
        }
    },

    insereDados: async (request: Request, response: Response) => {
        try {
            const body = request.body;
            const result = await DadosPortalSSPService.insereDados(body);
            if (result) {
                return response.status(200).json({ message: "Sucesso ao inserir Dados." });
            } else return response.status(400).json({ message: "Erro ao inserir Dados." });
        } catch (err) {
            return response.status(400).json({ message: "Erro ao inserir Dados." });
        }
    },

    atualizaDados: async (request: Request, response: Response) => {
        try {
            const body = request.body;

            const result = await DadosPortalSSPService.atualizaDados(body);
            if (result) {
                return response.status(200).json({ message: "Sucesso ao editar Dados." });
            } else return response.status(400).json({ message: "Erro ao editar Dados." });
        } catch (err) {
            return response.status(400).json({ message: "Erro ao editar Dados." });
        }
    },

    getDadosById: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const result = await DadosPortalSSPService.getDadosById(parseInt(id));
            if (result) return response.status(200).json(result);
            else return response.status(400).json({ message: "Erro ao encontrar Dados." });
        } catch (err) {
            return response.status(400).json({ message: "Erro ao encontrar Dados." });
        }
    },
};

export { DadosPortalSSPController };