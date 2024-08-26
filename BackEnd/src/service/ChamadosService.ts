import prismaClient from "../prisma";
import { Chamados } from "../types";
import { ArquivoService } from "./ArquivoService";
import path from "path";

const ChamadosService = {
    async listaChamados() {
        try {
            let results = await prismaClient.chamados.findMany({
                orderBy: { data_abertura: "desc" },
                where: {
                    status: false,
                    atualizacoes: "EM ANDAMENTO",
                    NOT: [
                        { motivo: "PODA" }
                    ]
                },

                include: {
                    cameras: {
                        select: {
                            nome: true,
                            numero_camera: true,
                            novo_nome: true,
                            contrato: true,
                            designacao: true,
                            endereco: true,
                            bairro: true,
                            regiao: true,
                        }
                    },
                }
            });
            return results;
        } catch (e) {
            console.error("Erro ao buscar chamados inativos:", e);
            return false;
        }
    },

    async listaChamadosAbertos() {
        try {
            let results = await prismaClient.chamados.findMany({
                orderBy: { data_abertura: "desc" },
                where: {
                    status: false,
                    atualizacoes: "EM ANDAMENTO",
                    NOT: [
                        { motivo: "PODA" },
                        { motivo: "REALOCAÇÃO" }
                    ]
                },

                include: {
                    cameras: {
                        select: {
                            nome: true,
                            numero_camera: true,
                            novo_nome: true,
                            contrato: true,
                            designacao: true,
                            endereco: true,
                            bairro: true,
                            regiao: true,
                        }
                    },
                }
            });
            return results;
        } catch (e) {
            console.error("Erro ao buscar chamados inativos:", e);
            return false;
        }
    },

    async listaChamadosInativos() {
        try {
            let results = await prismaClient.chamados.findMany({
                orderBy: { data_abertura: "desc" },
                where: {
                    status: true,
                    atualizacoes: "CONCLUIDO/VALIDADO",
                    NOT: [
                        { motivo: "PODA" }
                    ]
                },
                include: {
                    cameras: {
                        select: {
                            nome: true,
                            numero_camera: true,
                            novo_nome: true,
                            contrato: true,
                            designacao: true,
                            endereco: true,
                            bairro: true,
                            regiao: true
                        }
                    }
                }
            });
            return results;
        } catch (e) {
            console.error("Erro ao buscar chamados inativos:", e);
            return false;
        }
    },

    async listaChamadoSolucionados() {
        try {
            let results = await prismaClient.chamados.findMany({
                orderBy: { data_abertura: "desc" },
                where: {
                    status: false,
                    atualizacoes: "SOLUCIONADO",
                    NOT: {
                        motivo: "PODA",
                    }
                },
                include: {
                    cameras: {
                        select: {
                            nome: true,
                            numero_camera: true,
                            novo_nome: true,
                            contrato: true,
                            designacao: true,
                            endereco: true,
                            bairro: true,
                            regiao: true,
                        }
                    },
                }
            });
            return results;
        } catch (e) {

            return false;
        }
    },

    async listaChamadosDuplicados() {
        try {
            let results = await prismaClient.chamados.findMany({
                orderBy: { id_camera: "asc" },
                where: {
                    status: false,
                    NOT: [
                        { motivo: "PODA" },
                        { atualizacoes: "CONCLUIDO/VALIDADO" },
                    ]
                },
                include: {
                    cameras: {
                        select: {
                            nome: true,
                            numero_camera: true,
                            novo_nome: true,
                            contrato: true,
                            designacao: true,
                            endereco: true,
                            bairro: true,
                            regiao: true,
                        }
                    },
                }
            });

            let chamadosGroupedByCamera = results.reduce((acc, chamado) => {
                let cameraId = chamado.id_camera;
                if (!acc[cameraId]) {
                    acc[cameraId] = [];
                }
                acc[cameraId].push(chamado);
                return acc;
            }, {} as { [key: string]: typeof results });

            let chamadosWithSameCamera = Object.values(chamadosGroupedByCamera).filter(group => (group as typeof results).length > 1);

            let finalResults = ([] as typeof results).concat(...(chamadosWithSameCamera as typeof results[]));

            return finalResults;
        } catch (e) {
            console.error("Erro ao buscar chamados:", e);
            return false;
        }
    },

    async listaChamadosRealocacoes() {
        try {
            let results = await prismaClient.chamados.findMany({
                orderBy: { data_abertura: "desc" },
                where: {
                    motivo: "REALOCAÇÃO",
                },

                include: {
                    cameras: {
                        select: {
                            nome: true,
                            numero_camera: true,
                            novo_nome: true,
                            contrato: true,
                            designacao: true,
                            endereco: true,
                            bairro: true,
                            regiao: true,
                        }
                    },
                }
            });
            return results;
        } catch (e) {
            console.error("Erro ao buscar chamados inativos:", e);
            return false;
        }
    },

    async listaChamadosRealocacoesAbertas() {
        try {
            let results = await prismaClient.chamados.findMany({
                orderBy: { data_abertura: "desc" },
                where: {
                    status: false,
                    motivo: "REALOCAÇÃO",
                },

                include: {
                    cameras: {
                        select: {
                            nome: true,
                            numero_camera: true,
                            novo_nome: true,
                            contrato: true,
                            designacao: true,
                            endereco: true,
                            bairro: true,
                            regiao: true,
                        }
                    },
                }
            });
            return results;
        } catch (e) {
            console.error("Erro ao buscar chamados inativos:", e);
            return false;
        }
    },

    async listaChamadosRealocacoesFinalizadas() {
        try {
            let results = await prismaClient.chamados.findMany({
                orderBy: { data_abertura: "desc" },
                where: {
                    status: true,
                    motivo: "REALOCAÇÃO",
                },

                include: {
                    cameras: {
                        select: {
                            nome: true,
                            numero_camera: true,
                            novo_nome: true,
                            contrato: true,
                            designacao: true,
                            endereco: true,
                            bairro: true,
                            regiao: true,
                        }
                    },
                }
            });
            return results;
        } catch (e) {
            console.error("Erro ao buscar chamados inativos:", e);
            return false;
        }
    },

    async listaChamadosPodas() {
        try {
            let results = await prismaClient.chamados.findMany({
                orderBy: { data_abertura: "desc" },
                where: {
                    status: false,
                    motivo: "PODA",
                },
                include: {
                    cameras: {
                        select: {
                            nome: true,
                            numero_camera: true,
                            novo_nome: true,
                            contrato: true,
                            designacao: true,
                            endereco: true,
                            bairro: true,
                            regiao: true,
                        }
                    },
                    arquivoChamado: true
                }
            });

            const resultsComFoto = results.flatMap(chamado => {
                if (chamado.arquivoChamado.length === 0) {
                    return [chamado];
                } else {
                    return chamado.arquivoChamado.map(arquivo => ({
                        ...chamado,
                        foto: arquivo.url
                    }));
                }
            });

            return resultsComFoto;
        } catch (e) {
            console.error("Erro ao obter chamados:", e);
            return false;
        }
    },

    async listaChamadosPodasInativos() {
        try {
            let results = await prismaClient.chamados.findMany({
                orderBy: { data_abertura: "desc" },
                where: {
                    status: true,
                    motivo: "PODA"
                },
                include: {
                    cameras: {
                        select: {
                            nome: true,
                            numero_camera: true,
                            novo_nome: true,
                            contrato: true,
                            designacao: true,
                            endereco: true,
                            bairro: true,
                            regiao: true,
                        }
                    },
                    arquivoChamado: true
                }
            });

            const resultsComFoto = results.flatMap(chamado => {
                if (chamado.arquivoChamado.length === 0) {
                    return [chamado];
                } else {
                    return chamado.arquivoChamado.map(arquivo => ({
                        ...chamado,
                        foto: arquivo.url
                    }));
                }
            });

            return resultsComFoto;
        } catch (e) {
            console.error("Erro ao obter chamados:", e);
            return false;
        }
    },

    async abrirChamado(camera: Chamados, file: any) {
        const serviceArquivo = new ArquivoService()
        let arquivos;
        try {
            const newCameras = await prismaClient.chamados.create({
                data: {
                    id_camera: camera.id_camera,
                    data_abertura: new Date(),
                    descricao: camera.descricao,
                    motivo: camera.motivo.value,
                    protocolo: camera.protocolo,
                    solicitante: camera.solicitante,
                    atualizacoes: "EM ANDAMENTO",
                },
            });
            if (file) {
                const idChamado = newCameras.id
                arquivos = await serviceArquivo.insereArquivo(file, idChamado)
            }

            return true;
        } catch (e) {
            console.log("🚀 ~ e:", e)

            return false;
        }
    },

    async atualizaChamado(chamado: Chamados, username: any) {
        try {
            const { id, status, ...otheProps } = chamado;
            const antigo = await prismaClient.chamados.findUnique({
                where: { id },
            })
            await prismaClient.historicoChamado.create({
                data: {
                    id_chamado: antigo.id,
                    id_camera: antigo.id_camera,
                    motivo: antigo.motivo,
                    descricao: antigo.descricao,
                    status: antigo.status,
                    protocolo: antigo.protocolo,
                    user_name: `Alterado por ${username}`,
                    dataAbertura: antigo.data_abertura,
                    dataAlteracao: new Date(),
                    atualizacoes: antigo.atualizacoes,
                }
            })
            const newCameras = await prismaClient.chamados.update({
                where: { id },
                data: {
                    data_atualizacao: new Date(),
                    descricao: chamado.descricao,
                    motivo: chamado.motivo,
                    protocolo: chamado.protocolo,
                    atualizacoes: chamado.atualizacoes,
                    status: status,
                }
            });
            console.log(newCameras)

            return true;
        } catch (e) {
            console.log("🚀 ~ e:", e)
            return false;
        }
    },

    async atualizaChamadoPoda(chamado: Chamados, file: any) {
        const serviceArquivo = new ArquivoService()
        let arquivos;
        try {
            const { id, status, ...otheProps } = chamado;
            const newCameras = await prismaClient.chamados.update({
                where: { id },
                data: {
                    data_atualizacao: new Date(),
                    descricao: chamado.descricao,
                    protocolo: chamado.protocolo,
                }
            });

            if (file) {
                const idChamado = newCameras.id
                arquivos = await serviceArquivo.insereArquivo(file, idChamado)
            }

            return true;
        } catch (e) {
            console.log("🚀 ~ e:", e)
            return false;
        }
    },

    async atualizaChamadoTrue(chamado: Chamados, username: any) {
        try {
            const { id, ...otheProps } = chamado;
            const antigo = await prismaClient.chamados.findUnique({
                where: { id },
            })
            await prismaClient.historicoChamado.create({
                data: {
                    id_chamado: antigo.id,
                    id_camera: antigo.id_camera,
                    motivo: antigo.motivo,
                    descricao: antigo.descricao,
                    status: antigo.status,
                    protocolo: antigo.protocolo,
                    user_name: `Alterado por ${username}`,
                    dataAbertura: antigo.data_abertura,
                    dataAlteracao: new Date(),
                    atualizacoes: antigo.atualizacoes,
                }
            })
            const newCameras = await prismaClient.chamados.update({
                where: { id },
                data: {
                    status: true,
                    atualizacoes: "CONCLUIDO/VALIDADO",
                    data_finalizacao: new Date(),
                }
            });
            return true;
        } catch (e) {
            console.log("🚀 ~ e:", e)
            return false;
        }
    },

    async atualizaChamadoFalse(chamado: Chamados, username: any) {
        try {
            const { id, ...otheProps } = chamado;
            const antigo = await prismaClient.chamados.findUnique({
                where: { id },
            })
            await prismaClient.historicoChamado.create({
                data: {
                    id: antigo.id,
                    id_camera: antigo.id_camera,
                    motivo: antigo.motivo,
                    descricao: antigo.descricao,
                    status: antigo.status,
                    protocolo: antigo.protocolo,
                    user_name: `Alterado por ${username}`,
                    dataAbertura: antigo.data_abertura,
                    dataAlteracao: new Date(),
                    atualizacoes: antigo.atualizacoes,
                }
            })
            const newCameras = await prismaClient.chamados.update({
                where: { id },
                data: {
                    status: false,
                }
            });
            return true;
        } catch (e) {
            console.log("🚀 ~ e:", e)
            return false;
        }
    },

    async excluiChamado(chamado: Chamados, username: any) {
        try {
            const { id, ...otheProps } = chamado;
            const antigo = await prismaClient.chamados.findUnique({
                where: { id },
            })
            await prismaClient.historicoChamado.create({
                data: {
                    id_chamado: antigo.id,
                    id_camera: antigo.id_camera,
                    motivo: antigo.motivo,
                    descricao: antigo.descricao,
                    status: antigo.status,
                    protocolo: antigo.protocolo,
                    user_name: `Alterado por ${username}`,
                    dataAbertura: antigo.data_abertura,
                    dataAlteracao: new Date(),
                    atualizacoes: antigo.atualizacoes,
                }
            })
            const newCameras = await prismaClient.chamados.deleteMany({
                where: { id },
            });
            return true;
        } catch (e) {
            console.log("🚀 ~ e:", e)
            return false;
        }
    },

    async getChamadoById(id: number) {
        try {
            let result = await prismaClient.chamados.findUnique({
                where: { id },
                include: {
                    arquivoChamado: true,
                    cameras: {
                        select: {
                            novo_nome: true,
                            endereco: true,
                            bairro: true,
                            regiao: true,
                            contrato: true,
                            designacao: true
                        }
                    },
                }
            });

            return result;
        } catch (e) {
            console.error("Erro ao obter chamado:", e);
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

    async listaHistoricoChamados() {
        try {
            let results = await prismaClient.historicoChamado.findMany({
                orderBy: { dataAlteracao: "desc" },
                where: {
                    NOT: {
                        motivo: "PODA"
                    }
                },
                include: {
                    cameras: {
                        select: {
                            numero_camera: true
                        }
                    },
                }
            });
            return results;
        } catch (e) {
            return false;
        }
    },
};

export { ChamadosService };
