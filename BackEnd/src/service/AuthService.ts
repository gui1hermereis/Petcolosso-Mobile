import { User } from "./../types";
import prismaClient from "../prisma";
import { sign } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Encrypt } from "../utils";
import { sendRecoveryEmail } from "./EnviarEmailService";

class AuthService {
  async loginUsuario(username: string, password: string) {
    try {
      const user: User | null = await prismaClient.user.findFirst({
        where: { username: { equals: username } },
      });
  
      if (!user) {
        return { success: false, message: "Usuário não encontrado!" };
      }
  
      const senhaCorreta = user.password
        ? await bcrypt.compare(password, user.password)
        : false;
  
      if (!senhaCorreta) {
        return { success: false, message: "Senha incorreta!" };
      }
  
      delete user.password;
  
      const token = sign({ ...user }, process.env.JWT_SECRET as string, {
        subject: username,
      });
  
      return { success: true, user, token };
    } catch (e) {
      console.error("Erro ao fazer login:", e);
      return { success: false, message: "Erro no servidor. Por favor, tente novamente mais tarde." };
    }
  }

  async cadastrarUsuario(username: string, password: string, email: string) {
    try {
      const passwordCrypt = await Encrypt.cryptPassword(password);

      const verificaEmail = await prismaClient.user.count({
        where: { email: email }
      });

      const verificaUsuario = await prismaClient.user.count({
        where: { username: username }
      });

      if (verificaEmail > 0) {
        return { success: false, message: "Já existe um usuário com esse e-mail!" };
      } else if (verificaUsuario > 0) {
        return { success: false, message: "Já existe um usuário com esse nome de usuário!" };
      } else {
        await prismaClient.user.create({
          data: {
            username: username,
            password: passwordCrypt,
            email: email,
            isAdm: false,
          },
        });

        return { success: true, message: "Cadastro realizado com sucesso!" };
      }
    } catch (e) {
      console.error("Erro ao realizar o cadastro:", e);
      return { success: false, message: "Erro ao realizar o cadastro" };
    }
  }

  async enviarCodigo(email: string) {
    try {
      const result = await prismaClient.user.findMany({
        select: {
          username: true,
        },
        where: {
          email: email,
        },
      });

      if (result.length === 0) {
        return { success: false, message: "E-mail não encontrado" };
      } else {
        const userCript = await Encrypt.cryptUser(result[0].username);
        await sendRecoveryEmail(email, userCript);
        return { success: true, message: "Código enviado com sucesso" };
      }
    } catch (e) {
      console.error("Erro ao enviar código:", e);
      return { success: false, message: "Erro ao enviar código" };
    }
  }

  async verificacaoDeCodigo(email: string, codigo: string) {
    try {
      const result = await prismaClient.user.findMany({
        select: {
          username: true,
        },
        where: {
          email: email,
        },
      });

      if (result.length === 0) {
        return { success: false, message: "E-mail não encontrado" };
      } else {
        const username = result[0].username;
        const isMatch = await bcrypt.compare(username, codigo);

        return { success: isMatch, message: isMatch ? "Código válido" : "Código inválido" };
      }
    } catch (e) {
      console.error("Erro ao verificar código:", e);
      return { success: false, message: "Erro ao verificar código" };
    }
  }

  async novaSenha(senha: string, email: string) {
    try {
      const user = await prismaClient.user.findUnique({
        select: {
          id: true,
        },
        where: {
          email: email,
        },
      });

      if (!user) {
        return { success: false, message: "Usuário não encontrado!" };
      }

      const senhaCriptografada = await Encrypt.cryptPassword(senha);

      await prismaClient.user.update({
        where: { id: user.id },
        data: {
          password: senhaCriptografada,
        }
      });

      return { success: true, message: "Senha alterada com sucesso!" };
    } catch (e) {
      console.error("Erro ao atualizar senha:", e);
      return { success: false, message: "Erro ao atualizar senha!" };
    }
  }
}

export { AuthService };