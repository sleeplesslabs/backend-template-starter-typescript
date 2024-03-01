import { DataTypes, Model } from 'sequelize';
import Database  from "../../../configs/database";

export default class RefreshTokenModel extends Model {
    declare refreshTokenId: string;
    declare authId: string;
    declare refreshToken: string;
    declare jti: string;
    declare platform: string;
    declare browser: string;
    declare latitude: number;
    declare longitude: number;

} 


RefreshTokenModel.init(
    {
      refreshTokenId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUID,
        primaryKey: true,
        unique: true
      },
      authId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      refresh_token: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      jti: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      platform: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      browser: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      latitude: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      longitude: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
    },
    {
      modelName: 'RefreshToken',
      sequelize: Database,
      indexes: [{
        unique: false, 
        fields: ["jti"]
    }]
    }
  );

