import { v4 as uuidv4 } from 'uuid';
import { ProductModel } from '../index';


export default class ProductSeeder {
  async run(){
    const products = [
      {
        productId: uuidv4(),
        name: "Keyboard Gaming",
        stock_keeping_unit: "NUkK0Slw8i7WqB66kmTOWbh4sP5xrHSW",
        brand_name: "Logitech",
        price: 700_000,
        stock: 0

      },
      {
        productId: uuidv4(),
        name: "Mouse", 
        stock_keeping_unit: "0pspVzj1T9z3scwXZidkGN9RwSh3y9Yd",
        brand_name: "Logitech",
        price: 700_000,
        stock: 0
      },
      { 

        productId: uuidv4(),
        name: "Monitor", 
        stock_keeping_unit: "KA3bdRCYe5cLRWVR1qzJJuViGa9UQWHD",
        brand_name: "Samsung",
        price: 700_000,
        stock: 0
      },
      { 
        productId: uuidv4(),
        name: "Printer", 
        stock_keeping_unit: "0tOMOoyIoICdM1332XN4fmPvxqCruczp",
        brand_name: "Epson",
        price: 700_000,
        stock: 0
      },
      {
        productId: uuidv4(),
        name: "Microphone", 
        stock_keeping_unit: "YYIiOcLT98DglWgWf0gVvZ3JQU7iF9fo",
        brand_name: "Soundtech",
        price: 700_000,
        stock: 0
      },      
      {
        productId: uuidv4(),
        stock_keeping_unit: "VICPzcJ4ge8DZBbzJvdPl6y07Lcf6ApQ",
        name: "PC Gaming", 
        brand_name: "MSI",
        price: 700_000,
        stock: 0
      },      
      {
        productId: uuidv4(),
        stock_keeping_unit: "9XXcN1EUSoMtaXPdggtwsTNu2rYoMUJ6",
        name: "Webcam", 
        brand_name: "Logitech",
        price: 700_000,
        stock: 0
      },      
      {
        productId: uuidv4(),
        stock_keeping_unit: "t7YcnIan7BvczV6Rq30rjMvJqa8XftAn",
        name: "Scanner", 
        brand_name: "Epson",
        price: 700_000,
        stock: 0
      },          
      { 
        productId: uuidv4(),
        stock_keeping_unit: "VreB2N8taqxBGjs4dlM1006oxUOGmm46",
        name: "Speaker", 
        brand_name: "Logitech",
        price: 700_000,
        stock: 0
      }, 
      { 
        productId: uuidv4(),
        stock_keeping_unit: "pPo78lEPzOHQ0Kj8EgRnPPV8xQa9rZ1m",
        name: "SSD", 
        brand_name: "Samsung",
        price: 700_000,
        stock: 0
      },
      { 
        productId: uuidv4(),
        name: "HDD", 
        stock_keeping_unit: "Nx0BNBxIPoSBg9sMDDU3um5HEt6aE8Cj",
        brand_name: "Samsung",
        price: 700_000,
        stock: 0
      },  
      { 
        productId: uuidv4(),
        stock_keeping_unit: "YmIRJ8NGVstzjgOYAR5dvDAeQZoOHdry",
        name: "Power Supply", 
        brand_name: "MSI",
        price: 700_000,
        stock: 0
      },  
      { 

        productId: uuidv4(),
        stock_keeping_unit: "X3BtvNN02Fs5DUZmNGPWdHQTCoAkJQQo",
        name: "Server", 
        brand_name: "Dell",
        price: 700_000,
        stock: 0
      }, 
      {
        productId: uuidv4(),
        stock_keeping_unit: "RJl01NQFWiYXtW8yGAPdH953tXV59rQl",
        name: "GPU 1650", 
        brand_name: "Nvidia",
        price: 700_000,
        stock: 0
      },
    ];

      await ProductModel.destroy({ where: {} })
      await ProductModel.bulkCreate(products.map(product => ({...product })));

  }
} 
