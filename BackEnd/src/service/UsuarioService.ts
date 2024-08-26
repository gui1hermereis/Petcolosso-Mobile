import { isNumeric } from "./../utils";
import prismaClient from "../prisma";
import { User } from "../types";
import { Encrypt } from "../utils";

const UsuarioService = {
  async listaUsuarios() {
    try {
      let results = await prismaClient.user.findMany({ orderBy: { username: "asc" } });
      return results;
    } catch (e) {
      console.log(e);
      return false;
    }
  },

  async insereUsuario(usuario: User) {
    try {
      const { id, password, alterarSenha, matricula, ...otheProps } = usuario;
      const ano = new Date().getFullYear().toString();
      const newPassword = otheProps.interno ? "" : await Encrypt.cryptPassword("csi" + ano);
      if (usuario.interno) {
        const oldUser = await prismaClient.user.findFirst({ where: { matricula } });
        if (oldUser) return { message: "Matricula já cadastrada" };
      } else {
        const oldUser = await prismaClient.user.findFirst({ where: { username: usuario.username } });
        if (oldUser) return { message: "Nome de usuário já cadastrado" };
      }
      const newUser = await prismaClient.user.create({
        data: {
          ...otheProps,
          matricula,
          alterarSenha: !otheProps.interno,
          password: newPassword,
          active: true,
        },
      });

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  },

  async atualizaUsuario(usuario: User) {
    try {
      const { id, password, alterarSenha, ...otheProps } = usuario;
      const newUser = await prismaClient.user.update({
        where: { id },
        data: {
          ...otheProps
        }
      });

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  },

  async getById(id: number) {
    try {
      let result = await prismaClient.user.findUnique({ where: { id } });
      return result;
    } catch (e) {
      console.log(e);
      return false;
    }
  },

  async ativa(id: number) {
    try {
      let result = await prismaClient.user.update({ where: { id }, data: { active: true } });
      return result;
    } catch (e) {
      console.log(e);
      return false;
    }
  },

  async inativa(id: number) {
    try {
      let result = await prismaClient.user.update({ where: { id }, data: { active: false } });
      return result;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
};

export { UsuarioService };
