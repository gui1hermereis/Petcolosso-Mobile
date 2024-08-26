import { Router } from "express";
import ensureHasAcess, { ensureAuthenticated } from "./middleware/ensureAuthenticated";
import formidableMiddleware from "express-formidable";
import { AuthenticateUserController } from "./controllers/AuthController";
import { TesteController } from "./controllers/TesteController";
import { UsuarioController } from "./controllers/UsuarioController";
import { ListaCamerasController } from "./controllers/ListaCamerasController";
import { RadaresController } from "./controllers/RadaresController";
import { NaturezaOcorrenciaController } from "./controllers/NaturezaOcorrenciaController";
import { OcorrenciasCamerasController } from "./controllers/OcorrenciasCamerasController";
import { DashboardController } from "./controllers/DashboardController";
import { VisitasController } from "./controllers/VisitasController";
import { ChamadosController } from "./controllers/ChamadosController";
import { SolicitacoesController } from "./controllers/SolicitacoesController";
import { ProblemasController } from "./controllers/ProblemasController";
import { GravacoesController } from "./controllers/GravacoesController";
import { CircuitosController } from "./controllers/CircuitosController";
import { DadosPortalSSPController } from "./controllers/DadosPortalSSPController";


const dashboardController = new DashboardController();
const router = Router();
const routerFormData = Router();

//AUTH
router.post("/login", new AuthenticateUserController().signin);
router.get("/resetSenha/:id_user", new AuthenticateUserController().resetSenha);
router.put("/alterarSenha", new AuthenticateUserController().alterarSenha);

//USUARIOS
router.get("/usuarios", ensureAuthenticated, UsuarioController.lista);
router.post("/usuarios", ensureAuthenticated, UsuarioController.insere);
router.put("/usuarios", ensureAuthenticated, UsuarioController.atualiza);
router.put("/usuarios/ativa/:id", ensureAuthenticated, UsuarioController.ativa);
router.put("/usuarios/inativa/:id", ensureAuthenticated, UsuarioController.inativa);
router.get("/usuarios/id/:id", ensureAuthenticated, UsuarioController.getById);
router.get("/teste", TesteController.test);

//LISTA CAMERAS
routerFormData.get("/cameras", ensureAuthenticated, ListaCamerasController.lista)
routerFormData.get("/cameras/ativas", ensureAuthenticated, ListaCamerasController.listaAtivas)
routerFormData.get("/cameras/inativas", ensureAuthenticated, ListaCamerasController.listaInativas)
routerFormData.post("/cameras", ensureAuthenticated, formidableMiddleware(), ListaCamerasController.insere)
routerFormData.put("/cameras", ensureAuthenticated, ListaCamerasController.atualiza)
routerFormData.put("/camerasMapa", ensureAuthenticated, ListaCamerasController.atualizaMapa)
router.get("/camerasById/:id", ensureAuthenticated, ListaCamerasController.getById)
router.get("/cameras/verificacao/:id", ensureAuthenticated, ListaCamerasController.verificaChamadosAbertosParaCamera)

//CHAMADOS
routerFormData.get("/chamados", ensureAuthenticated, ChamadosController.listaChamados)
routerFormData.get("/chamados/abertos", ensureAuthenticated, ChamadosController.listaChamadosAbertos)
routerFormData.get("/chamados/inativos", ensureAuthenticated, ChamadosController.listaChamadosInativos)
routerFormData.get("/chamados/solucionados", ensureAuthenticated, ChamadosController.listaChamadoSolucionados)
routerFormData.get("/chamados/duplicados", ensureAuthenticated, ChamadosController.listaChamadosDuplicados)
routerFormData.get("/chamados/realocacoes", ensureAuthenticated, ChamadosController.listaChamadosRealocacoes)
routerFormData.get("/chamados/realocacoes/abertas", ensureAuthenticated, ChamadosController.listaChamadosRealocacoesAbertas)
routerFormData.get("/chamados/realocacoes/finalizadas", ensureAuthenticated, ChamadosController.listaChamadosRealocacoesFinalizadas)
routerFormData.get("/chamados/podas", ensureAuthenticated, ChamadosController.listaChamadosPodas)
routerFormData.get("/chamados/podas/inativos", ensureAuthenticated, ChamadosController.listaChamadosPodasInativos)
routerFormData.get("/chamados/historico", ensureAuthenticated, ChamadosController.listaHistoricoChamados)
routerFormData.get("/chamado/foto/:id", ensureAuthenticated, ChamadosController.getFoto)
router.get("/chamadoById/:id", ensureAuthenticated, ChamadosController.getChamadoById)
routerFormData.post("/chamado", ensureAuthenticated, ChamadosController.abrirChamado)
router.put("/chamado", ensureAuthenticated, ChamadosController.atualizaChamado)
routerFormData.put("/chamado/poda", ensureAuthenticated, ChamadosController.atualizaChamadoPoda)
router.put("/chamado/true", ensureAuthenticated, ChamadosController.atualizaChamadoTrue)
router.put("/chamado/false", ensureAuthenticated, ChamadosController.atualizaChamadoFalse)
router.put("/chamado/exclui", ensureAuthenticated, ChamadosController.excluiChamado)

