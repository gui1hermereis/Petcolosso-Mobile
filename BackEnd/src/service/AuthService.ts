import { User } from "./../types";
import prismaClient from "../prisma";
import { sign } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Encrypt } from "../utils";
import { sendRecoveryEmail } from "./EnviarEmailService"

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

  async cadastrarUsuario(username: string, password: string, email: string) {
    try {
      const passwordCrypt = await Encrypt.cryptPassword(password);
      let count = await prismaClient.user.count({
        where: { username }
      });

      if (count === 1) {
        return { message: "Erro usuario ja existe!!" };
      }else{
        await prismaClient.user.create({
          data: {
            username: username,
            password: passwordCrypt,
            email: email,
            isAdm: false,
          },
        });
      return true;
      }
    } catch (e) {
      console.log("🚀 ~ e:", e)
      return false;
    }
  }
  
  async enviarCodigo(email: string) {
    try {
      const result: any[] = await prismaClient.$queryRaw`
        SELECT username FROM users
        WHERE email = ${email}
      `;

      if (result.length === 0) {
        return { message: "Email não encontrado" };
      } else {
        const userCript = await Encrypt.cryptUser(result[0].username);
        await sendRecoveryEmail(email, userCript); 
        return { message: "Código enviado com sucesso" };
      }
    } catch (e) {
      console.log("🚀 ~ e:", e);
      return { message: "Erro ao enviar código" };
    }
  }

  async verificacaoDeCodigo(email: string, codigo: string) {
    try {
      const result: any[] = await prismaClient.$queryRaw`
        SELECT username FROM users
        WHERE email = ${email}
      `;
  
      if (result.length === 0) {
        return { message: "Código Inválido" };
      } else {
        const username = result[0].username;
        const isMatch = await bcrypt.compare(codigo, username);
  
        return isMatch ? true : false;
      }
    } catch (e) {
      console.log("🚀 ~ e:", e);
      return false;
    }
  }
}

export { AuthService };