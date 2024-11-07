import Joi from 'joi';

export default class CreateProductRequest {
    private constructor(        
        public readonly name: string,
        public readonly stock_keeping_unit: string,
        public readonly brand_name: string,
        public readonly price: number
    ) {}
    

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