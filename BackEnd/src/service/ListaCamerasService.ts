import prismaClient from "../prisma";
import { Cameras } from "../types";

const ListaCamerasService = {
  async listaCameras() {
    try {
      let results = await prismaClient.cameras.findMany({
        orderBy: { numero_camera: "asc" },
      });
      return results;
    } catch (e) {

      return false;
    }
  },

  async listaCamerasAtivas() {
    try {
      let results = await prismaClient.cameras.findMany({
        orderBy: { numero_camera: "asc" },
        where: {
          status: true
        }
      });
      return results;
    } catch (e) {

      return false;
    }
  },

  async listaCamerasInativas() {
    try {
      let results = await prismaClient.cameras.findMany({
        orderBy: { numero_camera: "asc" },
        where: {
          status: false
        }
      });
      return results;
    } catch (e) {

      return false;
    }
  },

  async insereCamera(camera: Cameras) {
    try {
      const { id, status, ...otheProps } = camera;
      const ano = new Date().getFullYear().toString();
      const newCameras = await prismaClient.cameras.create({
        data: {
          bairro: camera.bairro,
          cadastro_hik_vision: camera.cadastro_hik_vision,
          contrato: camera.contrato,
          dados_analiticos: camera.dados_analiticos,
          designacao: camera.designacao,
          endereco: camera.endereco,
          ip: camera.ip,
          latitude: camera.latitude,
          longitude: camera.longitude,
          novo_nome: camera.novo_nome,
          numero_camera: camera.numero_camera,
          regiao: camera.regiao,
          secretaria: camera.secretaria,
          status: true,
          nome: camera.nome,
          tipo_camera: camera.tipo_camera
        },
      });

      return true;
    } catch (e) {
      console.log("🚀 ~ e:", e)
      return false;
    }
  },

  async atualizaCamera(cam: Cameras, username: any) {
    try {
      const { id, ...otheProps } = cam;
      const status = cam.status === 'false' ? false : Boolean(cam.status);
      const antigo = await prismaClient.cameras.findUnique({
        where: { id },
      })
      await prismaClient.historico.create({
        data: {
          id_camera: antigo.id,
          bairro_antigo: antigo.bairro,
          numero_contrato_antigo: antigo.contrato,
          endereco_antigo: antigo.endereco,
          latitude_antigo: antigo.latitude,
          longitude_antigo: antigo.longitude,
          numero_camera_antigo: antigo.numero_camera,
          data: new Date(),
          user_name: `Alterado por ${username}`
        }
      })

      console.log(cam.status)
      const newCameras = await prismaClient.cameras.update({
        where: { id },
        data: {
          bairro: cam.bairro,
          cadastro_hik_vision: cam.cadastro_hik_vision,
          contrato: cam.contrato,
          dados_analiticos: cam.dados_analiticos,
          designacao: cam.designacao,
          endereco: cam.endereco,
          ip: cam.ip,
          latitude: cam.latitude,
          longitude: cam.longitude,
          nome: cam.nome,
          novo_nome: cam.novo_nome,
          numero_camera: cam.numero_camera,
          regiao: cam.regiao,
          status: status,
          secretaria: cam.secretaria,
          tipo_camera: cam.tipo_camera
        }
      });
      console.log("🚀 ~ e:", newCameras)

      return true;
    } catch (e) {
      console.log("🚀 ~ e:", e)
      return false;
    }
  },

  async atualizaCameraMapa(cam: Cameras, username: any, id: number) {
    try {
      const antigo = await prismaClient.cameras.findUnique({
        where: { id },
      })
      await prismaClient.historico.create({
        data: {
          id_camera: antigo.id,
          bairro_antigo: antigo.bairro,
          numero_contrato_antigo: antigo.contrato,
          endereco_antigo: antigo.endereco,
          latitude_antigo: antigo.latitude,
          longitude_antigo: antigo.longitude,
          numero_camera_antigo: antigo.numero_camera,
          data: new Date(),
          user_name: `Alterado por ${username}`
        }
      })
      const newCameras = await prismaClient.cameras.update({
        where: { id },
        data: {
          bairro: cam.bairro,
          cadastro_hik_vision: cam.cadastro_hik_vision,
          contrato: cam.contrato,
          dados_analiticos: cam.dados_analiticos,
          designacao: cam.designacao,
          endereco: cam.rua,
          ip: cam.ip,
          latitude: cam.latitude,
          longitude: cam.longitude,
          nome: cam.nome,
          novo_nome: cam.novo_nome,
          numero_camera: cam.numero_camera,
          regiao: cam.regiao,
          status: true,
          secretaria: cam.secretaria,
          tipo_camera: cam.tipo_camera
        }
      });
      return true;
    } catch (e) {
      console.log("🚀 ~ e:", e)
      return false;
    }
  },

  async getById(id: number) {
    try {
      let result = await prismaClient.cameras.findUnique({
        where: { id },
        include: {
          chamados: true,
          historico: true,
          ocorrencias: true
        }
      });
      return result;
    } catch (e) {
      return false;
    }
  },

  async verificaChamadosAbertosParaCamera(id: number) {
    try {
      const chamado = await prismaClient.chamados.findFirst({
        where: {
          id_camera: id,
          status: false,
          NOT: [
            { motivo: "PODA" },
            { motivo: "REALOCAÇÃO" },
            { atualizacoes: "SOLUCIONADO" },
          ]
        },
        select: {
          motivo: true,
        },
      });

      if (chamado) {
        return {
          aberto: true,
          motivo: chamado.motivo,
        };
      } else {
        return {
          aberto: false,
          motivo: null,
        };
      }
    } catch (e) {
      console.error("Erro ao verificar chamados abertos:", e);
      return {
        aberto: false,
        motivo: null,
      };
    }
  }
};

export { ListaCamerasService };