import axios from "axios";
import { Request, Response } from "express";
import { ListaCamerasService } from "../service/ListaCamerasService";
import { getUser } from "../utils";

const ListaCamerasController = {
  lista: async (request: Request, response: Response) => {
    try {
      const result = await ListaCamerasService.listaCameras();
      if (result) return response.status(200).json(result);
      else return response.status(400).json({ message: "Erro ao listar câmeras." });
    } catch (err) {
      return response.status(400).json({ message: "Erro ao listar câmeras." });
    }
  },

  listaAtivas: async (request: Request, response: Response) => {
    try {
      const result = await ListaCamerasService.listaCamerasAtivas();
      if (result) return response.status(200).json(result);
      else return response.status(400).json({ message: "Erro ao listar câmeras." });
    } catch (err) {
      return response.status(400).json({ message: "Erro ao listar câmeras." });
    }
  },

  listaInativas: async (request: Request, response: Response) => {
    try {
      const result = await ListaCamerasService.listaCamerasInativas();
      if (result) return response.status(200).json(result);
      else return response.status(400).json({ message: "Erro ao listar câmeras." });
    } catch (err) {
      return response.status(400).json({ message: "Erro ao listar câmeras." });
    }
  },

  insere: async (request: Request, response: Response) => {
    try {
      const camera = JSON.parse(request['fields'].cameras as string);
      console.log("🚀 ~ insere: ~ camera:", camera)
      const result = await ListaCamerasService.insereCamera(camera);
      if (result) {
        if (result === true) response.status(200).json({ message: "Sucesso ao cadastrar câmera." });
        else response.status(201).json({ message: 'Erro ao cadastrar a camera' });
      } else return response.status(400).json({ message: "Erro ao cadastar câmera." });
    } catch (err) {
      console.log("🚀 ~ insere: ~ err:", err)
      return response.status(400).json({ message: "Erro ao cadastar câmera." });
    }
  },

  atualiza: async (request: Request, response: Response) => {
    try {
      const camera = JSON.parse(request['fields'].cameras as string);
      const createdUsername = getUser(request.headers.authorization)?.nome;
      const result = await ListaCamerasService.atualizaCamera(camera, createdUsername);
      if (result) return response.status(200).json({ message: "Sucesso ao alterar câmera." });
      else return response.status(400).json({ message: "Erro ao alterar câmera." });
    } catch (err) {
      return response.status(400).json({ message: "Erro ao alterar câmera." });
    }
  },

  atualizaMapa: async (request: Request, response: Response) => {
    try {
      const id = JSON.parse(request['fields'].id as string);
      const camera = JSON.parse(request['fields'].cameras as string);
      const createdUsername = getUser(request.headers.authorization)?.nome;
      const result = await ListaCamerasService.atualizaCameraMapa(camera, createdUsername, id);
      if (result) return response.status(200).json({ message: "Sucesso ao alterar câmera." });
      else return response.status(400).json({ message: "Erro ao alterar câmera." });
    } catch (err) {
      return response.status(400).json({ message: "Erro ao alterar câmera." });
    }
  },

  getById: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const result = await ListaCamerasService.getById(parseInt(id));
      if (result) return response.status(200).json(result);
      else return response.status(400).json({ message: "Erro ao encontrar câmera." });
    } catch (err) {
      return response.status(400).json({ message: "Erro ao encontrar câmera." });
    }
  },

  verificaChamadosAbertosParaCamera: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const result = await ListaCamerasService.verificaChamadosAbertosParaCamera(parseInt(id));
      if (result) {
        return response.status(200).json(result);
      } else {
        return response.status(400).json(result);
      }
    } catch (err) {
      return response.status(400).json({ message: "Erro ao encontrar chamados abertos para a câmera." });
    }
  },
}

export { ListaCamerasController };