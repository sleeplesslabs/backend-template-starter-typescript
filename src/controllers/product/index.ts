import SuccessSingularFormatter from "../../helpers/response/success/singular";
import ErrorFormatter from "../../helpers/response/error";
import SuccessPluralFormatter from "../../helpers/response/success/plural";
import ProductService from "../../services/product";
import { Request, Response } from "express-serve-static-core";
import HandleErrorResponse from "../../helpers/error/handleErrorResponse";

export default class ProductController {
    private productService: ProductService;

    constructor (productService: ProductService){
        this.productService = productService;
    }

    async getAllProductController(req: Request, res: Response){
        try {
            const data = await this.productService.getAllProductService();
            if (data.value.length != 0){
                const response = SuccessPluralFormatter("Data Semua Produk", {}, data.value);
                return res.status(200).send(response);  
            }else {
                const response = ErrorFormatter("Data Produk Tidak Ditemukan");
                return res.status(404).send(response);
            }
                  
        } catch (error) {
            
        }
    }


    async getProductByIdController(req: Request, res: Response){
        try {
        const productId = req.params.productId as string; 
        const result = await this.productService.getProductByIdService(productId);

        if (result.isSuccess){
                const response = SuccessSingularFormatter("Data Produk", result.value);
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

    async editProductByIdController(req: Request, res: Response){}
    async deleteProductByIdController(req: Request, res: Response){}
}