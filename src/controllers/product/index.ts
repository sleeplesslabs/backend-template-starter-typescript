import SuccessSingularFormatter from "../../helpers/response/success/singular";
import ErrorFormatter from "../../helpers/response/error";
import SuccessPluralFormatter from "../../helpers/response/success/plural";
import ProductService from "../../services/product";
import { Request, Response } from "express-serve-static-core";
import HandleErrorResponse from "../../helpers/error/handleErrorResponse";
import CreateProductRequest from "../../domains/web/product/createProductRequest";
import EditProductRequest from "../../domains/web/product/editProductRequest";
import { Validator } from "../../helpers/validator";

export default class ProductController {
    private productService: ProductService;

    constructor (productService: ProductService){
        this.productService = productService;
    }

    async getAllProductController(req: Request, res: Response){
        try {
            const result = await this.productService.getAllProductService();
            if(result.isSuccess){
                if (result.value.length != 0){
                    const response = SuccessPluralFormatter("Data Semua Produk", {}, result.value);
                    return res.status(200).send(response);  
                }else {
                    const response = ErrorFormatter("Data Produk Tidak Ditemukan");
                    return res.status(404).send(response);
                }
            }else { 
                const error  = result.getError();
                const response = ErrorFormatter(error.message)
                return res.status(error.code).send(response);
            }

                  
        } catch (error) {
            HandleErrorResponse(res, error);
        }
    }

    async createProductController(req: Request, res: Response){
        try {
            const data: CreateProductRequest = req.body;
            const validatedData = Validator.validate(data, CreateProductRequest.getSchema());

            const result = await this.productService.createProductService(validatedData);

            if (result.isSuccess){
                const response = SuccessSingularFormatter("Berhasil Buat Produk Baru", result.value);
                return res.status(201).send(response)
            }else {
                const error  = result.getError();
                const response = ErrorFormatter(error.message)
                return res.status(error.code).send(response);
            }

        } catch (error) {
            HandleErrorResponse(res, error);
        }
    }


    async getProductByIdController(req: Request, res: Response){
        try {
        const productId = req.params.productId as string; 
        const result = await this.productService.getProductByIdService(productId);

        if (result.isSuccess){
            if(result.value){
                const response = SuccessSingularFormatter("Data Semua Produk", result.value);
                return res.status(200).send(response);
            }
            const response = ErrorFormatter("Data Produk Tidak Ditemukan");
            return res.status(404).send(response);
        } else {
            const error  = result.getError();
            const response = ErrorFormatter(error.message)
            return res.status(error.code).send(response);
        }
        } catch (error) {
            HandleErrorResponse(res, error);
        }
    }

    async editProductByIdController(req: Request, res: Response){
        try {
            const productId = req.params.productId as string; 
            const data: EditProductRequest = req.body;
            const validatedData = Validator.validate(data, EditProductRequest.getSchema());

            const result = await this.productService.editProductByIdService(productId, validatedData);

            if(result.isSuccess){
                const response = SuccessSingularFormatter("Berhasil Ubah Data Produk", result.value);
                return res.status(200).send(response);
            } else {
                const error  = result.getError();
                const response = ErrorFormatter(error.message)
                return res.status(error.code).send(response);
            }
        } catch (error) {
            HandleErrorResponse(res, error);
        }
    }

    async deleteProductByIdController(req: Request, res: Response){
        try {
            const productId = req.params.productId as string; 
            const result = await this.productService.deleteProductByIdService(productId);
            
            if (result.isSuccess){
                const response = SuccessSingularFormatter("Berhasil Hapus Data Produk", result.value);
                return res.status(200).send(response);
            }else {
                const error  = result.getError();
                console.log(error)
                const response = ErrorFormatter(error.message)
                return res.status(error.code).send(response);
            }
        } catch (error) {
            HandleErrorResponse(res, error);
        }
    }
}