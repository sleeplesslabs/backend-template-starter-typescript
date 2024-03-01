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
            const {result, accessToken} = await this.authService.loginService(validatedData);
            if(result.isSuccess){
                const response = SuccessSingularFormatter('Berhasil Login', {token: accessToken});
                return res.status(200).send(response);
            }else {
                const error  = result.getError();
                const response = ErrorFormatter(error.message)
                return res.status(error.code).send(response);
            }
        } catch (error) {
            HandleErrorResponse(res, error);
        }
    } 
}