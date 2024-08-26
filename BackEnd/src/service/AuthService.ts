import { User } from "./../types";
import prismaClient from "../prisma";
import { sign } from "jsonwebtoken";
import { Encrypt, isNumeric } from "../utils";
import bcrypt from "bcrypt";

class AuthService {
  async loginUsuario(username: string, password: string) {
    try {
      let user: User;
      const matricula = parseInt(username);

      if (isNumeric(username)) {
        user = await prismaClient.user.findFirst({
          where: { OR: [{ matricula }] },
        });
      }
      if (!user)
        user = await prismaClient.user.findFirst({
          where: { username: { equals: username } },
        });

      let senhaCorreta = false;
        if (!user.password) senhaCorreta = false;
        else senhaCorreta = await Encrypt.comparePassword(password, user.password);
        
      if (!senhaCorreta) return { message: "Senha incorreta!" };

      delete user.password;
     
      const token = sign({ ...user }, process.env.JWT_SECRET, {
        subject: username,
        expiresIn: user.isDev ? "1000d" : "1d",
      });
      return { user, token };
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  async resetSenha(id_user: string) {
    try {
      let user = await prismaClient.user.findFirst({ where: { id: parseInt(id_user) } });
      if (!user) return { message: "Usuário não cadastrado!" };
      else {
        const ano = new Date().getFullYear().toString();
        const newPassword = await Encrypt.cryptPassword("csi" + ano);
        await prismaClient.user.update({ where: { id: user.id }, data: { password: newPassword, alterarSenha: true } });
        return true;
      }
    } catch {
      return false;
    }
  }
  async alterarSenha(id_user: number, new_pass: string) {
    try {
      let user = await prismaClient.user.findFirst({ where: { id: id_user } });
      if (!user) return { message: "Usuário não cadastrado!" };
      else {
        const password = await Encrypt.cryptPassword(new_pass);
        const res = await prismaClient.user.update({ where: { id: user.id }, data: { password, alterarSenha: false } });
        if (res) return true;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

export { AuthService };
