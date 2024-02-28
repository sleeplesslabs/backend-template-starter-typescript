import { logger } from "../../helpers/log";
import { ProductModel }  from "../../domains/model/index";
import { RepoError, Result } from "../result";
import CreateProductRequest from "../../domains/web/product/createProductRequest";
import EditProductRequest from "../../domains/web/product/editProductRequest";




export default class ProductRepository  {

    async getAll(): Promise<any[any]>{
        try {
            const data = await ProductModel.findAll();
            return Result.ok(data);    
        } catch (error: any) {
            logger.error(error);
            return Result.fail(new RepoError(error.message, 500));
        }
    }

    async getById(productId: string): Promise<any>{
        try {
            const data = await ProductModel.findByPk(productId);
            return Result.ok(data);    
        } catch (error: any) {
            logger.error(error);
            return Result.fail(new RepoError(error.message, 500));
        }
    }
    
    async create(createProductRequest: CreateProductRequest): Promise<any>{}
    async update(productId: string, editProductRequest: EditProductRequest): Promise<any>{}

    async deleteById(productId: string): Promise<any>{
        try {
            const data = await ProductModel.destroy({where: {productId}});
            return Result.ok(data);    
        } catch (error: any) {
            logger.error(error);
            return Result.fail(new RepoError(error.message, 500));
        }
    }

}