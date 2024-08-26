import prismaClient from "../prisma";
import { Solicitacoes } from "../types";

const SolicitacoesService = {
    async listaSolicitacoesAtivas() {
        try {
            let results = await prismaClient.solicitacoes.findMany({
                orderBy: { dataSolicitacao: "desc" },
                where: {
                    status: false,
                },
            });
            return results;
        } catch (e) {
            return false;
        }
    },

    async listaSolicitacoesConcluidas() {
        try {
            let results = await prismaClient.solicitacoes.findMany({
                orderBy: { dataSolicitacao: "desc" },
                where: {
                    status: true,
                },
            });
            return results;
        } catch (e) {

            return false;
        }
    },

    async insereSolicitacao(solicitacoes: Solicitacoes) {
        try {
            const newCameras = await prismaClient.solicitacoes.create({
                data: {
                    expediente: solicitacoes.expediente,
                    tipo: solicitacoes.tipo,
                    solicitante: solicitacoes.solicitante,
                    qtde: solicitacoes.qtde,
                    user_name: solicitacoes.user_name,
                    bairro: solicitacoes.bairro,
                    endereco: solicitacoes.endereco,
                    regiao: solicitacoes.regiao,
                    observacoes: solicitacoes.observacoes,
                    dataSolicitacao: new Date(),
                },
            });
            return true;
        } catch (e) {
            console.log("🚀 ~ e:", e)
            return false;
        }
    },

    async atualizaSolicitacao(solicitacoes: Solicitacoes) {
        try {
            const { id, status, ...otheProps } = solicitacoes;
            const newCameras = await prismaClient.solicitacoes.update({
                where: { id },
                data: {
                    expediente: solicitacoes.expediente,
                    tipo: solicitacoes.tipo,
                    solicitante: solicitacoes.solicitante,
                    qtde: solicitacoes.qtde,
                    user_name: solicitacoes.user_name,
                    bairro: solicitacoes.bairro,
                    endereco: solicitacoes.endereco,
                    regiao: solicitacoes.regiao,
                    observacoes: solicitacoes.observacoes,
                    dataSolicitacao: solicitacoes.dataSolicitacao,
                }
            });
            console.log(newCameras)

            return true;
        } catch (e) {
            console.log("🚀 ~ e:", e)
            return false;
        }
    },

    async getSolicitacaoById(id: number) {
        try {
            let result = await prismaClient.solicitacoes.findUnique({
                where: { id },
            });

            return result;
        } catch (e) {
            console.error("Erro", e);
            return false;
        }
    },

    async concluiSolicitacao(id: number) {
        try {
            await prismaClient.solicitacoes.update({
                where: { id },
                data: {
                    status: true,
                }
            });
            return true;
        } catch (e) {
            console.log("🚀 ~ e:", e)
            return false;
        }
    },
};

export { SolicitacoesService };