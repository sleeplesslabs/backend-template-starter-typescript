import AuthModel from "./auth";
import ProductModel from "./product";
import ProductStockModel from "./productStock";
import RefreshTokenModel from "./refreshToken";


AuthModel.hasMany(RefreshTokenModel, { as: 'refreshTokens', foreignKey: 'authId', onDelete: 'CASCADE' });
RefreshTokenModel.belongsTo(AuthModel, { foreignKey: 'authId', as: 'auth' });

export {ProductModel, ProductStockModel, AuthModel, RefreshTokenModel}