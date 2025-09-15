import { Router } from "express";
import ensureHasAcess, { ensureAuthenticated } from "./middleware/ensureAuthenticated";
import { AuthenticateUserController } from "./controllers/AuthController";
import { ProdutosController } from "./controllers/ProdutosController";

const router = Router();
const routerFormData = Router();

//AUTH
router.post("/login", new AuthenticateUserController().signin);
router.post("/cadastro", new AuthenticateUserController().cadastrarUsuario);
router.post("/enviarCodigo", new AuthenticateUserController().enviarCodigo);
router.post("/validarCodigo", new AuthenticateUserController().verificacaoDeCodigo);
router.put("/novaSenha", new AuthenticateUserController().novaSenha);

//PRODUTOS
routerFormData.get("/produtos", ensureAuthenticated, ProdutosController.listaServicos)

export { router, routerFormData };