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
                'any.required': 'Nama produk Diperlukan',
                'string.base': 'Nama produk Harus Berupa String',
                'string.empty': 'Nama produk Tidak Boleh Kosong',
            }),
            stock_keeping_unit: Joi.string().required().messages({
                'any.required': 'Stock Keeping Unit Produk Diperlukan',
                'string.base': 'Stock Keeping Unit Produk Harus Berupa String',
                'string.empty': 'Stock Keeping Unit Produk Tidak Boleh Kosong',
            }),
            brand_name: Joi.string().required().messages({
                'any.required': 'Nama brand Produk Diperlukan',
                'string.base': 'Nama brand Produk harus berupa String',
                'string.empty': 'Nama brand Produk Tidak Boleh Kosong',
            }),
            price: Joi.number().required().greater(0).messages({
                'any.required': 'Harga Produk Diperlukan',
                'number.greater': 'Harga Produk Harus lebih Besar Dari 0',
                'number.base': 'Harga Produk Harus Berupa Angka',
            }),
        });
    }
}