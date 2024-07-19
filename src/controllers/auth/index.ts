import { Request, Response } from "express-serve-static-core";
import { Validator } from "../../helpers/validator";
import ErrorFormatter from "../../helpers/response/error";
import SuccessSingularFormatter from "../../helpers/response/success/singular";
import HandleErrorResponse from "../../helpers/error/handleErrorResponse";

import AuthService from "../../services/auth";
import LoginRequest from "../../domains/web/auth/loginRequest";
import SuccessPluralFormatter from "../../helpers/response/success/plural";


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

    async profileController(req: Request, res: Response){
        try {
            const authId = req.authId as string;
            const result = await this.authService.getProfileService(authId);

            if(result.isSuccess){
                const response = SuccessSingularFormatter('Data Pengguna',  result.value);
                return res.status(200).send(response);
            }else{
                const error  = result.getError();
                const response = ErrorFormatter(error.message)
                return res.status(error.code).send(response);
            }
        } catch (error) {
            HandleErrorResponse(res, error);
        }
    }

    async historyController(req: Request, res: Response){
        try {
            const authId = req.authId as string;
            const result = await this.authService.getHistoryService(authId);

            if(result.isSuccess){
                if (result.value.length != 0){
                    const meta = {};
                    const response = SuccessPluralFormatter('Data Semua Histori Login', meta, result.value);
                    return res.status(200).send(response);        
                }else {
                    const response = ErrorFormatter('Data Histori Login Tidak Ditemukan');
                    return res.status(404).send(response);
                }
            }else {
                const error  = result.getError();
                const response = ErrorFormatter(error.message)
                return res.status(error.code).send(response);
            }
         
        } catch (error) {
            HandleErrorResponse(res, error);
        }
    }

    async revokeController(req: Request, res: Response){
        try {
            const findData = await this.authService.getRefrehTokenServiceByJTI(req.jti);

            if (findData.isSuccess){
                await this.authService.revokeRefrehTokenService(req.jti)
                const response = SuccessSingularFormatter("Berhasil Hapus Refresh Token", findData.value);
                return res.status(200).send(response);
            } else {
                const error  = findData.getError();
                const response = ErrorFormatter(error.message)
                return res.status(error.code).send(response);
            }
            
        } catch (error) {
            HandleErrorResponse(res, error);
        }
    }
}