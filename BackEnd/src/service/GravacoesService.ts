import prismaClient from "../prisma";
import { Cameras } from "../types";

const GravacoesService = {
    async listaDeGravacao() {
        try {
            let results = await prismaClient.cameras.findMany({
                orderBy: { numero_camera: "asc" },
            });
            return results;
        } catch (e) {
            return false;
        }
    },

    async atualizaGravacao(cameras: Cameras) {
        try {
            const { id, diasGravados, ...otheProps } = cameras;

            const Dias = (60 - parseInt(diasGravados)).toString();

            const newCameras = await prismaClient.cameras.update({
                where: { id },
                data: {
                    diasGravados: cameras.diasGravados,
                    diasFaltando: Dias,
                    dataConferenciaGravacao: new Date(),
                }
            });
            console.log(newCameras)
            return true;
        } catch (e) {
            console.log("🚀 ~ e:", e)
            return false;
        }
    },

    async getGravacaoById(id: number) {
        try {
            let result = await prismaClient.cameras.findUnique({
                where: { id },
            });

            return result;
        } catch (e) {
            console.error("Erro", e);
            return false;
        }
    },
};

export { GravacoesService };