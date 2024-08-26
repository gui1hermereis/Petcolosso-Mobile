import axios from "axios";
import { Request, Response } from "express";
import { UsuarioService } from "../service/UsuarioService";
import { getUser } from "../utils";

const UsuarioController = {
  lista: async (request: Request, response: Response) => {
    try {
      const result = await UsuarioService.listaUsuarios();
      if (result) return response.status(200).json(result);
      else return response.status(400).json({ message: "Erro ao listar usuários." });
    } catch (err) {
      return response.status(400).json({ message: "Erro ao listar usuários." });
    }
  },

  insere: async (request: Request, response: Response) => {
    const ano = new Date().getFullYear().toString();
    try {
      const usuario = request.body;
      const result = await UsuarioService.insereUsuario(usuario);
      if (result) {
        if (result === true) response.status(200).json({ message: "Sucesso ao cadastrar usuário. \n Senha: csi" + ano });
        else response.status(201).json({ message: result.message });
      } else return response.status(400).json({ message: "Erro ao cadastar usuário." });
    } catch (err) {
      return response.status(400).json({ message: "Erro ao cadastar usuário." });
    }
  },

  atualiza: async (request: Request, response: Response) => {
    try {
      const usuario = request.body;
      const result = await UsuarioService.atualizaUsuario(usuario);
      const createdUsername = getUser(request.headers.authorization)?.username;
      const createdName = getUser(request.headers.authorization)?.nome;
      const createdMatricula = getUser(request.headers.authorization)?.matricula?.toString();
      const convertedMatricula = createdMatricula ? parseInt(createdMatricula) : undefined;
      if (result) return response.status(200).json({ message: "Sucesso ao alterar usuário." });
      else return response.status(400).json({ message: "Erro ao alterar usuário." });
    } catch (err) {
      return response.status(400).json({ message: "Erro ao alterar usuário." });
    }
  },

  getById: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const result = await UsuarioService.getById(parseInt(id));
      if (result) return response.status(200).json(result);
      else return response.status(400).json({ message: "Erro ao encontrar usuário." });
    } catch (err) {
      return response.status(400).json({ message: "Erro ao encontrar usuário." });
    }
  },

  ativa: async (request: Request, response: Response) => {
    try {
      const id = parseInt(request.params.id);
      const result = await UsuarioService.ativa(id);
      const createdUsername = getUser(request.headers.authorization).username;
      const createdName = getUser(request.headers.authorization).nome;
      const createdMatricula = getUser(request.headers.authorization)?.matricula?.toString();
      const convertedMatricula = createdMatricula ? parseInt(createdMatricula) : undefined;
      if (result) return response.status(200).json({ message: "Sucesso ao ativar usuário." });
      else return response.status(400).json({ message: "Erro ao ativar usuário." });
    } catch (err) {
      return response.status(400).json({ message: "Erro ao ativar usuário." });
    }
  },

  inativa: async (request: Request, response: Response) => {
    try {
      const id = parseInt(request.params.id);
      const result = await UsuarioService.inativa(id);
      const createdUsername = getUser(request.headers.authorization).username;
      const createdName = getUser(request.headers.authorization).nome;
      const createdMatricula = getUser(request.headers.authorization)?.matricula?.toString();
      const convertedMatricula = createdMatricula ? parseInt(createdMatricula) : undefined;
      if (result) return response.status(200).json({ message: "Sucesso ao inativar usuário." });
      else return response.status(400).json({ message: "Erro ao inativar usuário." });
    } catch (err) {
      return response.status(400).json({ message: "Erro ao inativar usuário." });
    }
  },
};

export { UsuarioController };
