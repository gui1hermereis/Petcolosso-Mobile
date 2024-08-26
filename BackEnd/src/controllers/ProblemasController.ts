import axios from "axios";
import { Request, Response } from "express";
import { ProblemasService } from "../service/ProblemasService";

const ProblemasController = {
    listaDeProblemas: async (request: Request, response: Response) => {
        try {
            const result = await ProblemasService.listaDeProblemas();
            if (result) return response.status(200).json(result);
            else return response.status(400).json({ message: "Erro ao listar Problemas." });
        } catch (err) {
            return response.status(400).json({ message: "Erro ao listar Problemas." });
        }
    },

    listaDeProblemasTudoCertoSim: async (request: Request, response: Response) => {
        try {
            const result = await ProblemasService.listaDeProblemasTudoCertoSim();
            if (result) return response.status(200).json(result);
            else return response.status(400).json({ message: "Erro ao listar Problemas." });
        } catch (err) {
            return response.status(400).json({ message: "Erro ao listar Problemas." });
        }
    },

    listaDeProblemasTudoCertoNao: async (request: Request, response: Response) => {
        try {
            const result = await ProblemasService.listaDeProblemasTudoCertoNao();
            if (result) return response.status(200).json(result);
            else return response.status(400).json({ message: "Erro ao listar Problemas." });
        } catch (err) {
            return response.status(400).json({ message: "Erro ao listar Problemas." });
        }
    },

    atualizaProblema: async (request: Request, response: Response) => {
        try {
            const camera = JSON.parse(request['fields'].problemas as string);
            const files = request['files'];
            const result = await ProblemasService.atualizaProblema(camera, files);
            if (result) {
                if (result === true) response.status(200).json({ message: "Sucesso ao Editar Problema." });
                else response.status(201).json({ message: 'Erro ao Editar o Problema.' });
            } else return response.status(400).json({ message: 'Erro ao Editar o Problema.' });
        } catch (err) {
            console.log("🚀 ~ insere: ~ err:", err)
            return response.status(400).json({ message: 'Erro ao Editar o Problema.' });
        }
    },

    excluiProblema: async (request: Request, response: Response) => {
        try {
            const camera = request.body
            const result = await ProblemasService.excluiProblema(camera);
            if (result) return response.status(200).json({ message: "Sucesso ao excluir foto." });
            else return response.status(400).json({ message: "Erro ao alterar foto." });
        } catch (err) {
            return response.status(400).json({ message: "Erro ao alterar foto." });
        }
    },


    async getFoto(request: Request, response: Response) {
        try {
            const arquivo = request.params.id
            const foto = await ProblemasService.getFoto(arquivo)
            if (foto) return response.status(200).sendFile(foto);
            else return response.status(400).json({ message: "Erro ao acessar foto." });
        } catch (error) {
            return false
        }
    },

    getProblemaById: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const result = await ProblemasService.getProblemaById(parseInt(id));
            if (result) return response.status(200).json(result);
            else return response.status(400).json({ message: "Erro ao encontrar Problema." });
        } catch (err) {
            return response.status(400).json({ message: "Erro ao encontrar Problema." });
        }
    },
};

export { ProblemasController };