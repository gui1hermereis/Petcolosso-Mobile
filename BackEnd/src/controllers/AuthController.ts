import { Request, Response } from "express";
import { AuthService } from "../service/AuthService";

class AuthenticateUserController {

  async signin(request: Request, response: Response) {
    try {
      const { username, password } = request.body;
      const service = new AuthService();
      const result = await service.loginUsuario(username.toUpperCase(), password);

      if (result) {
        if (result.message) {
          return response.status(203).json({ message: result.message });
        } else {
          return response.status(200).json(result);
        }
      } else {
        return response.status(400).json({ message: "Erro ao fazer login." });
      }
    } catch (err) {
      console.error("Erro no login:", err);
      return response.status(500).json({ message: "Erro interno no servidor ao fazer login." });
    }
  }

  async cadastrarUsuario(request: Request, response: Response) {
    try {
      const { username, password, email } = request.body;
      const service = new AuthService();
      const result = await service.cadastrarUsuario(username, password, email);

      if (result) {
        if (result === true) {
          return response.status(200).json({ message: "Usuário cadastrado com sucesso." });
        } else {
          return response.status(400).json({ message: "Erro ao cadastrar o usuário." });
        }
      } else {
        return response.status(400).json({ message: "Erro ao cadastrar usuário." });
      }
    } catch (err) {
      return response.status(500).json({ message: "Erro interno no servidor ao cadastrar usuário." });
    }
  }
  async enviarCodigo(request: Request, response: Response) {
    try {
      const { email } = request.body;
      const service = new AuthService();
      const result = await service.enviarCodigo(email);

      if (result) return response.status(200).json(result);
            else return response.status(400).json({ message: "Erro ao enviar codigo" });
        } catch (err) {
            return response.status(400).json({ message: "Erro ao enviar codigo" });
        }
  }

  async verificacaoDeCodigo(request: Request, response: Response) {
    try {
      const { email, codigo } = request.body;
      const service = new AuthService();
      const result = await service.verificacaoDeCodigo(email, codigo);

      if (result) {
        if (result === true) {
          return response.status(200).json({ message: "Codigo valido." });
        } else {
          return response.status(400).json({ message: "Codigo invalido." });
        }
      } else {
        return response.status(400).json({ message: "Codigo invalido." });
      }
    } catch (err) {
      return response.status(500).json({ message: "Erro interno no servidor ao validar o codigo." });
    }
  }
}

export { AuthenticateUserController };