    export default class CreateProductResponse{
        private constructor(        
            public readonly productId: string,
            public readonly stock_keeping_unit: string,
            public readonly name: string,
            public readonly brand_name: string,
            public readonly price: number
        ) {}

        static ConvertResponse(data: any): CreateProductResponse {
            return new CreateProductResponse(
                data.productId,
                data.stock_keeping_unit,
                data.name,
                data.brand_name,
                data.price
            );
        }
    }