import axios from "axios";
import { Request, Response } from "express";
import { getUser } from "../utils";
import { VisitasService } from "../service/VisitasService";

const VisitasController = {
  lista: async (request: Request, response: Response) => {
    try {
      const result = await VisitasService.listaVisitas();
      if (result) return response.status(200).json(result);
      else return response.status(400).json({ message: "Erro ao listar visitas." });
    } catch (err) {
      return response.status(400).json({ message: "Erro ao listar visitas." });
    }
  },

  listaPassadas: async (request: Request, response: Response) => {
    try {
      const result = await VisitasService.listaVisitasPassadas();
      if (result) return response.status(200).json(result);
      else return response.status(400).json({ message: "Erro ao listar visitas." });
    } catch (err) {
      return response.status(400).json({ message: "Erro ao listar visitas." });
    }
  },

  insere: async (request: Request, response: Response) => {
    try {
      const body = request.body;
      const result = await VisitasService.insereVisita(body);
      if (result) {
        response.status(200).json({ message: "Sucesso ao cadastrar visita" });
      } else return response.status(400).json({ message: "Erro ao cadastar visita." });
    } catch (err) {
      return response.status(400).json({ message: "Erro ao cadastar visita." });
    }
  },

  atualiza: async (request: Request, response: Response) => {
    try {
      const usuario = request.body;
      const result = await VisitasService.atualizavisita(usuario);
      const createdUsername = getUser(request.headers.authorization)?.username;
      const createdName = getUser(request.headers.authorization)?.nome;
      const createdMatricula = getUser(request.headers.authorization)?.matricula?.toString();
      const convertedMatricula = createdMatricula ? parseInt(createdMatricula) : undefined;
      if (result) return response.status(200).json({ message: "Sucesso ao alterar visita." });
      else return response.status(400).json({ message: "Erro ao alterar visita." });
    } catch (err) {
      return response.status(400).json({ message: "Erro ao alterar visita." });
    }
  },

  getById: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const result = await VisitasService.getById(parseInt(id));
      if (result) return response.status(200).json(result);
      else return response.status(400).json({ message: "Erro ao encontrar visita." });
    } catch (err) {
      return response.status(400).json({ message: "Erro ao encontrar visita." });
    }
  },

  exclui: async (request: Request, response: Response) => {
    try {
      const id = parseInt(request.params.id);
      const result = await VisitasService.exclui(id);
      if (result) {
        return response.status(200).json({ message: "Sucesso ao excluir visita." });
      } else {
        return response.status(400).json({ message: "Erro ao excluir visita." });
      }
    } catch (err) {
      console.error(err);
      return response.status(500).json({ message: "Erro interno do servidor ao excluir visita." });
    }
  },

  getByAddId: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const result = await VisitasService.getByAddId(parseInt(id));
      if (result) return response.status(200).json(result);
      else return response.status(400).json({ message: "Erro ao encontrar visita." });
    } catch (err) {
      return response.status(400).json({ message: "Erro ao encontrar visita." });
    }
  },

  insereAdicionais: async (request: Request, response: Response) => {
    try {
      const body = request.body;
      const result = await VisitasService.insereVisitaAdicionais(body);
      if (result) {
        response.status(200).json({ message: "Sucesso ao cadastrar visita" });
      } else return response.status(400).json({ message: "Erro ao cadastar visita." });
    } catch (err) {
      return response.status(400).json({ message: "Erro ao cadastar visita." });
    }
  },
};

export { VisitasController };
