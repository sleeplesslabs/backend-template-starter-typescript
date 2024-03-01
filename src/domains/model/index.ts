import AuthModel from "./auth";
import BiodataModel from "./biodata";
import ProductModel from "./product";
import ProductStockModel from "./productStock";
import RefreshTokenModel from "./refreshToken";

AuthModel.hasOne(BiodataModel, {foreignKey: 'authId', as: 'biodata', onDelete: 'CASCADE'})
BiodataModel.belongsTo(AuthModel, { foreignKey: 'authId', as: 'auth' });

AuthModel.hasMany(RefreshTokenModel, { as: 'refreshTokens', foreignKey: 'authId', onDelete: 'CASCADE' });
RefreshTokenModel.belongsTo(AuthModel, { foreignKey: 'authId', as: 'auth' });

export {ProductModel, ProductStockModel, AuthModel, BiodataModel, RefreshTokenModel}