import { Router } from "express";
import ensureHasAcess, { ensureAuthenticated } from "./middleware/ensureAuthenticated";
import { AuthenticateUserController } from "./controllers/AuthController";
import { ServicosController } from "./controllers/ServicosController";

const router = Router();
const routerFormData = Router();

//AUTH
router.post("/Login", new AuthenticateUserController().signin);
router.post("/Cadastro", new AuthenticateUserController().cadastrarUsuario);
router.post("/EnviarCodigo", new AuthenticateUserController().enviarCodigo);
router.post("/ValidarCodigo", new AuthenticateUserController().verificacaoDeCodigo);

//SERVIÇOS
routerFormData.get("/Servicos", ensureAuthenticated, ServicosController.listaServicos)

export { router, routerFormData };