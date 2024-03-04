import { Request, Response, NextFunction } from 'express';
import * as jwt from "jsonwebtoken"
import RefreshTokenRepository from '../../repositories/refreshToken';
import { expiresAccessToken } from '../../helpers/constant';
import ErrorFormatter from '../../helpers/response/error';
import GenerateJWT from '../../helpers/jwt';
import AuthRepository from '../../repositories/auth';

const refreshTokenRepository = new RefreshTokenRepository();
const authRepository = new AuthRepository();


export default async function MiddlewareAuth(req: Request, res: Response, next: NextFunction) {
 
    const bearerHeader = req.headers['authorization'];
    const signOptions: jwt.DecodeOptions = { complete: true, json: true};

    if (bearerHeader) {
        try {
            const bearer = bearerHeader.split(' ');
            const accessTokenFromHeader = bearer[1];
            jwt.verify(accessTokenFromHeader, "secretkey" as string, {ignoreExpiration: true});
            const decodeAccessToken = jwt.decode(accessTokenFromHeader, signOptions) as jwt.JwtPayload;
            const currentTimestamp = Date.now() / 1000;

            const findRefreshToken = await refreshTokenRepository.findByJTI(decodeAccessToken.payload.jti);
            if (findRefreshToken.isSuccess){
                if(findRefreshToken.value != null){
                const findAuth = await authRepository.getProfileById(findRefreshToken.value.authId);
                if (findAuth.isSuccess){

                    if(findAuth.value.status != 'active'){
                        const response = ErrorFormatter("Status akun tidak aktif");
                        return res.status(401).send(response);
                    }else {
                        const verifyRefreshToken = jwt.decode(findRefreshToken.value.refresh_token, signOptions) as jwt.JwtPayload;

                        if(currentTimestamp >= verifyRefreshToken.payload.exp){
                            await refreshTokenRepository.delete(verifyRefreshToken.payload.jti);
                            const response = ErrorFormatter("Refresh Token Tidak Valid");
                            return res.status(401).send(response);
                        }else {
        
                            if(currentTimestamp >= decodeAccessToken.payload.exp){
                                const accessToken = GenerateJWT(decodeAccessToken.payload, decodeAccessToken.payload.jti, expiresAccessToken);
                                res.set({'authorization': accessToken});
            
                                req.authId = decodeAccessToken.payload.authId;
                                req.jti = decodeAccessToken.payload.jti
            
                                next();
                            }else {
                                req.authId = decodeAccessToken.payload.authId;
                                req.jti = decodeAccessToken.payload.jti
            
                                next();
                            }
                            
                        }
                    }

                }else {
                    const error  = findAuth.getError();
                    const response = ErrorFormatter(error.message)
                    return res.status(401).send(response);
                }

            } else {
                const response = ErrorFormatter("Refresh Token Tidak Valid");
                return res.status(401).send(response)
            }


            } else {
                const error  = findRefreshToken.getError();
                const response = ErrorFormatter(error.message)
                return res.status(401).send(response);
            }

        } catch (error: any) {

            const response = ErrorFormatter(error.message);
            return res.status(401).send(response);
        }
    } else {
        const response = ErrorFormatter("Akses Terlarang, Harap Berikan Token JWT Anda");
        return res.status(403).send(response)
    }
}
