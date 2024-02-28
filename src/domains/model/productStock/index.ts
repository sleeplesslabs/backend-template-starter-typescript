import { Model, DataTypes } from 'sequelize';
import Database  from "../../../configs/database";

export default class ProductStockModel extends Model{
    declare productStockId: string;
    declare authId: string;
    declare productId: string;
    declare stock: number;

}


ProductStockModel.init(
  {
    productStockId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUID,
      primaryKey: true,
      unique: true
    },
    authId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    productId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    modelName: 'ProductStock',
    sequelize: Database,
  }
);

  