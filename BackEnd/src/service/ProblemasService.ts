import prismaClient from "../prisma";
import { Cameras } from "../types";
import { ArquivoProblemaService } from "./ArquivoProblemaService";
import path from "path";

const ProblemasService = {
    async listaDeProblemas() {
        try {
            let results = await prismaClient.cameras.findMany({
                orderBy: { numero_camera: "asc" },
                include: {
                    ArquivoProblema: true,
                    chamados: {
                        where: {
                            atualizacoes: "EM ANDAMENTO",
                            NOT: {
                                motivo: "PODA"
                            }
                        },
                        select: {
                            protocolo: true,
                        }
                    }
                }
            });

            const resultsComFotoEProtocolo = results.map(problema => {
                const protocolo = problema.chamados.length > 0 ? problema.chamados[0].protocolo : null;

                if (problema.ArquivoProblema.length === 0) {
                    return {
                        ...problema,
                        protocolo: protocolo
                    };
                } else {
                    return problema.ArquivoProblema.map(arquivo => ({
                        ...problema,
                        foto: arquivo.url,
                        protocolo: protocolo
                    }));
                }
            }).flat();

            return resultsComFotoEProtocolo;
        } catch (e) {
            console.error(e);
            return false;
        }
    },

    async listaDeProblemasTudoCertoSim() {
        try {
            let results = await prismaClient.cameras.findMany({
                orderBy: { numero_camera: "asc" },
                where: { tudoCerto: false },
                include: {
                    ArquivoProblema: true,
                    chamados: {
                        where: {
                            atualizacoes: "EM ANDAMENTO",
                            NOT: {
                                motivo: "PODA"
                            }
                        },
                        select: {
                            protocolo: true,
                        }
                    }
                }
            });

            const resultsComFotoEProtocolo = results.map(problema => {
                const protocolo = problema.chamados.length > 0 ? problema.chamados[0].protocolo : null;

                if (problema.ArquivoProblema.length === 0) {
                    return {
                        ...problema,
                        protocolo: protocolo
                    };
                } else {
                    return problema.ArquivoProblema.map(arquivo => ({
                        ...problema,
                        foto: arquivo.url,
                        protocolo: protocolo
                    }));
                }
            }).flat();

            return resultsComFotoEProtocolo;
        } catch (e) {
            console.error(e);
            return false;
        }
    },

    async listaDeProblemasTudoCertoNao() {
        try {
            let results = await prismaClient.cameras.findMany({
                orderBy: { numero_camera: "asc" },
                where: { tudoCerto: true },
                include: {
                    ArquivoProblema: true,
                    chamados: {
                        where: {
                            atualizacoes: "EM ANDAMENTO",
                            NOT: {
                                motivo: "PODA"
                            }
                        },
                        select: {
                            protocolo: true,
                        }
                    }
                }
            });

            const resultsComFotoEProtocolo = results.map(problema => {
                const protocolo = problema.chamados.length > 0 ? problema.chamados[0].protocolo : null;

                if (problema.ArquivoProblema.length === 0) {
                    return {
                        ...problema,
                        protocolo: protocolo
                    };
                } else {
                    return problema.ArquivoProblema.map(arquivo => ({
                        ...problema,
                        foto: arquivo.url,
                        protocolo: protocolo
                    }));
                }
            }).flat();

            return resultsComFotoEProtocolo;
        } catch (e) {
            console.error(e);
            return false;
        }
    },

    async atualizaProblema(cameras: Cameras, file: any) {
        const serviceArquivo = new ArquivoProblemaService()
        let arquivos;
        try {
            const tudoCerto = cameras.tudoCerto === 'false' ? false : Boolean(cameras.tudoCerto);
            const { id, problema, ...otherProps } = cameras;

            const newCameras = await prismaClient.cameras.update({
                where: { id },
                data: {
                    tudoCerto: tudoCerto,
                    problema: tudoCerto ? cameras.problema : '',
                    dataConferenciaProblema: new Date(),
                    conferidoPor: cameras.conferidoPor,
                    observacoes: cameras.observacoes,
                }
            });

            if (file) {
                const idProblema = newCameras.id
                arquivos = await serviceArquivo.insereArquivo(file, idProblema)
            }

            console.log(newCameras);
            return true;
        } catch (e) {
            console.log("🚀 ~ e:", e);
            return false;
        }
    },

    async excluiProblema(cameras: Cameras) {
        const { id, ...otheProps } = cameras;

        const serviceArquivo = new ArquivoProblemaService();
        let arquivos;
        try {
            let result = await prismaClient.cameras.findUnique({
                where: { id },
            });

            if (result) {
                const idProblema = result.id;
                arquivos = await serviceArquivo.excluiFotoProblema(idProblema);
            }

            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    },

    async getFoto(arquivo: string) {
        try {
            const fotoPath = path.join(process.env.FOLDER, arquivo);
            return fotoPath;
        } catch (error) {
            return false
        }
    },

    async getProblemaById(id: number) {
        try {
            let results = await prismaClient.cameras.findUnique({
                where: { id },
                include: {
                    ArquivoProblema: true,
                    chamados: {
                        select: {
                            protocolo: true,
                        }
                    }
                }
            });

            const protocolo = results?.chamados.length > 0 ? results.chamados[0].protocolo : null;

            const resultComProtocolo = {
                ...results,
                protocolo: protocolo
            };

            return resultComProtocolo;
        } catch (e) {
            console.error("Erro", e);
            return false;
        }
    }

};

export { ProblemasService };