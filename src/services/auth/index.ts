import CustomException from "../../helpers/error/customException";
import LoginRequest from "../../domains/web/auth/loginRequest";
import AuthRepository from "../../repositories/auth";
import bcryptjs from "bcryptjs";
import GenerateJWT from "../../helpers/jwt";
import { v4 as uuidv4 } from 'uuid';
import { expiresAccessToken, expiresRefreshToken } from "../../helpers/constant";
import RefreshTokenRepository from "src/repositories/refreshToken";


export default class AuthService{
    private authRepository: AuthRepository;
    private refreshTokenRepository: RefreshTokenRepository;
    private static instance: AuthService;

    private constructor(authRepository: AuthRepository, refreshTokenRepository: RefreshTokenRepository){
        this.authRepository = authRepository;
        this.refreshTokenRepository = refreshTokenRepository;
    }

    
    static getInstance(authRepository: AuthRepository, refreshTokenRepository: RefreshTokenRepository){
        if(!this.instance){
            this.instance = new AuthService(authRepository, refreshTokenRepository);
        }
        return this.instance
    }

    async loginService(loginRequest: LoginRequest){
        const findUser = await this.authRepository.findUserByEmail(loginRequest.email);

        if(!findUser.value){
            throw new CustomException([{error: "email", message: "Email Tidak Ditemukan"}], 404);
        }

        if(findUser.value.status != 'active'){
            throw new CustomException([{ error: "status", message: "Status Akun Tidak Aktif" }], 401);
        }

        const comparePassword = bcryptjs.compareSync(loginRequest.password, findUser.value.password);
        if (!comparePassword) {
            throw new CustomException([{ error: 'password', message: 'Password Salah' }], 401);
        }

        const valueJTI = uuidv4(); 
        const accessToken = GenerateJWT(findUser.value, valueJTI, expiresAccessToken);
        const refreshToken = GenerateJWT(findUser.value, valueJTI, expiresRefreshToken);

        const dataValue = {
            refresh_token: refreshToken,
            authId: findUser.value.authId,
            jti: valueJTI,
            platform: loginRequest.platform,
            browser: loginRequest.browser,
            latitude: loginRequest.latitude,
            longitude: loginRequest.longitude,
        }            
        
        const result = await this.refreshTokenRepository.add(dataValue)

        return {result, accessToken};

    }
    async getProfileService(authId: string){
        const data = await this.authRepository.getProfileById(authId);
        if (!data.value) {
            throw new CustomException([{ error: 'Profile', message: 'Profile Tidak Ditemukan' }], 404);
        }

        return data; 
    }


    async getHistoryService(authId: string){
        const data = await this.refreshTokenRepository.findAllByAuthId(authId);
        if (!data.value) {
            throw new CustomException([{ error: 'Profile', message: 'Riwayat Login Tidak Ditemukan' }], 404);
        }

        return data; 
    }

    async logoutService(JWTId: string){
        const findData = await this.refreshTokenRepository.findByJTI(JWTId)

        if (!findData.value){
            throw new CustomException([{ error: 'Refresh Token', message: "Refresh Token Tidak Ditemukan" }], 404);
        }

        const data = await this.refreshTokenRepository.delete(JWTId);
        return data; 
    }



    
}