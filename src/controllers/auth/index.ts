import { Request, Response } from "express-serve-static-core";
import { Validator } from "../../helpers/validator";
import ErrorFormatter from "../../helpers/response/error";
import SuccessSingularFormatter from "../../helpers/response/success/singular";
import HandleErrorResponse from "../../helpers/error/handleErrorResponse";

import AuthService from "../../services/auth";
import LoginRequest from "../../domains/web/auth/loginRequest";


export default class AuthController{
    private authService: AuthService;

    
    constructor (authService: AuthService){
        this.authService = authService;
    }

    async loginController(req: Request, res: Response){
        try {
            const data: LoginRequest = req.body;
            const validatedData = Validator.validate(data, LoginRequest.getSchema());
            const result = await this.authService.loginService(validatedData);
            const response = SuccessSingularFormatter('Berhasil login', {token: result});
            return res.status(200).send(response);
        } catch (error) {
            HandleErrorResponse(res, error);
        }
    } 
}