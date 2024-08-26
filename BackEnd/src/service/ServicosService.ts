import prismaClient from "../prisma";
import { Servicos } from "../types";
import path from "path";

const ServicosService = {
    async listaServicos() {
        try {
            let results = await prismaClient.servicos.findMany({
            });
            return results;
        } catch (e) {
            console.error("Erro ao buscar Serviços:", e);
            return false;
        }
    }
}
export { ServicosService };