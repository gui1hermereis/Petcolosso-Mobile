import axios from "axios";
import { Request, Response } from "express";
import { getUser } from "../utils";
import { RadaresService } from "../service/RadaresService";

const RadaresController = {
  lista: async (request: Request, response: Response) => {
    try {
      const result = await RadaresService.listaRadares();
      if (result) return response.status(200).json(result);
      else return response.status(400).json({ message: "Erro ao listar radares." });
    } catch (err) {
      return response.status(400).json({ message: "Erro ao listar radares." });
    }
  },

  atualiza: async (request: Request, response: Response) => {
    try {
      const camera = JSON.parse(request['fields'].cameras as string);
      const createdUsername = getUser(request.headers.authorization)?.nome;
      const result = await RadaresService.atualizaRadar(camera, createdUsername);
      const createdName = getUser(request.headers.authorization)?.nome;
      const createdMatricula = getUser(request.headers.authorization)?.matricula?.toString();
      const convertedMatricula = createdMatricula ? parseInt(createdMatricula) : undefined;
      if (result) return response.status(200).json({ message: "Sucesso ao alterar câmera." });
      else return response.status(400).json({ message: "Erro ao alterar câmera." });
    } catch (err) {
      return response.status(400).json({ message: "Erro ao alterar câmera." });
    }
  },

  atualizaRadarMapa: async (request: Request, response: Response) => {
    try {
      const id = JSON.parse(request['fields'].id as string);
      const camera = JSON.parse(request['fields'].cameras as string);
      const createdUsername = getUser(request.headers.authorization)?.nome;
      const result = await RadaresService.atualizaRadarMapa(camera, createdUsername, id);
      if (result) return response.status(200).json({ message: "Sucesso ao alterar câmera." });
      else return response.status(400).json({ message: "Erro ao alterar câmera." });
    } catch (err) {
      return response.status(400).json({ message: "Erro ao alterar câmera." });
    }
  },
};

export { RadaresController };
