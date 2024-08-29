import { Request, Response } from "express";
import { AuthService } from "../service/AuthService";

class AuthenticateUserController {
  async signin(request: Request, response: Response) {
    try {
      const { username, password } = request.body;
      const service = new AuthService();
      const result = await service.loginUsuario(username.toUpperCase(), password);
  
      if (result.success) {
        return response.status(200).json(result);
      } else {
        return response.status(400).json({ message: result.message });
      }
    } catch (err) {
      console.error("Erro ao processar login:", err);
      return response.status(500).json({ message: "Erro interno no servidor ao fazer login. Por favor, tente novamente mais tarde." });
    }
  }

  async cadastrarUsuario(request: Request, response: Response) {
    try {
      const { username, password, email } = request.body;
      const service = new AuthService();
      const result = await service.cadastrarUsuario(username, password, email);

      if (result.success) {
        return response.status(200).json({ message: result.message });
      } else {
        return response.status(400).json({ message: result.message });
      }
    } catch (err) {
      console.error("Erro ao cadastrar usuário:", err);
      return response.status(500).json({ message: "Erro interno no servidor ao cadastrar usuário." });
    }
  }

  async enviarCodigo(request: Request, response: Response) {
    try {
      const { email } = request.body;
      const service = new AuthService();
      const result = await service.enviarCodigo(email);

      if (result.success) {
        return response.status(200).json({ message: result.message });
      } else {
        return response.status(400).json({ message: result.message });
      }
    } catch (err) {
      console.error("Erro ao enviar código:", err);
      return response.status(500).json({ message: "Erro interno no servidor ao enviar código." });
    }
  }

  async verificacaoDeCodigo(request: Request, response: Response) {
    try {
      const { email, codigo } = request.body;
      const service = new AuthService();
      const result = await service.verificacaoDeCodigo(email, codigo);

      if (result.success) {
        return response.status(200).json({ message: result.message });
      } else {
        return response.status(400).json({ message: result.message });
      }
    } catch (err) {
      console.error("Erro ao verificar código:", err);
      return response.status(500).json({ message: "Erro interno no servidor ao verificar código." });
    }
  }

  async novaSenha(request: Request, response: Response) {
    try {
      const { senha, email } = request.body;
      const service = new AuthService();
      const result = await service.novaSenha(senha, email);

      if (result.success) {
        return response.status(200).json({ message: result.message });
      } else {
        return response.status(400).json({ message: result.message });
      }
    } catch (err) {
      console.error("Erro ao alterar senha:", err);
      return response.status(500).json({ message: "Erro interno no servidor ao alterar senha." });
    }
  }
}

export { AuthenticateUserController };