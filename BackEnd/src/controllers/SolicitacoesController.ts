import axios from "axios";
import { Request, Response } from "express";
import { SolicitacoesService } from "../service/SolicitacoesService";

const SolicitacoesController = {
    listaSolicitacoesAtivas: async (request: Request, response: Response) => {
        try {
            const result = await SolicitacoesService.listaSolicitacoesAtivas();
            if (result) return response.status(200).json(result);
            else return response.status(400).json({ message: "Erro ao listar Solicitações Ativas." });
        } catch (err) {
            return response.status(400).json({ message: "Erro ao listar Solicitações Ativas." });
        }
    },

    listaSolicitacoesConcluidas: async (request: Request, response: Response) => {
        try {
            const result = await SolicitacoesService.listaSolicitacoesConcluidas();
            if (result) return response.status(200).json(result);
            else return response.status(400).json({ message: "Erro ao listar Solicitações Concluidas." });
        } catch (err) {
            return response.status(400).json({ message: "Erro ao listar Solicitações Concluidas." });
        }
    },

    insereSolicitacao: async (request: Request, response: Response) => {
        try {
            const body = request.body;
            const result = await SolicitacoesService.insereSolicitacao(body);
            if (result) {
                return response.status(200).json({ message: "Sucesso ao inserir Solicitação." });
            } else return response.status(400).json({ message: "Erro ao inserir Solicitação." });
        } catch (err) {
            return response.status(400).json({ message: "Erro ao inserir Solicitação." });
        }
    },

    atualizaSolicitacao: async (request: Request, response: Response) => {
        try {
            const body = request.body;

            const result = await SolicitacoesService.atualizaSolicitacao(body);
            if (result) {
                return response.status(200).json({ message: "Sucesso ao editar Solicitação." });
            } else return response.status(400).json({ message: "Erro ao editar Solicitação." });
        } catch (err) {
            return response.status(400).json({ message: "Erro ao editar Solicitação." });
        }
    },

    getSolicitacaoById: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const result = await SolicitacoesService.getSolicitacaoById(parseInt(id));
            if (result) return response.status(200).json(result);
            else return response.status(400).json({ message: "Erro ao encontrar Solicitação." });
        } catch (err) {
            return response.status(400).json({ message: "Erro ao encontrar Solicitação." });
        }
    },

    concluiSolicitacao: async (request: Request, response: Response) => {
        try {
            const id = parseInt(request.params.id);
            const result = await SolicitacoesService.concluiSolicitacao(id);
            if (result) {
                return response.status(200).json({ message: "Sucesso ao conlcuir Solicitação." });
            } else return response.status(400).json({ message: "Erro ao conlcuir Solicitação." });
        } catch (err) {
            return response.status(400).json({ message: "Erro ao conlcuir Solicitação." });
        }
    },
};

export { SolicitacoesController };