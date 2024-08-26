import prismaClient from "../prisma";
import { NaturezaOcorrencia } from "../types";

class NaturezaOcorrenciaService {

    async listaNaturezaOcorrencia(ativo?: boolean) {
        try {
            let results = await prismaClient.tipoNatureza.findMany({
                where: {
                    ativo: ativo ? undefined : true
                },
                orderBy: { id: "asc" }
            });
            return results;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async insereNaturezaOcorrencia(naturezaOcorrencia: NaturezaOcorrencia, id_user: string) {
        try {
            const { id, descricao, ...otherProps } = naturezaOcorrencia;
            const reg = await prismaClient.tipoNatureza.create({
                data: {
                    descricao: descricao,
                    codigo: descricao.split('-')[0].trim(),
                    ...otherProps,
                },
            });
            return reg;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async getNaturezaOcorrencia(id: number) {
        try {
            let result = await prismaClient.tipoNatureza.findFirst({
                where: { id: id, ativo: true },
            });
            return result;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async atualizaNaturezaOcorrencia(naturezaOcorrencia: NaturezaOcorrencia, id_user: string) {
        try {
            const { id, ...otherProps } = naturezaOcorrencia;

            const reg = await prismaClient.tipoNatureza.update({
                where: { id },
                data: {
                    ...otherProps,
                },
            });
            return reg;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
}
export { NaturezaOcorrenciaService };
