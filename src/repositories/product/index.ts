import { logger } from "../../helpers/log";
import { ProductModel }  from "../../domains/model/index";
import { RepoError, Result } from "../result";




export default class ProductRepository  {

    async getAll(): Promise<any[any]>{
        try {
            const data = await ProductModel.findAll();
            return Result.ok(data);    
        } catch (error: any) {
            logger.error(error);
            return Result.fail(new RepoError(error.message, 500))
        }
    }

    async getById(productId: string): Promise<any>{
        try {
            const data = await ProductModel.findByPk(productId);
            return Result.ok(data);    
        } catch (error: any) {
            logger.error(error);
            return Result.fail(new RepoError(error.message, 500))
        }
    }

    async update(productId: string): Promise<any>{}
    async deleteById(productId: string): Promise<any>{}

}