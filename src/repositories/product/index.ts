import { logger } from "../../helpers/log";
import { RepoError, RepoResult, Result } from "../result";
import { ProductModel }  from "../../domains/model/index";
import CreateProductRequest from "../../domains/web/product/request/createProductRequest";
import EditProductRequest from "../../domains/web/product/request/editProductRequest";
import { v4 as uuidv4 } from 'uuid';
import { Op } from "sequelize";
import CreateProductResponse from "../../domains/web/product/response/createProductRequest";

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
    
    async create(createProductRequest: CreateProductRequest): RepoResult<CreateProductResponse> {
        try {
            const data = await ProductModel.create({
                ...createProductRequest,
                productId: uuidv4()
            });        
            const response = CreateProductResponse.ConvertResponse(data);
            return Result.ok(response);
        } catch (error: any) {
            logger.error(error)
            return Result.fail(new RepoError(error.message, 500));
        }
    }

    async update(productId: string, editProductRequest: EditProductRequest): Promise<any>{
        try {
            const [, data] = await ProductModel.update(editProductRequest, {where: {productId}, returning: true});
            return Result.ok(data[0]); 
        } catch (error: any) {
            logger.error(error)
            return Result.fail(new RepoError(error.message, 500));
        }
    }

    async deleteById(productId: string): Promise<any>{
        try {
            const data = await ProductModel.destroy({where: {productId}});
            return Result.ok(data);    
        } catch (error: any) {
            logger.error(error);
            return Result.fail(new RepoError(error.message, 500));
        }
    }

    async findProductBySKU(stock_keeping_unit: string): Promise<any>{
        try {
            const data = await ProductModel.findOne({where: {stock_keeping_unit}});
            return Result.ok(data);
        } catch (error: any) {
            logger.error(error);
            return Result.fail(new RepoError(error.message, 500));
        }
    }

    async findSKUExcludingId(productId: string, stock_keeping_unit: string): Promise<any>{
        try {
            const data = await ProductModel.findOne({
                where: {
                    stock_keeping_unit: stock_keeping_unit, 
                    productId: {
                        [Op.ne]: productId
                    }
            }});
            return Result.ok(data);
        } catch (error: any) {
            logger.error(error);
            return Result.fail(new RepoError(error.message, 500));
        }
    }

}