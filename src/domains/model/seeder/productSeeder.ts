import { v4 as uuidv4 } from 'uuid';
import { ProductModel } from '../index';


export default class ProductSeeder {
  async run(){
    const products = [
      {
        productId: uuidv4(),
        name: "Keyboard Gaming",
        stock_keeping_unit: uuidv4(),
        brand_name: "Logitech",
        price: 700_000,
        stock: 0

      },
      {
        productId: uuidv4(),
        name: "Mouse", 
        stock_keeping_unit: uuidv4(),
        brand_name: "Logitech",
        price: 700_000,
        stock: 0
      },
      { 

        productId: uuidv4(),
        name: "Monitor", 
        stock_keeping_unit: uuidv4(),
        brand_name: "Samsung",
        price: 700_000,
        stock: 0
      },
      { 
        productId: uuidv4(),
        name: "Printer", 
        stock_keeping_unit: uuidv4(),
        brand_name: "Epson",
        price: 700_000,
        stock: 0
      },
      {
        productId: uuidv4(),
        name: "Microphone", 
        stock_keeping_unit: uuidv4(),
        brand_name: "Soundtech",
        price: 700_000,
        stock: 0
      },      
      {
        productId: uuidv4(),
        stock_keeping_unit: uuidv4(),
        name: "PC Gaming", 
        brand_name: "MSI",
        price: 700_000,
        stock: 0
      },      
      {
        productId: uuidv4(),
        stock_keeping_unit: uuidv4(),
        name: "Webcam", 
        brand_name: "Logitech",
        price: 700_000,
        stock: 0
      },      
      {
        productId: uuidv4(),
        stock_keeping_unit: uuidv4(),
        name: "Scanner", 
        brand_name: "Epson",
        price: 700_000,
        stock: 0
      },          
      { 
        productId: uuidv4(),
        stock_keeping_unit: uuidv4(),
        name: "Speaker", 
        brand_name: "Logitech",
        price: 700_000,
        stock: 0
      }, 
      { 
        productId: uuidv4(),
        stock_keeping_unit: uuidv4(),
        name: "SSD", 
        brand_name: "Samsung",
        price: 700_000,
        stock: 0
      },
      { 
        productId: uuidv4(),
        name: "HDD", 
        stock_keeping_unit: uuidv4(),
        brand_name: "Samsung",
        price: 700_000,
        stock: 0
      },  
      { 
        productId: uuidv4(),
        stock_keeping_unit: uuidv4(),
        name: "Power Supply", 
        brand_name: "MSI",
        price: 700_000,
        stock: 0
      },  
      { 

        productId: uuidv4(),
        stock_keeping_unit: uuidv4(),
        name: "Server", 
        brand_name: "Dell",
        price: 700_000,
        stock: 0
      }, 
      {
        productId: uuidv4(),
        stock_keeping_unit: uuidv4(),
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
