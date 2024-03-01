import jwt from 'jsonwebtoken';
import { AuthModel } from '../../domains/model/index';


export default function GenerateJWT(auth: any, jti: string, expiresIn: string): string {
    
    const token = jwt.sign({
        authId: auth.authId,
        email: auth.email,
        jti: jti,
        iss: "https://sleeplesslabs.id" 
      }, "secretkey" as string, 
      { expiresIn: expiresIn }
    );


    return token;
}