import { Router } from "express";
import ensureHasAcess, { ensureAuthenticated } from "./middleware/ensureAuthenticated";
import { AuthenticateUserController } from "./controllers/AuthController";
import { ServicosController } from "./controllers/ServicosController";

const router = Router();
const routerFormData = Router();

//AUTH
router.post("/login", new AuthenticateUserController().signin);

routerFormData.get("/servicos", ensureAuthenticated, ServicosController.listaServicos)

export { router, routerFormData };