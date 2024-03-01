import { Router } from "express";
import AuthRepository from "../../repositories/auth";
import AuthService from "../../services/auth";
import AuthController from "../../controllers/auth";

const authRouter = Router();

const authRepository = new AuthRepository();
const authService = AuthService.getInstance(authRepository);
const authController = new AuthController(authService);

authRouter.post("/auth/login", async(req, res) => authController.loginController(req, res));

// authRouter.use("/auth", authRouter)

export default authRouter;