import prismaClient from "../prisma";
import { Ocorrencias } from "../types";

const OcorenciasCamerasService = {
  async listaOcorrenciaCameras() {
    try {
      let results = await prismaClient.ocorrenciasCameras.findMany({
        orderBy: { id: "asc" },
        where: {
          OR: [
            { status: { not: "FINALIZADO" } },
            { status: null }
          ]
        },
        include: {
          ocorrenciaPivo: {
            include: {
              Cameras: {
                select: {
                  numero_camera: true
                }
              }
            }
          },
          cameras: {
            select: {
              numero_camera: true
            }
          },
          natureza: {
            select: {
              descricao: true
            }
          }
        }
      });
      return results;
    } catch (e) {
      return false;
    }
  },

  async listaOcorrenciaCamerasFinalizadas() {
    try {
      let results = await prismaClient.ocorrenciasCameras.findMany({
        where: { status: "FINALIZADO" },
        orderBy: { id: "asc" },
        include: {
          ocorrenciaPivo: {
            include: {
              Cameras: {
                select: {
                  numero_camera: true
                }
              }
            }
          },
          cameras: {
            select: {
              numero_camera: true
            }
          }
        }
      });
      return results;
    } catch (e) {

      return false;
    }
  },

  async listaPegouNaCamera() {
    try {
      let results = await prismaClient.ocorrenciasCameras.findMany({
        where: { captura: true },
        orderBy: { id: "asc" },
        include: {
          ocorrenciaPivo: {
            include: {
              Cameras: {
                select: {
                  numero_camera: true
                }
              }
            }
          },
          cameras: {
            select: {
              numero_camera: true
            }
          }
        }
      });
      return results;
    } catch (e) {

      return false;
    }
  },
  async getById(id: number) {
    try {
      let result = await prismaClient.ocorrenciasCameras.findUnique({
        where: { id },
        include: {
          cameras: true,
          natureza: true
        }
      });
      return result;
    } catch (e) {

      return false;
    }
  },
  async abrirOcorrenciaCamera(camera: Ocorrencias, createdUsername: string, instituicao: string) {
    try {
      const { id, cameras, dataOcorrencia, ...otheProps } = camera;
      let cams = otheProps.allCam
      const newOcorrenciaCameras = await prismaClient.ocorrenciasCameras.create({
        data: {
          id_camera: id,
          dataInicio: camera.dataInicio ?? '',
          dataFim: camera.dataFim ?? '',
          id_natureza: camera.natureza ? camera.natureza.id : null,
          origem: camera.origem ? camera.origem.value : 'MONITORAMENTO EM TEMPO REAL',
          empenhoVtr: camera.empenhoVtr,
          conduzirDp: camera.conduzirDp,
          detido: camera.detido,
          qtd_detido: camera.qtd_detido ? camera.qtd_detido.value : null,
          procurado: camera.procurado ? camera.procurado.value : null,
          desaparecido: camera.desaparecido,
          flagrante: camera.flagrante,
          veiculo: camera.veiculo,
          qtd_veiculo: camera.qtd_veiculo ? camera.qtd_veiculo.value : null,
          boletimOcorrencia: camera.boletimOcorrencia,
          protocolo: camera.protocolo,
          data: new Date(),
          descricao: camera.descricao,
          user_name: createdUsername,
          instituicao: instituicao,
          dataOcorrencia: camera.dataOcorrencia,
          status: 'EM ANDAMENTO',
          captura: camera.captura,
          plantao: camera.plantao,
          imgSalva: camera.imgSalva,
        },
      });
      if (cams?.length > 0) {
        for (let index = 0; index < cams.length; index++) {
          const element = cams[index];
          const cam = element
          const newReg = await prismaClient.ocorrenciaPivo.create({
            data: {
              camerasId: cam.value,
              ocorrenciasCamerasId: newOcorrenciaCameras.id,
              dataInicio: cam.dataInicio ?? '123',
              dataFim: cam.dataFim ?? '',
            },
          });
        }
      }
      return true;
    } catch (e) {
      console.log("🚀 ~ abrirOcorrenciaCamera ~ e:", e)

      return false;
    }
  },

  async atualizaOcorrencia(camera: Ocorrencias, username: any) {
    try {
      const { id, cameras, dataOcorrencia, ocorrenciaPivo, ...otheProps } = camera;
      const antigo = await prismaClient.ocorrenciasCameras.findUnique({
        where: { id },
      })
      await prismaClient.historicoOcorrencias.create({
        data: {
          id_ocorrencia: antigo.id,
          id_camera: antigo.id_camera,
          dataInicio: antigo.dataInicio,
          dataFim: antigo.dataFim ?? '',
          id_natureza: antigo.id_natureza,
          origem: antigo.origem,
          empenhoVtr: antigo.empenhoVtr,
          conduzirDp: antigo.conduzirDp,
          detido: antigo.detido,
          qtd_detido: antigo.qtd_detido,
          procurado: antigo.procurado,
          desaparecido: antigo.desaparecido,
          flagrante: antigo.flagrante,
          veiculo: antigo.veiculo,
          qtd_veiculo: antigo.qtd_veiculo,
          boletimOcorrencia: antigo.boletimOcorrencia,
          protocolo: antigo.protocolo,
          descricao: antigo.descricao,
          instituicao: antigo.instituicao,
          dataOcorrencia: antigo.dataOcorrencia,
          status: 'EM ANDAMENTO',
          captura: antigo.captura,
          plantao: antigo.plantao,
          imgSalva: antigo.imgSalva,
          dataAbertura: antigo.data,
          dataAlteracao: new Date(),
          user_name: `Alterado por ${username}`,
        }
      })
      const editOcorrenciaCameras = await prismaClient.ocorrenciasCameras.update({
        where: { id },
        data: {
          dataInicio: camera.dataInicio ?? '',
          dataFim: camera.dataFim ?? '',
          //id_natureza: camera.id_natureza,
          origem: camera.origem,
          empenhoVtr: camera.empenhoVtr,
          conduzirDp: camera.conduzirDp,
          detido: camera.detido,
          qtd_detido: camera.qtd_detido ? camera.qtd_detido.value : null,
          procurado: camera.procurado ? camera.procurado.value : null,
          desaparecido: camera.desaparecido,
          flagrante: camera.flagrante,
          veiculo: camera.veiculo,
          qtd_veiculo: camera.qtd_veiculo ? camera.qtd_veiculo.value : null,
          boletimOcorrencia: camera.boletimOcorrencia,
          protocolo: camera.protocolo,
          descricao: camera.descricao,
          dataOcorrencia: camera.dataOcorrencia,
          captura: camera.captura,
          imgSalva: camera.imgSalva,
          plantao: camera.plantao,
        },
      });
      console.log(editOcorrenciaCameras)

      if (ocorrenciaPivo?.length > 0) {
        await Promise.all(ocorrenciaPivo.map(async (ocorrenciaPivo) => {
          const newReg = await prismaClient.ocorrenciaPivo.update({
            where: { id: ocorrenciaPivo.id },
            data: {
              dataInicio: ocorrenciaPivo.dataInicio,
              dataFim: ocorrenciaPivo.dataFim,
            },
          });
        }));
      }
      console.log(ocorrenciaPivo)

      return true;
    } catch (e) {
      console.log("🚀 ~ Alterar Ocorrencia Camera ~ e:", e)
      return false;
    }
  },
  async getOcorrenciaCamerasById(id: number) {
    try {
      let result = await prismaClient.ocorrenciasCameras.findUnique({
        where: { id },
      });

      return result;
    } catch (e) {
      console.error("Erro ao obter chamado:", e);
      return false;
    }
  },

  async getOcorrenciaCamerasByAddId(id: number) {
    try {
      const vitantePrincipal = await prismaClient.ocorrenciasCameras.findUnique({ where: { id } });

      // Exclua os visitantes adicionais associados à visita
      const ocorrenciasAdicionais = await prismaClient.ocorrenciaPivo.findMany({
        where: {
          ocorrenciasCamerasId: id
        },
        select: {
          id: true,
          camerasId: true,
          dataInicio: true,
          dataFim: true,
        }
      });

      return ocorrenciasAdicionais;

    } catch (e) {
      console.log(e);
      return false;
    }
  },

  async finaliza(id: number, username: any) {
    try {
      const antigo = await prismaClient.ocorrenciasCameras.findUnique({
        where: { id },
      })
      await prismaClient.historicoOcorrencias.create({
        data: {
          id_ocorrencia: antigo.id,
          id_camera: antigo.id_camera,
          dataInicio: antigo.dataInicio,
          dataFim: antigo.dataFim ?? '',
          id_natureza: antigo.id_natureza,
          origem: antigo.origem,
          empenhoVtr: antigo.empenhoVtr,
          conduzirDp: antigo.conduzirDp,
          detido: antigo.detido,
          qtd_detido: antigo.qtd_detido,
          procurado: antigo.procurado,
          desaparecido: antigo.desaparecido,
          flagrante: antigo.flagrante,
          veiculo: antigo.veiculo,
          qtd_veiculo: antigo.qtd_veiculo,
          boletimOcorrencia: antigo.boletimOcorrencia,
          protocolo: antigo.protocolo,
          descricao: antigo.descricao,
          instituicao: antigo.instituicao,
          dataOcorrencia: antigo.dataOcorrencia,
          status: 'EM ANDAMENTO',
          captura: antigo.captura,
          plantao: antigo.plantao,
          imgSalva: antigo.imgSalva,
          dataAbertura: antigo.data,
          dataAlteracao: new Date(),
          user_name: `Alterado por ${username}`,
        }
      })
      let result = await prismaClient.ocorrenciasCameras.update({
        where: { id },
        data: { status: "FINALIZADO" }
      });
      return result;
    } catch (e) {
      console.log(e);
      return false;
    }
  },

  async imagemSalva(id: number, username: any) {
    try {
      const antigo = await prismaClient.ocorrenciasCameras.findUnique({
        where: { id },
      })
      await prismaClient.historicoOcorrencias.create({
        data: {
          id_ocorrencia: antigo.id,
          id_camera: antigo.id_camera,
          dataInicio: antigo.dataInicio,
          dataFim: antigo.dataFim ?? '',
          id_natureza: antigo.id_natureza,
          origem: antigo.origem,
          empenhoVtr: antigo.empenhoVtr,
          conduzirDp: antigo.conduzirDp,
          detido: antigo.detido,
          qtd_detido: antigo.qtd_detido,
          procurado: antigo.procurado,
          desaparecido: antigo.desaparecido,
          flagrante: antigo.flagrante,
          veiculo: antigo.veiculo,
          qtd_veiculo: antigo.qtd_veiculo,
          boletimOcorrencia: antigo.boletimOcorrencia,
          protocolo: antigo.protocolo,
          descricao: antigo.descricao,
          instituicao: antigo.instituicao,
          dataOcorrencia: antigo.dataOcorrencia,
          status: antigo.status,
          captura: antigo.captura,
          plantao: antigo.plantao,
          imgSalva: antigo.imgSalva,
          dataAbertura: antigo.data,
          dataAlteracao: new Date(),
          user_name: `Alterado por ${username}`,
        }
      })
      let result = await prismaClient.ocorrenciasCameras.update({
        where: { id },
        data: { imgSalva: true }
      });
      return result;
    } catch (e) {
      console.log(e);
      return false;
    }
  },

  async imagemNaoSalva(id: number, username: any) {
    try {
      const antigo = await prismaClient.ocorrenciasCameras.findUnique({
        where: { id },
      })
      await prismaClient.historicoOcorrencias.create({
        data: {
          id_ocorrencia: antigo.id,
          id_camera: antigo.id_camera,
          dataInicio: antigo.dataInicio,
          dataFim: antigo.dataFim ?? '',
          id_natureza: antigo.id_natureza,
          origem: antigo.origem,
          empenhoVtr: antigo.empenhoVtr,
          conduzirDp: antigo.conduzirDp,
          detido: antigo.detido,
          qtd_detido: antigo.qtd_detido,
          procurado: antigo.procurado,
          desaparecido: antigo.desaparecido,
          flagrante: antigo.flagrante,
          veiculo: antigo.veiculo,
          qtd_veiculo: antigo.qtd_veiculo,
          boletimOcorrencia: antigo.boletimOcorrencia,
          protocolo: antigo.protocolo,
          descricao: antigo.descricao,
          instituicao: antigo.instituicao,
          dataOcorrencia: antigo.dataOcorrencia,
          status: antigo.status,
          captura: antigo.captura,
          plantao: antigo.plantao,
          imgSalva: antigo.imgSalva,
          dataAbertura: antigo.data,
          dataAlteracao: new Date(),
          user_name: `Alterado por ${username}`,
        }
      })
      let result = await prismaClient.ocorrenciasCameras.update({
        where: { id },
        data: { imgSalva: false }
      });
      return result;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  async listaHistoricoOcorrencias() {
    try {
      let results = await prismaClient.historicoOcorrencias.findMany({
        orderBy: { dataAlteracao: "desc" },
        include: {
          cameras: {
            select: {
              numero_camera: true
            }
          },
          natureza: {
            select: {
              descricao: true
            }
          }
        }
      });
      return results;
    } catch (e) {
      return false;
    }
  },
};

export { OcorenciasCamerasService };