import prismaClient from "../prisma";
import { Visita, VisitasAdicionais } from "../types";

const VisitasService = {
  async listaVisitas() {
    try {
      const now = new Date();
      const results = await prismaClient.visitas.findMany({
        where: {
          date: {
            gt: now,
          },
        },
        orderBy: {
          date: 'asc',
        },
      });

      return results;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  async listaVisitasPassadas() {
    try {
      const now = new Date();
      const results = await prismaClient.visitas.findMany({
        where: {
          date: {
            lt: now,
          },
        },
        orderBy: {
          date: 'asc',
        },
      });

      return results;
    } catch (e) {
      console.log(e);
      return false;
    }
  },

  async insereVisita(visita: Visita) {
    try {
      const { id, qtd_pessoas, cidade, date, visitasAdicionais, ...otherProps } = visita;
      let dataVisita = new Date(date) ?? new Date();
      const cidadeSalvar = cidade.label ? cidade.label : 'OUTROS';

      const newVisita = await prismaClient.visitas.create({
        data: {
          id: visita.id,
          nome: visita.nome,
          cpf: visita.cpf,
          date: dataVisita,
          empresa: visita.empresa,
          qtd_pessoas: qtd_pessoas ? parseInt(qtd_pessoas) : null,
          telefone: visita.telefone,
          cargo: visita.cargo,
          cidade: cidadeSalvar,
          estado: visita.estado,
          pais: visita.pais,
          descricao: visita.descricao,
        },
      });

      if (visitasAdicionais?.length > 0) {
        await Promise.all(visitasAdicionais.map(async (visitanteAdicional) => {
          const newReg = await prismaClient.visitasAdicionais.create({
            data: {
              nome: visitanteAdicional.nome,
              cpf: visitanteAdicional.cpf ? visitanteAdicional.cpf : '',
              telefone: visitanteAdicional.telefone,
              passaporte: visitanteAdicional.passaporte,
              cargo: visitanteAdicional.cargo,
              extrangeiro: visitanteAdicional.extrangeiro,
              visitasId: newVisita.id,
            },
          });
        }));
      }
      return true;
    } catch (e) {
      console.log("🚀 ~ insereVisita ~ e:", e);
      return false;
    }
  },

  async atualizavisita(visita: Visita) {
    try {
      const { id, qtd_pessoas, cidade, date, visitasAdicionais, ...otheProps } = visita;
      let dataVisita = new Date(date) ?? new Date()
      const newVisita = await prismaClient.visitas.update({
        where: { id },
        data: {
          id: visita.id,
          nome: visita.nome,
          cpf: visita.cpf,
          date: dataVisita,
          empresa: visita.empresa,
          telefone: visita.telefone,
          cargo: visita.cargo,
          descricao: visita.descricao,
        }
      });

      if (visitasAdicionais?.length > 0) {
        await Promise.all(visitasAdicionais.map(async (visitanteAdicional) => {
          const newReg = await prismaClient.visitasAdicionais.update({
            where: { id: visitanteAdicional.id },
            data: {
              nome: visitanteAdicional.nome,
              cpf: visitanteAdicional.cpf,
              cargo: visitanteAdicional.cargo,
              passaporte: visitanteAdicional.passaporte,
              telefone: visitanteAdicional.telefone,
            },
          });
        }));
      }
      return true;
    } catch (e) {
      console.log("🚀 ~ AtualizaVisita ~ e:", e);
      return false;
    }
  },

  async getById(id: number) {
    try {
      let result = await prismaClient.visitas.findUnique({ where: { id } });
      return result;
    } catch (e) {
      console.log(e);
      return false;
    }
  },

  async getByAddId(id: number) {
    try {
      const vitantePrincipal = await prismaClient.visitas.findUnique({ where: { id } });

      const visitantesAdicionais = await prismaClient.visitasAdicionais.findMany({
        where: {
          visitasId: id
        },
        select: {
          id: true,
          nome: true,
          cpf: true,
          cargo: true,
          telefone: true,
          passaporte: true,
          extrangeiro: true,
        }
      });

      return visitantesAdicionais;

    } catch (e) {
      console.log(e);
      return false;
    }
  },

  async exclui(id: number) {
    try {
      const visitantesAdicionais = await prismaClient.visitasAdicionais.findMany({
        where: {
          visitasId: id
        },
        select: {
          id: true
        }
      });

      await prismaClient.visitasAdicionais.deleteMany({
        where: {
          visitasId: id
        }
      });

      await prismaClient.visitas.delete({ where: { id } });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  },

  async insereVisitaAdicionais(visita) {
    try {
      if (visita.visitasAdicionais?.length > 0) {
        await Promise.all(visita.visitasAdicionais.map(async (visitanteAdicional) => {
          await prismaClient.visitasAdicionais.create({
            data: {
              nome: visitanteAdicional.nome,
              cpf: visitanteAdicional.cpf ? visitanteAdicional.cpf : '',
              telefone: visitanteAdicional.telefone,
              passaporte: visitanteAdicional.passaporte,
              cargo: visitanteAdicional.cargo,
              extrangeiro: visitanteAdicional.extrangeiro,
              visitasId: parseInt(visitanteAdicional.visitasId, 10),
            },
          });

          const visitantePrincipal = await prismaClient.visitas.findUnique({
            where: {
              id: parseInt(visitanteAdicional.visitasId, 10),
            },
            select: {
              qtd_pessoas: true
            }
          });
          const pessoasAdicionais = visita.visitasAdicionais.length;
          const totalPessoas = visitantePrincipal.qtd_pessoas + pessoasAdicionais;

          const newReg = await prismaClient.visitas.update({
            where: {
              id: parseInt(visitanteAdicional.visitasId, 10),
            },
            data: {
              qtd_pessoas: totalPessoas,
            },
          });
        }));
      }
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
};

export { VisitasService };