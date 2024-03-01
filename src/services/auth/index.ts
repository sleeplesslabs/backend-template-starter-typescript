import CustomException from "../../helpers/error/customException";
import LoginRequest from "../../domains/web/auth/loginRequest";
import AuthRepository from "../../repositories/auth";
import bcryptjs from "bcryptjs";
import GenerateJWT from "../../helpers/jwt";
import { v4 as uuidv4 } from 'uuid';
import { expiresAccessToken } from "../../helpers/constant";


export default class AuthService{
    private authRepository: AuthRepository;
    private static instance: AuthService;

    private constructor(authRepository: AuthRepository){
        this.authRepository = authRepository;
    }

    
    static getInstance(authRepository: AuthRepository){
        if(!this.instance){
            this.instance = new AuthService(authRepository);
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


        const token = GenerateJWT(findUser.value, valueJTI, expiresAccessToken);
        return token;

    }




    
}