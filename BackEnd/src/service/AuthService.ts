import { User } from "./../types";
import prismaClient from "../prisma";
import { sign } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Encrypt } from "../utils";

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

  async cadastrarUsuario(username: string, password: string) {
    try {
      const passwordCrypt = await Encrypt.cryptPassword(password);

        await prismaClient.user.create({
          data: {
              username: username,
              password: passwordCrypt,
              isAdm: false,
          },
        });

        return true;
    } catch (e) {
        console.log("🚀 ~ e:", e)

        return false;
    }
  }
}

export { AuthService };