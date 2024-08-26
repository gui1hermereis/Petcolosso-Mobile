import { User } from "./../types";
import prismaClient from "../prisma";
import { sign } from "jsonwebtoken";
import bcrypt from "bcrypt";

class AuthService {
  async loginUsuario(username: string, password: string) {
    try {
      let user: User | null = await prismaClient.user.findFirst({
        where: { username: { equals: username } },
      });

      if (!user) {
        return { message: "Usuário não encontrado!" };
      }

      const senhaCorreta = user.password
        ? await bcrypt.compare(password, user.password)
        : false;

      if (!senhaCorreta) {
        return { message: "Senha incorreta!" };
      }

      delete user.password;

      const token = sign({ ...user }, process.env.JWT_SECRET, {
        subject: username,
      });

      return { user, token };
    } catch (e) {
      console.log(e);
      return { message: "Erro no servidor" };
    }
  }
}

export { AuthService };