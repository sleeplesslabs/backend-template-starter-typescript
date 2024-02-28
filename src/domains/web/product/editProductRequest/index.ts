import Joi from 'joi';

export default class EditProductRequest {
    name: string;
    brand_name: string;
    price: number;

    constructor(name: string, brand_name: string, price: number) {
        this.name = name;
        this.price = price;
        this.brand_name = brand_name;
    }

    static getSchema() {
        return Joi.object({
            name: Joi.string().required().messages({
                'any.required': 'Nama produk diperlukan',
                'string.base': 'Nama produk harus berupa string',
                'string.empty': 'Nama produk tidak boleh kosong',
            }),
            brand_name: Joi.string().required().messages({
                'any.required': 'Nama brand produk diperlukan',
                'string.base': 'Nama brand produk harus berupa string',
                'string.empty': 'Nama brand produk tidak boleh kosong',
            }),
            price: Joi.number().required().greater(0).messages({
                'any.required': 'Harga produk diperlukan',
                'number.greater': 'Harga produk harus lebih besar dari 0',
                'number.base': 'Harga produk harus berupa angka',
            }),
        });
    }
}