//RADARES
routerFormData.get("/radares", ensureAuthenticated, RadaresController.lista)
routerFormData.put("/radares", ensureAuthenticated, RadaresController.atualizaRadarMapa)

//NATUREZA OCORRENCIA
router.get("/naturezaOcorrencia/lista", ensureAuthenticated, NaturezaOcorrenciaController.lista)

//OCORRENCIA COM CAMERAS
routerFormData.post("/ocorrencia", ensureAuthenticated, OcorrenciasCamerasController.abrirOcorrenciaCameras)
routerFormData.get("/ocorrenciaById/:id", ensureAuthenticated, OcorrenciasCamerasController.getOcorrenciaById)
routerFormData.get("/ocorrencia/", ensureAuthenticated, OcorrenciasCamerasController.lista)
routerFormData.get("/ocorrencia/finalizadas", ensureAuthenticated, OcorrenciasCamerasController.listaFinalizadas)
routerFormData.get("/ocorrencia/filtro", ensureAuthenticated, OcorrenciasCamerasController.listaPegouNaCamera)
routerFormData.put("/ocorrencia/:id", ensureAuthenticated, OcorrenciasCamerasController.finaliza);
routerFormData.get("/ocorrenciaById/additional/:id", ensureAuthenticated, OcorrenciasCamerasController.getOcorrenciaByAddId)
router.put("/ocorrencia/atualiza", ensureAuthenticated, OcorrenciasCamerasController.atualizaOcorrencia)
router.put("/ocorrencia/ativa/:id", ensureAuthenticated, OcorrenciasCamerasController.imagemSalva);
router.put("/ocorrencia/inativa/:id", ensureAuthenticated, OcorrenciasCamerasController.imagemNaoSalva)
routerFormData.get("/ocorrencia/historico", ensureAuthenticated, OcorrenciasCamerasController.listaHistoricoOcorrencias)

//DASHBOARD
router.get("/painelDashboard/mes/:ano", ensureAuthenticated, dashboardController.getOcorrenciasMes);
router.get("/painelDashboard/allOcorrencias", ensureAuthenticated, dashboardController.getAllOcorrencias);
router.get("/painelDashboard/allPresos", ensureAuthenticated, dashboardController.getAllPresos);
router.get("/painelDashboard/allVeiculos", ensureAuthenticated, dashboardController.getAllVeiculos);
router.get("/painelDashboard/allProcurados", ensureAuthenticated, dashboardController.getAllProcurados);
router.get("/painelDashboard/allPresosDoMes", ensureAuthenticated, dashboardController.getAllPresosDoMes);
router.get("/painelDashboard/allVeiculosDoMes", ensureAuthenticated, dashboardController.getAllVeiculosDoMes);
router.get("/painelDashboard/allFurtos", ensureAuthenticated, dashboardController.getAllFurtos);
router.get("/painelDashboard/allFurtosVeiculo", ensureAuthenticated, dashboardController.getAllFurtosVeiculo);
router.get("/painelDashboard/allRoubos", ensureAuthenticated, dashboardController.getAllRoubos);
router.get("/painelDashboard/allRoubosVeiculo", ensureAuthenticated, dashboardController.getAllRoubosVeiculo);
router.get("/painelDashboard/allHomicidioDoloso", ensureAuthenticated, dashboardController.getAllHomicidioDoloso);
router.get("/painelDashboard/allFurtosPorcentagem", ensureAuthenticated, dashboardController.getAllFurtosPorcentagem);
router.get("/painelDashboard/allFurtosVeiculosPorcentagem", ensureAuthenticated, dashboardController.getAllFurtosVeiculosPorcentagem);
router.get("/painelDashboard/allRoubosPorcentagem", ensureAuthenticated, dashboardController.getAllRoubosPorcentagem);
router.get("/painelDashboard/allRoubosVeiculosPorcentagem", ensureAuthenticated, dashboardController.getAllRoubosVeiculosPorcentagem);
router.get("/painelDashboard/allHomicidioDolosoPorcentagem", ensureAuthenticated, dashboardController.getAllHomicidioDolosoPorcentagem);

