import prismaClient from "../prisma";
import { dadosPortalSSP } from "../types";

const DadosPortalSSPService = {
    async listaDados() {
        try {
            let results = await prismaClient.dadosDashboard.findMany({
                orderBy: { id: "desc" },
            });
            return results;
        } catch (e) {

            return false;
        }
    },

    async insereDados(dadosDash: dadosPortalSSP) {
        try {
            const newCameras = await prismaClient.dadosDashboard.create({
                data: {
                    tipo_ocorrencia: dadosDash.tipo_ocorrencia,
                    data: dadosDash.data,
                    quantidade: dadosDash.quantidade,
                },
            });
            return true;
        } catch (e) {
            console.log("🚀 ~ e:", e)
            return false;
        }
    },

    async atualizaDados(dadosDash: dadosPortalSSP) {
        try {
            const { id, ...otheProps } = dadosDash;
            const newCameras = await prismaClient.dadosDashboard.update({
                where: { id },
                data: {
                    tipo_ocorrencia: dadosDash.tipo_ocorrencia,
                    data: dadosDash.data,
                    quantidade: dadosDash.quantidade,
                }
            });
            console.log(newCameras)

            return true;
        } catch (e) {
            console.log("🚀 ~ e:", e)
            return false;
        }
    },

    async getDadosById(id: number) {
        try {
            let result = await prismaClient.dadosDashboard.findUnique({
                where: { id },
            });

            return result;
        } catch (e) {
            console.error("Erro", e);
            return false;
        }
    },
};

export { DadosPortalSSPService };