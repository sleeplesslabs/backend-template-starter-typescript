import { Router } from "express";
import AuthRepository from "../../repositories/auth";
import AuthService from "../../services/auth";
import AuthController from "../../controllers/auth";
import RefreshTokenRepository from "../../repositories/refreshToken";

const authRouter = Router();

const authRepository = new AuthRepository();
const refreshTokenRepository = new RefreshTokenRepository();
const authService = AuthService.getInstance(authRepository, refreshTokenRepository);
const authController = new AuthController(authService);

authRouter.post("/auth/login", async(req, res) => authController.loginController(req, res));

// authRouter.use("/auth", authRouter)

export default authRouter;