import { Router } from "express";
import AuthRepository from "../../repositories/auth";
import AuthService from "../../services/auth";
import AuthController from "../../controllers/auth";
import RefreshTokenRepository from "../../repositories/refreshToken";
import MiddlewareAuth from "../../middlewares/auth";

const authRouter = Router();

const authRepository = new AuthRepository();
const refreshTokenRepository = new RefreshTokenRepository();
const authService = AuthService.getInstance(authRepository, refreshTokenRepository);
const authController = new AuthController(authService);

authRouter.post("/auth/login", async(req, res) => authController.loginController(req, res));
authRouter.get("/auth/profile", MiddlewareAuth, async (req, res) => authController.profileController(req, res));
authRouter.get("/auth/history", MiddlewareAuth, async (req, res) => authController.historyController(req, res));
authRouter.post("/auth/revoke", MiddlewareAuth, async (req, res) => authController.revokeController(req, res));

export default authRouter;