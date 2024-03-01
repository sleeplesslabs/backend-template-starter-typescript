import Joi from 'joi';

export default class LoginRequest {
    email: string;
    password: string;

    constructor(email: string, password: string){
        this.email = email;
        this.password = password;
    }
    static getSchema() {
        return Joi.object({
            email: Joi.string().email({ tlds: false }).required().messages({
                'any.required': 'Alamat Email diperlukan',
                'string.empty': 'Alamat Email tidak boleh kosong',
                'string.email': 'Alamat Email Tidak Valid',
            }),
            password: Joi.string().required().messages({
                'any.required': 'Password diperlukan',
                'string.empty': 'Password tidak boleh kosong',
            }),


        });
    }
}