import CustomException from "../../helpers/error/customException";
import ProductRepository from "../../repositories/product";

export default class ProductService{
    private productRepository: ProductRepository;
    private static instance: ProductService

    private constructor(productRepository: ProductRepository){
        this.productRepository = productRepository;
    }

    static getInstance(productRepository: ProductRepository){
        if(!this.instance){
            this.instance = new ProductService(productRepository);
        }
        return this.instance
    }

    async getAllProductService(){
        const data = await this.productRepository.getAll();
        return data
    }

    async getProductByIdService(productId: string){
        const data = await this.productRepository.getById(productId);
        return data;
    }

    async editProductByIdService(){}

    async deleteProductByIdService(productId: string){
        const findData = await this.productRepository.getById(productId);

        if (!findData.value){
            throw new CustomException([{error: 'productId', message: "Produk Tidak Ditemukan"}], 404)
        }

        const data = await this.productRepository.deleteById(productId);
        return data;
    }

}