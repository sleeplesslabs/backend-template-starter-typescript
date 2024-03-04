import { Model, DataTypes } from 'sequelize';
import Database from "../../../configs/database";

export default class ProductModel extends Model{
    declare productId: string;
    declare name: string;
    declare stock_keeping_unit: string;
    declare brand_name: string;
    declare price: number;
    declare total_stock: number;

}


ProductModel.init(
  {
    productId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUID,
      primaryKey: true,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock_keeping_unit: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    brand_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    total_stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
  },
  {
    modelName: 'Product',
    sequelize: Database,
  }
);

  