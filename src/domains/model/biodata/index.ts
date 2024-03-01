import { DataTypes, Model } from 'sequelize';
import Database  from "../../../configs/database";

export default class BiodataModel extends Model {
    declare biodataId: string;
    declare authId: string;
    declare full_name: string;  
    declare phone_number: string;
} 


BiodataModel.init(
    {
      biodataId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUID,
        primaryKey: true,
        unique: true
      },
      authId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: false
      },
      full_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      modelName: 'Biodata',
      sequelize: Database,
    }
  );

