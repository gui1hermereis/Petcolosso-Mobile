import axios from "axios";
import { Request, Response } from "express";
import { getUser, getUserInstituicao } from "../utils";
import { OcorenciasCamerasService } from "../service/OcorenciasCamerasService";

const OcorrenciasCamerasController = {
  lista: async (request: Request, response: Response) => {
    try {
      const result = await OcorenciasCamerasService.listaOcorrenciaCameras();
      if (result) return response.status(200).json(result);
      else return response.status(400).json({ message: "Erro ao listar câmeras." });
    } catch (err) {
      return response.status(400).json({ message: "Erro ao listar câmeras." });
    }
  },

  listaFinalizadas: async (request: Request, response: Response) => {
    try {
      const result = await OcorenciasCamerasService.listaOcorrenciaCamerasFinalizadas();
      if (result) return response.status(200).json(result);
      else return response.status(400).json({ message: "Erro ao listar câmeras." });
    } catch (err) {
      return response.status(400).json({ message: "Erro ao listar câmeras." });
    }
  },


  listaPegouNaCamera: async (request: Request, response: Response) => {
    try {
      const result = await OcorenciasCamerasService.listaPegouNaCamera();
      if (result) return response.status(200).json(result);
      else return response.status(400).json({ message: "Erro ao listar câmeras." });
    } catch (err) {
      return response.status(400).json({ message: "Erro ao listar câmeras." });
    }
  },

  getById: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const result = await OcorenciasCamerasService.getById(parseInt(id));
      if (result) return response.status(200).json(result);
      else return response.status(400).json({ message: "Erro ao encontrar câmera." });
    } catch (err) {
      return response.status(400).json({ message: "Erro ao encontrar câmera." });
    }
  },

  abrirOcorrenciaCameras: async (request: Request, response: Response) => {
    try {
      let camera = JSON.parse(request['fields'].camera as string);
      const createdUsername = getUser(request.headers.authorization)?.nome;
      const instituicao = getUserInstituicao(request.headers.authorization);
      const result = await OcorenciasCamerasService.abrirOcorrenciaCamera(camera, createdUsername, instituicao);
      if (result) {
        if (result === true) response.status(200).json({ message: "Sucesso ao cadastrar ocorrência com a camera." });
        else response.status(201).json({ message: 'Erro ao cadastrar a ocorrência com a camera' });
      } else return response.status(400).json({ message: "Erro ao cadastar ocorrência com a camera." });
    } catch (err) {
      console.log("🚀 ~ insere: ~ err:", err)
      return response.status(400).json({ message: "Erro ao cadastar ocorrência com a camera." });
    }
  },

  atualizaOcorrencia: async (request: Request, response: Response) => {
    try {
      const ocorrencia = request.body;
      const createdUsername = getUser(request.headers.authorization)?.nome;
      const result = await OcorenciasCamerasService.atualizaOcorrencia(ocorrencia, createdUsername);
      if (result) {
        if (result === true) response.status(200).json({ message: "Sucesso ao altera ocorrência com a camera." });
        else response.status(201).json({ message: 'Erro ao altera a ocorrência com a camera' });
      } else return response.status(400).json({ message: "Erro ao altera ocorrência com a camera." });
    } catch (err) {
      console.log("🚀 ~ insere: ~ err:", err)
      return response.status(400).json({ message: "Erro ao altera ocorrência com a camera." });
    }
  },

  getOcorrenciaById: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const result = await OcorenciasCamerasService.getOcorrenciaCamerasById(parseInt(id));
      if (result) return response.status(200).json(result);
      else return response.status(400).json({ message: "Erro ao encontrar chamado." });
    } catch (err) {
      return response.status(400).json({ message: "Erro ao encontrar chamado." });
    }
  },

  getOcorrenciaByAddId: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const result = await OcorenciasCamerasService.getOcorrenciaCamerasByAddId(parseInt(id));
      if (result) return response.status(200).json(result);
      else return response.status(400).json({ message: "Erro ao encontrar chamado." });
    } catch (err) {
      return response.status(400).json({ message: "Erro ao encontrar chamado." });
    }
  },

  finaliza: async (request: Request, response: Response) => {
    try {
      const id = parseInt(request.params.id);
      const createdUsername = getUser(request.headers.authorization)?.nome;
      const result = await OcorenciasCamerasService.finaliza(id, createdUsername);
      if (result) {
        return response.status(200).json({ message: "Sucesso ao finalizar ocorrencia." });
      } else {
        return response.status(400).json({ message: "Erro ao finalizar ocorrencia." });
      }
    } catch (err) {
      console.error(err);
      return response.status(500).json({ message: "Erro interno do servidor ao finalizar ocorrencia." });
    }
  },

  imagemSalva: async (request: Request, response: Response) => {
    try {
      const id = parseInt(request.params.id);
      const createdUsername = getUser(request.headers.authorization)?.nome;

      const result = await OcorenciasCamerasService.imagemSalva(id, createdUsername);
      if (result) {
        return response.status(200).json({ message: "Sucesso ao alterar para imagem salva." });
      } else {
        return response.status(400).json({ message: "Erro." });
      }
    } catch (err) {
      console.error(err);
      return response.status(500).json({ message: "Erro interno do servidor." });
    }
  },

  imagemNaoSalva: async (request: Request, response: Response) => {
    try {
      const id = parseInt(request.params.id);
      const createdUsername = getUser(request.headers.authorization)?.nome;
      const result = await OcorenciasCamerasService.imagemNaoSalva(id, createdUsername);
      if (result) {
        return response.status(200).json({ message: "Sucesso ao alterar para imagem NÃO salva." });
      } else {
        return response.status(400).json({ message: "Erro." });
      }
    } catch (err) {
      console.error(err);
      return response.status(500).json({ message: "Erro interno do servidor ." });
    }
  },

  listaHistoricoOcorrencias: async (request: Request, response: Response) => {
    try {
      const result = await OcorenciasCamerasService.listaHistoricoOcorrencias();
      if (result) return response.status(200).json(result);
      else return response.status(400).json({ message: "Erro ao listar câmeras." });
    } catch (err) {
      return response.status(400).json({ message: "Erro ao listar câmeras." });
    }
  },
};

export { OcorrenciasCamerasController };