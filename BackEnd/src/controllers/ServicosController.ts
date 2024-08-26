import axios from "axios";
import { Request, Response } from "express";
import { ServicosService } from "../service/ServicosService";
import { getUser } from "../utils";

const ServicosController = {
    listaServicos: async (request: Request, response: Response) => {
        try {
            const result = await ServicosService.listaServicos();
            if (result) return response.status(200).json(result);
            else return response.status(400).json({ message: "Erro ao listar Serviços." });
        } catch (err) {
            return response.status(400).json({ message: "Erro ao listar Serviços." });
        }
    },
};

export { ServicosController };