//VISITAS
router.get("/visitas", ensureAuthenticated, VisitasController.lista);
router.get("/visitas/passadas", ensureAuthenticated, VisitasController.listaPassadas);
router.post("/visita", ensureAuthenticated, VisitasController.insere);
router.put("/visita", ensureAuthenticated, VisitasController.atualiza);
router.put("/visita/:id", ensureAuthenticated, VisitasController.exclui);
router.get("/visita/id/:id", ensureAuthenticated, VisitasController.getById);
router.post("/visitasAdicionais", ensureAuthenticated, VisitasController.insereAdicionais);
router.get("/visita/additional/id/:id", ensureAuthenticated, VisitasController.getByAddId);

//SOLICITAÇÕES
router.get("/solicitacao", ensureAuthenticated, SolicitacoesController.listaSolicitacoesAtivas);
router.get("/solicitacao/concluidas", ensureAuthenticated, SolicitacoesController.listaSolicitacoesConcluidas);
router.post("/solicitacao", ensureAuthenticated, SolicitacoesController.insereSolicitacao);
router.put("/solicitacao", ensureAuthenticated, SolicitacoesController.atualizaSolicitacao);
router.get("/solicitacao/id/:id", ensureAuthenticated, SolicitacoesController.getSolicitacaoById);
router.put("/solicitacao/conclui/id/:id", ensureAuthenticated, SolicitacoesController.concluiSolicitacao);

//PROBLEMAS
router.get("/problemas", ensureAuthenticated, ProblemasController.listaDeProblemas);
router.get("/problemas/tudoCerto/sim", ensureAuthenticated, ProblemasController.listaDeProblemasTudoCertoSim);
router.get("/problemas/tudoCerto/nao", ensureAuthenticated, ProblemasController.listaDeProblemasTudoCertoNao);
routerFormData.put("/problemas", ensureAuthenticated, ProblemasController.atualizaProblema);
router.get("/problemas/id/:id", ensureAuthenticated, ProblemasController.getProblemaById);
router.put("/problemas/exclui", ensureAuthenticated, ProblemasController.excluiProblema);
routerFormData.get("/problemas/foto/:id", ensureAuthenticated, ProblemasController.getFoto)

//GRAVAÇÕES
router.get("/gravacao", ensureAuthenticated, GravacoesController.listaDeGravacao);
router.put("/gravacao", ensureAuthenticated, GravacoesController.atualizaGravacao);
router.get("/gravacao/id/:id", ensureAuthenticated, GravacoesController.getGravacaoById);

//CIRCUITOS
router.get("/circuitos", ensureAuthenticated, CircuitosController.listaCircuitos);
router.post("/circuitos", ensureAuthenticated, CircuitosController.insereCircuito);
router.put("/circuitos", ensureAuthenticated, CircuitosController.atualizaCircuito);
router.get("/circuitos/id/:id", ensureAuthenticated, CircuitosController.getCircuitoById);

//DADOS DASHBOARD
router.get("/dados", ensureAuthenticated, DadosPortalSSPController.listaDados);
router.post("/dados", ensureAuthenticated, DadosPortalSSPController.insereDados);
router.put("/dados", ensureAuthenticated, DadosPortalSSPController.atualizaDados);
router.get("/dados/id/:id", ensureAuthenticated, DadosPortalSSPController.getDadosById);

export { router, routerFormData };