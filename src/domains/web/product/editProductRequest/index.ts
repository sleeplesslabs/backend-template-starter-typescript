import Joi from 'joi';

export default class EditProductRequest {
    name: string;
    stock_keeping_unit: string;
    brand_name: string;
    price: number;

    constructor(name: string, brand_name: string, stock_keeping_unit: string, price: number) {
        this.name = name;
        this.price = price;
        this.brand_name = brand_name;
        this.stock_keeping_unit = stock_keeping_unit;
    }

    static getSchema() {
        return Joi.object({
            name: Joi.string().required().messages({
                'any.required': 'Nama produk diperlukan',
                'string.base': 'Nama produk harus berupa string',
                'string.empty': 'Nama produk tidak boleh kosong',
            }),
            stock_keeping_unit: Joi.string().required().messages({
                'any.required': 'Stock Keeping Unit produk diperlukan',
                'string.base': 'Stock Keeping Unit produk harus berupa string',
                'string.empty': 'Stock Keeping Unit produk tidak boleh kosong',
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