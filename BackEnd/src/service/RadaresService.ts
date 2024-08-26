import prismaClient from "../prisma";
import { Cameras, ChamadoComNumeroCamera, Chamados, Radares } from "../types";

const RadaresService = {
  async listaRadares() {
    try {
      let results = await prismaClient.radares.findMany({
        orderBy: { id: "asc" },
        include: {
          faixas: true
        }
      });
      return results;
    } catch (e) {

      return false;
    }
  },

  async atualizaRadar(cam: Cameras, username: any) {
    try {
      const { id, ...otheProps } = cam;
      const antigo = await prismaClient.radares.findUnique({
        where: { id },

      })
      await prismaClient.historico.create({
        data: {
          id_camera: antigo.id,
          latitude_antigo: antigo.latitude,
          longitude_antigo: antigo.longitude,
          data: new Date(),
          user_name: `Alterado por ${username}`
        }
      })
      const newCameras = await prismaClient.radares.update({
        where: { id },
        data: {
          latitude: cam.latitude,
          longitude: cam.longitude,
          tipo_camera: cam.tipo_camera
        }
      });

      return true;
    } catch (e) {

      return false;
    }
  },

  async atualizaRadarMapa(cam: Radares, username: any, id: number) {
    try {
      const newRadar = await prismaClient.radares.update({
        where: { id },
        data: {
          latitude: cam.latitude,
          longitude: cam.longitude,
        }
      });

      return true;
    } catch (e) {
      console.log("🚀 ~ atualizaRadarMapa ~ e:", e)

      return false;
    }
  },
};

export { RadaresService };
