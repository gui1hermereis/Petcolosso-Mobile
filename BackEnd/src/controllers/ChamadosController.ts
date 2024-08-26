import axios from "axios";
import { Request, Response } from "express";
import { ChamadosService } from "../service/ChamadosService";
import { getUser } from "../utils";

const ChamadosController = {
    listaChamados: async (request: Request, response: Response) => {
        try {
            const result = await ChamadosService.listaChamados();
            if (result) return response.status(200).json(result);
            else return response.status(400).json({ message: "Erro ao listar câmeras." });
        } catch (err) {
            return response.status(400).json({ message: "Erro ao listar câmeras." });
        }
    },

    listaChamadosAbertos: async (request: Request, response: Response) => {
        try {
            const result = await ChamadosService.listaChamadosAbertos();
            if (result) return response.status(200).json(result);
            else return response.status(400).json({ message: "Erro ao listar câmeras." });
        } catch (err) {
            return response.status(400).json({ message: "Erro ao listar câmeras." });
        }
    },

    listaChamadosInativos: async (request: Request, response: Response) => {
        try {
            const result = await ChamadosService.listaChamadosInativos();
            if (result) return response.status(200).json(result);
            else return response.status(400).json({ message: "Erro ao listar câmeras." });
        } catch (err) {
            return response.status(400).json({ message: "Erro ao listar câmeras." });
        }
    },

    listaChamadoSolucionados: async (request: Request, response: Response) => {
        try {
            const result = await ChamadosService.listaChamadoSolucionados();
            if (result) return response.status(200).json(result);
            else return response.status(400).json({ message: "Erro ao listar câmeras." });
        } catch (err) {
            return response.status(400).json({ message: "Erro ao listar câmeras." });
        }
    },

    listaChamadosDuplicados: async (request: Request, response: Response) => {
        try {
            const result = await ChamadosService.listaChamadosDuplicados();
            if (result) return response.status(200).json(result);
            else return response.status(400).json({ message: "Erro ao listar câmeras." });
        } catch (err) {
            return response.status(400).json({ message: "Erro ao listar câmeras." });
        }
    },

    listaChamadosRealocacoes: async (request: Request, response: Response) => {
        try {
            const result = await ChamadosService.listaChamadosRealocacoes();
            if (result) return response.status(200).json(result);
            else return response.status(400).json({ message: "Erro ao listar câmeras." });
        } catch (err) {
            return response.status(400).json({ message: "Erro ao listar câmeras." });
        }
    },

    listaChamadosRealocacoesAbertas: async (request: Request, response: Response) => {
        try {
            const result = await ChamadosService.listaChamadosRealocacoesAbertas();
            if (result) return response.status(200).json(result);
            else return response.status(400).json({ message: "Erro ao listar câmeras." });
        } catch (err) {
            return response.status(400).json({ message: "Erro ao listar câmeras." });
        }
    },

    listaChamadosRealocacoesFinalizadas: async (request: Request, response: Response) => {
        try {
            const result = await ChamadosService.listaChamadosRealocacoesFinalizadas();
            if (result) return response.status(200).json(result);
            else return response.status(400).json({ message: "Erro ao listar câmeras." });
        } catch (err) {
            return response.status(400).json({ message: "Erro ao listar câmeras." });
        }
    },

    listaChamadosPodas: async (request: Request, response: Response) => {
        try {
            const result = await ChamadosService.listaChamadosPodas();
            if (result) return response.status(200).json(result);
            else return response.status(400).json({ message: "Erro ao listar câmeras." });
        } catch (err) {
            return response.status(400).json({ message: "Erro ao listar câmeras." });
        }
    },

    listaChamadosPodasInativos: async (request: Request, response: Response) => {
        try {
            const result = await ChamadosService.listaChamadosPodasInativos();
            if (result) return response.status(200).json(result);
            else return response.status(400).json({ message: "Erro ao listar câmeras." });
        } catch (err) {
            return response.status(400).json({ message: "Erro ao listar câmeras." });
        }
    },

    abrirChamado: async (request: Request, response: Response) => {
        try {
            const camera = JSON.parse(request['fields'].chamado as string);
            const files = request['files'];
            const result = await ChamadosService.abrirChamado(camera, files);
            if (result) {
                if (result === true) response.status(200).json({ message: "Sucesso ao cadastrar chamado." });
                else response.status(201).json({ message: 'Erro ao cadastrar o chamado' });
            } else return response.status(400).json({ message: "Erro ao cadastar chamado." });
        } catch (err) {
            console.log("🚀 ~ insere: ~ err:", err)
            return response.status(400).json({ message: "Erro ao cadastar chamado." });
        }
    },

    atualizaChamado: async (request: Request, response: Response) => {
        try {
            const camera = request.body
            const createdUsername = getUser(request.headers.authorization)?.nome;
            const result = await ChamadosService.atualizaChamado(camera, createdUsername);
            if (result) return response.status(200).json({ message: "Sucesso ao alterar chamado." });
            else return response.status(400).json({ message: "Erro ao alterar chamado." });
        } catch (err) {
            return response.status(400).json({ message: "Erro ao alterar chamado." });
        }
    },

    atualizaChamadoPoda: async (request: Request, response: Response) => {
        try {
            const camera = JSON.parse(request['fields'].chamados as string);
            const files = request['files'];
            const result = await ChamadosService.atualizaChamadoPoda(camera, files);
            if (result) {
                if (result === true) response.status(200).json({ message: "Sucesso ao alterar chamado." });

                else response.status(201).json({ message: 'Erro ao alterar chamado.' });
            } else return response.status(400).json({ message: "Erro ao alterar chamado." });
        } catch (err) {
            console.log("🚀 ~ Erro: ~ err:", err)
            return response.status(400).json({ message: "Erro ao alterar chamado." });
        }
    },

    atualizaChamadoTrue: async (request: Request, response: Response) => {
        try {
            const camera = request.body
            const createdUsername = getUser(request.headers.authorization)?.nome;
            const result = await ChamadosService.atualizaChamadoTrue(camera, createdUsername);
            if (result) return response.status(200).json({ message: "Sucesso ao alterar chamado." });
            else return response.status(400).json({ message: "Erro ao alterar chamado." });
        } catch (err) {
            return response.status(400).json({ message: "Erro ao alterar chamado." });
        }
    },

    atualizaChamadoFalse: async (request: Request, response: Response) => {
        try {
            const camera = request.body
            const createdUsername = getUser(request.headers.authorization)?.nome;
            const result = await ChamadosService.atualizaChamadoFalse(camera, createdUsername);
            if (result) return response.status(200).json({ message: "Sucesso ao alterar chamado." });
            else return response.status(400).json({ message: "Erro ao alterar chamado." });
        } catch (err) {
            return response.status(400).json({ message: "Erro ao alterar chamado." });
        }
    },

    excluiChamado: async (request: Request, response: Response) => {
        try {
            const camera = request.body
            const createdUsername = getUser(request.headers.authorization)?.nome;
            const result = await ChamadosService.excluiChamado(camera, createdUsername);
            if (result) return response.status(200).json({ message: "Sucesso ao excluir chamado." });
            else return response.status(400).json({ message: "Erro ao alterar chamado." });
        } catch (err) {
            return response.status(400).json({ message: "Erro ao alterar chamado." });
        }
    },

    getChamadoById: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const result = await ChamadosService.getChamadoById(parseInt(id));
            if (result) return response.status(200).json(result);
            else return response.status(400).json({ message: "Erro ao encontrar chamado." });
        } catch (err) {
            return response.status(400).json({ message: "Erro ao encontrar chamado2." });
        }
    },

    async getFoto(request: Request, response: Response) {
        try {
            const arquivo = request.params.id
            const foto = await ChamadosService.getFoto(arquivo)
            if (foto) return response.status(200).sendFile(foto);
            else return response.status(400).json({ message: "Erro ao acessar foto." });
        } catch (error) {
            return false
        }
    },

    listaHistoricoChamados: async (request: Request, response: Response) => {
        try {
            const result = await ChamadosService.listaHistoricoChamados();
            if (result) return response.status(200).json(result);
            else return response.status(400).json({ message: "Erro ao listar câmeras." });
        } catch (err) {
            return response.status(400).json({ message: "Erro ao listar câmeras." });
        }
    },
};

export { ChamadosController };