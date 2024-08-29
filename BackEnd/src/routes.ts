import { Router } from "express";
import ensureHasAcess, { ensureAuthenticated } from "./middleware/ensureAuthenticated";
import { AuthenticateUserController } from "./controllers/AuthController";
import { ServicosController } from "./controllers/ServicosController";

const router = Router();
const routerFormData = Router();

//AUTH
router.post("/login", new AuthenticateUserController().signin);
router.post("/cadastro", new AuthenticateUserController().cadastrarUsuario);
router.post("/enviarCodigo", new AuthenticateUserController().enviarCodigo);
router.post("/validarCodigo", new AuthenticateUserController().verificacaoDeCodigo);
router.put("/novaSenha", new AuthenticateUserController().novaSenha);

//SERVIÇOS
routerFormData.get("/servicos", ensureAuthenticated, ServicosController.listaServicos)

export { router, routerFormData };