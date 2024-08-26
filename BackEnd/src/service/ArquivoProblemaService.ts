import fs from "fs";
import path from "path";
import prismaClient from "../prisma";

class ArquivoProblemaService {
    async insereArquivo(files: any, idProblema: number) {
        let fileName, arquivos = [];
        const keys = Object.keys(files);

        try {
            if (keys.length > 0) {
                const folderPath = process.env.FOLDER;
                if (!fs.existsSync(folderPath)) {
                    fs.mkdirSync(folderPath, { recursive: true });
                }

                const arquivoExistente = await prismaClient.arquivoProblema.findFirst({
                    where: {
                        id_camera: idProblema
                    }
                });

                if (arquivoExistente) {
                    const caminhoArquivoAntigo = path.join(folderPath, arquivoExistente.url);
                    fs.unlinkSync(caminhoArquivoAntigo);
                    await prismaClient.arquivoProblema.delete({
                        where: {
                            id: arquivoExistente.id
                        }
                    });
                }

                for (let index = 0; index < keys.length; index++) {
                    const element = files[keys[index]];
                    fileName = `${Math.floor(Math.random() * 1000)}-${new Date().getTime()}-${element.name}`;
                    if (typeof element.path === 'string') {
                        const filePath = element.path;
                        fs.copyFileSync(filePath, path.join(folderPath, fileName));
                        const arquivo = await prismaClient.arquivoProblema.create({
                            data: {
                                url: fileName,
                                nome: element.name,
                                id_camera: idProblema
                            }
                        });
                        arquivos.push(arquivo);
                    } else {
                        console.error(`O caminho do arquivo para o elemento ${index} não é uma string.`);
                    }
                }
            }
            return arquivos;
        } catch (error) {
            console.log(error);
            return [
                error,
                "erro ao inserir arquivo"
            ];
        }
    }

    async getArquivo(arquivo: string) {
        try {
            const fotoPath = path.join(process.env.FOLDER, arquivo);
            return fotoPath;
        } catch (error) {
            return false;
        }
    }

    async getArquivoId(arquivo: string) {
        try {
            const result = await prismaClient.arquivoProblema.findFirst({
                where: {
                    url: arquivo
                }
            });
            return result;
        } catch (error) {
            return error;
        }
    }

    async deleteArquivo(arquivo: string) {
        try {
            const result = await prismaClient.arquivoProblema.findFirst({
                where: {
                    url: arquivo
                }
            });
            if (result) {
                await prismaClient.arquivoProblema.delete({
                    where: {
                        id: result.id
                    }
                });
                const filePath = path.join(process.env.FOLDER, arquivo);
                fs.unlinkSync(filePath);
            }
            return true;
        } catch (error) {
            return error;
        }
    }

    async excluiFotoProblema(idProblema: number) {
        try {
            await prismaClient.arquivoProblema.deleteMany({
                where: {
                    id_camera: idProblema,
                }
            });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

export { ArquivoProblemaService };
