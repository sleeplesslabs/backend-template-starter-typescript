import { DataTypes, Model } from 'sequelize';
import Database  from "../../../configs/database";

export default class AuthModel extends Model {
    declare authId: string;
    declare email: string;
    declare status: string;
    declare roles: string;
} 


AuthModel.init(
    {
      authId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUID,
        primaryKey: true,
        unique: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      status: {
        type: DataTypes.ENUM,
        values: ["active", "inactive"],
        defaultValue: "active"
    },
      roles: {
        type: DataTypes.ENUM,
        values: ["admin", "member", ""],
        defaultValue: ""
    },
    },
    {
      modelName: 'Auth',
      sequelize: Database,
     
    },
  );