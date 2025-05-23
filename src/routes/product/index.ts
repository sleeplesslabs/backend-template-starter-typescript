import { Router } from "express";
import ProductController from "../../controllers/product";
import ProductRepository from "../../repositories/product";
import ProductService from "../../services/product";

const productRouter = Router();

const productRepository = new ProductRepository();
const productService = ProductService.getInstance(productRepository);
const productController = new ProductController(productService);

productRouter.get("/products", async(req, res) => productController.getAllProductController(req, res));
productRouter.post("/product", async(req, res) => productController.createProductController(req, res));
productRouter.get("/product/:productId", async(req, res) => productController.getProductByIdController(req, res));
productRouter.put("/product/:productId", async(req, res) => productController.editProductByIdController(req, res));
productRouter.delete("/product/:productId", async(req, res) => productController.deleteProductByIdController(req, res));

export default productRouter;