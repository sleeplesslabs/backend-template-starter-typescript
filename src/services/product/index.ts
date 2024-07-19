import CreateProductRequest from "../../domains/web/product/createProductRequest";
import EditProductRequest from "../../domains/web/product/editProductRequest";
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

    async createProductService(createProductRequest: CreateProductRequest){
        const findProduct = await this.productRepository.findProductBySKU(createProductRequest.stock_keeping_unit);
        if(findProduct.value){
            throw new CustomException([{ error: 'stock_keeping_unit', message: "SKU Product Sudah Ada" }], 409);
        }
        const data = await this.productRepository.create(createProductRequest);
        return data;
    }

    async getProductByIdService(productId: string){
        const data = await this.productRepository.getById(productId);
        return data;
    }

    async editProductByIdService(productId: string, editProductRequest: EditProductRequest){
        const findData = await this.productRepository.getById(productId);

        if (!findData.value){
            throw new CustomException([{error: 'productId', message: "Produk Tidak Ditemukan"}], 404)
        }

        const findProduct = await this.productRepository.findSKUExcludingId(productId, editProductRequest.stock_keeping_unit);

        if (findProduct.value) {
            throw new CustomException([{ error: 'stock_keeping_unit', message: "SKU Product Sudah Ada" }], 404);
        }
        const data = await this.productRepository.update(productId, editProductRequest)
        return data

    }

    async deleteProductByIdService(productId: string){
        const findData = await this.productRepository.getById(productId);

        if (!findData.value){
            throw new CustomException([{error: 'productId', message: "Produk Tidak Ditemukan"}], 404)
        }

        const data = await this.productRepository.deleteById(productId);
        return data;
    }

}