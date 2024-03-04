import { Request, Response, NextFunction } from 'express';
import * as jwt from "jsonwebtoken"
import AuthRepository from '../../repositories/auth';
import CustomException from '../../helpers/error/customException';
import { expiresAccessToken, expiresRefreshToken } from '../../helpers/constant';
import ErrorFormatter from '../../helpers/response/error';
import GenerateJWT from '../../helpers/jwt';

const authRepository = new AuthRepository();


export default function MiddlewareRoles (allowedRoles: Array<string>){
    return async (req: Request, res: Response, next: NextFunction) =>{

    try {
        const findUser = await authRepository.getProfileById(req.authId);
        if (findUser.isSuccess){
            const roleUser = findUser.value.roles;
            const hasPermission = allowedRoles.some((roles) => roleUser.includes(roles));
            if (!hasPermission){
                const response = ErrorFormatter("Forbidden Access!");
                return res.status(403).send(response)
            } else {
                next();
            }
        }else {
            const error  = findUser.getError();
            const response = ErrorFormatter(error.message)
            return res.status(401).send(response);
        }

    } catch (error: any) {
        const response = ErrorFormatter(error.message);
        return res.status(401).send(response)
    }
}
}