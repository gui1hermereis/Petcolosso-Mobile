import prismaClient from "../prisma";
import { Produtos } from "../types";
import path from "path";

const ProdutosService = {
    async listaProdutos() {
        try {
            let results = await prismaClient.produto.findMany({
            });
            return results;
        } catch (e) {
            console.error("Erro ao buscar Serviços:", e);
            return false;
        }
    },
}
export { ProdutosService };