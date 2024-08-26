import { Router } from "express";
import ensureHasAcess, { ensureAuthenticated } from "./middleware/ensureAuthenticated";
import { AuthenticateUserController } from "./controllers/AuthController";
import { ServicosController } from "./controllers/ServicosController";

const router = Router();
const routerFormData = Router();

//AUTH
router.post("/Login", new AuthenticateUserController().signin);
router.post("/Cadastro", new AuthenticateUserController().cadastrarUsuario);
routerFormData.get("/Servicos", ensureAuthenticated, ServicosController.listaServicos)

export { router, routerFormData };