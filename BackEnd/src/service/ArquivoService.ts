import fs from "fs";
import path from "path";
import prismaClient from "../prisma";

class ArquivoService {
    async insereArquivo(files: any, idChamado: number) {
        let fileName,
            arquivos = [];
        const keys = Object.keys(files);
        try {
            if (keys.length > 0) {
                // Verifique se a pasta existe e crie se não existir
                const folderPath = process.env.FOLDER;
                if (!fs.existsSync(folderPath)) {
                    fs.mkdirSync(folderPath, { recursive: true });
                }

                for (let index = 0; index < keys.length; index++) {
                    const element = files[keys[index]];
                    fileName = `${Math.floor(Math.random() * 1000)}-${new Date().getTime()}-${element.name}`
                    // Verifique se element.path existe e é uma string
                    if (typeof element.path === 'string') {
                        const filePath = element.path;
                        fs.copyFileSync(filePath, path.join(folderPath, fileName));
                        const arquivo = await prismaClient.arquivoChamado.create({
                            data: {
                                url: fileName,
                                nome: element.name,
                                id_chamados: idChamado
                            }
                        })
                        arquivos.push(arquivo);
                    } else {
                        console.error(`O caminho do arquivo para o elemento ${index} não é uma string.`);
                    }
                }
            }
            // io.of("/csi-api/io").emit("listaOcorrencia", "novaImagem");
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
            // io.of("/153-api/io").emit("listaOcorrencia", "novaImagem");
            return fotoPath;
        } catch (error) {
            return false
        }
    }

    async getArquivoId(arquivo: string) {
        try {
            const result = await prismaClient.arquivoChamado.findFirst({
                where: {
                    url: arquivo
                }
            })
            return result
        } catch (error) {
            return error
        }
    }

    async deleteArquivo(arquivo: string) {
        try {
            const result = await prismaClient.arquivoChamado.findFirst({
                where: {
                    url: arquivo
                }
            })
            const deleteArquivo = await prismaClient.arquivoChamado.delete({
                where: {
                    id: result.id
                }
            })
            const filePath = path.join(process.env.FOLDER, arquivo);
            fs.unlinkSync(filePath)
            return true
        } catch (error) {
            return error
        }
    }
}
export { ArquivoService };