import prismaClient from "../prisma";
import { Circuitos } from "../types";

const CircuitosService = {

    async listaCircuitos() {
        try {
            let results = await prismaClient.circuitoInterno.findMany({
                orderBy: { id: "desc" },
            });
            return results;
        } catch (e) {

            return false;
        }
    },

    async insereCircuito(circuitos: Circuitos) {
        try {
            const newCameras = await prismaClient.circuitoInterno.create({
                data: {
                    regiao: circuitos.regiao,
                    bairro: circuitos.bairro,
                    endereco: circuitos.endereco,
                    local: circuitos.local,
                    link: circuitos.link,
                    data: new Date(),
                },
            });
            return true;
        } catch (e) {
            console.log("🚀 ~ e:", e)
            return false;
        }
    },

    async atualizaCircuito(circuitos: Circuitos) {
        try {
            const { id, ...otheProps } = circuitos;
            const newCameras = await prismaClient.circuitoInterno.update({
                where: { id },
                data: {
                    regiao: circuitos.regiao,
                    bairro: circuitos.bairro,
                    endereco: circuitos.endereco,
                    local: circuitos.local,
                    link: circuitos.link,
                }
            });
            console.log(newCameras)

            return true;
        } catch (e) {
            console.log("🚀 ~ e:", e)
            return false;
        }
    },

    async getCircuitoById(id: number) {
        try {
            let result = await prismaClient.circuitoInterno.findUnique({
                where: { id },
            });

            return result;
        } catch (e) {
            console.error("Erro", e);
            return false;
        }
    },
};

export { CircuitosService };