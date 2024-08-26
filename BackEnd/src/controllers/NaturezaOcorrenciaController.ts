import { Request, Response } from "express";
import { NaturezaOcorrenciaService } from "../service/NaturezaOcorrenciaService";
import { getUserId, parseBool } from "../utils";

const NaturezaOcorrenciaController = {
    async lista(request: Request, response: Response) {
        try {
            const { ativo } = request.query;
            const service = new NaturezaOcorrenciaService();
            const result = await service.listaNaturezaOcorrencia(parseBool(ativo));
            if (result) return response.status(200).json(result);
            else
                return response
                    .status(400)
                    .json({ message: "Erro ao listar natureza da ocorrência." });
        } catch (err) {
            return response.status(400).json({ message: "Erro ao listar natureza da ocorrência." });
        }
    },

    async insere(request: Request, response: Response) {
        try {
            const naturezaOcorrencia = request.body;
            const service = new NaturezaOcorrenciaService();
            console.log("id_tipo_natureza", naturezaOcorrencia.id_tipo_natureza)
            naturezaOcorrencia.id_tipo_natureza > 0 ?
                naturezaOcorrencia.id_tipo_natureza = parseInt(naturezaOcorrencia.id_tipo_natureza) : null
            const id_usuario = getUserId(request.headers.authorization).toString();
            const result = await service.insereNaturezaOcorrencia(naturezaOcorrencia, id_usuario);
            if (result)
                return response
                    .status(200)
                    .json({ message: "Sucesso ao cadastrar natureza da ocorrência.", result: result });
            else
                return response
                    .status(400)
                    .json({ message: "Erro ao cadastrar natureza da ocorrência." });
        } catch (err) {
            return response
                .status(400)
                .json({ message: "Erro ao cadastrar natureza da ocorrência." });
        }
    },

    async getById(request: Request, response: Response) {
        try {
            const id = parseInt(request.params.id);
            const naturezaOcorrencia = new NaturezaOcorrenciaService();
            const result = await naturezaOcorrencia.getNaturezaOcorrencia(id);
            if (result) return response.status(200).json(result);
            else
                return response
                    .status(400)
                    .json({ message: "Regional não natureza da ocorrência." });
        } catch (err) {
            return response.status(400).json({ message: "Erro ao buscar natureza da ocorrência." });
        }
    },

    async atualiza(request: Request, response: Response) {
        try {
            const naturezaOcorrencia = request.body;
            const service = new NaturezaOcorrenciaService();
            naturezaOcorrencia.id_tipo_natureza > 0 ?
                naturezaOcorrencia.id_tipo_natureza = parseInt(naturezaOcorrencia.id_tipo_natureza) : naturezaOcorrencia.id_tipo_natureza = null
            const id_usuario = getUserId(request.headers.authorization).toString();
            const result = await service.atualizaNaturezaOcorrencia(naturezaOcorrencia, id_usuario);
            if (result)
                return response
                    .status(200)
                    .json({ message: "Sucesso ao alterar natureza da ocorrência.", result: result });
            else
                return response
                    .status(400)
                    .json({ message: "Erro ao alterar natureza da ocorrência." });
        } catch (err) {
            return response
                .status(400)
                .json({ message: "Erro ao alterar natureza da ocorrência." });
        }
    }
}

export { NaturezaOcorrenciaController };
