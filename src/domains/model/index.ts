import AuthModel from "./auth";
import BiodataModel from "./biodata";
import ProductModel from "./product";
import ProductStockModel from "./productStock";

AuthModel.hasOne(BiodataModel, {foreignKey: 'authId', as: 'biodata', onDelete: 'CASCADE'})
BiodataModel.belongsTo(AuthModel, { foreignKey: 'authId', as: 'auth' });

export {ProductModel, ProductStockModel, AuthModel, BiodataModel}