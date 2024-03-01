import Joi from 'joi';

export default class LoginRequest {
    email: string;
    password: string;
    platform: string;
    browser: string;
    latitude: number;
    longitude: number; 


    constructor(email: string, password: string, platform: string, browser: string, latitude: number, longitude: number){
        this.email = email;
        this.password = password;
        this.platform = platform;
        this.browser = browser;
        this.latitude = latitude;
        this.longitude = longitude;
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
            platform: Joi.string().required().messages({
                'any.required': 'Platform diperlukan',
                'string.empty': 'Platform tidak boleh kosong',
            }),
            browser: Joi.string().required().messages({
                'any.required': 'Browser diperlukan',
                'string.empty': 'Browser tidak boleh kosong',
            }),
            latitude: Joi.number().required().min(-90).max(90).precision(8).messages({
                'any.required': 'Latitude diperlukan',
                'number.base': 'Latitude harus berupa angka',
                'number.min': 'Latitude harus lebih besar dari -90',
                'number.max': 'Latitude harus kurang dari 90',
                'number.precision': 'Latitude harus memiliki maksimal 8 digit presisi',
            }),
            longitude: Joi.number().required().min(-180).max(180).precision(8).messages({
                'any.required': 'Longitude diperlukan',
                'number.base': 'Longitude harus berupa angka',
                'number.min': 'Longitude harus lebih besar dari -180',
                'number.max': 'Longitude harus kurang dari 180',
                'number.precision': 'Longitude harus memiliki maksimal 8 digit presisi',
            })
        });
    }
}