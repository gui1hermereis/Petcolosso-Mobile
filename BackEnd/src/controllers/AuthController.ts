import { getUserId } from "./../utils";
import { Request, Response } from "express";
import { AuthService } from "../service/AuthService"

class AuthenticateUserController {

  async signin(request: Request, response: Response) {
    try {
      const { username, password } = request.body;
      const service = new AuthService();
      const result = await service.loginUsuario(username.toUpperCase(), password);
      if (result) {
        if (result.message) return response.status(203).json({ message: result.message });
        else return response.json(result);
      } else return response.status(400).json({ message: "Erro ao fazer login." });
    } catch (err) {
      return response.status(400).json({ message: "Erro ao fazer login." });
    }
  }
}

export { AuthenticateUserController };