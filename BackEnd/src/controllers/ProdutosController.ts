import { Request, Response } from "express";
import { ProdutosService } from "../service/ProdutosService";

const ProdutosController = {
    listaServicos: async (request: Request, response: Response) => {
        try {
            const result = await ProdutosService.listaProdutos();
            if (result) return response.status(200).json(result);
            else return response.status(400).json({ message: "Erro ao listar Serviços." });
        } catch (err) {
            return response.status(400).json({ message: "Erro ao listar Serviços." });
        }
    },
};

export { ProdutosController };