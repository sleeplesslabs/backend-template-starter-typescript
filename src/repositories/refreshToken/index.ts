import { logger } from "../../helpers/log";
import { RepoError, Result } from "../result";
import { RefreshTokenModel } from '../../domains/model/index';
import { v4 as uuidv4 } from 'uuid';

export default class RefreshTokenRepository{

    
    async add(value: object): Promise<any>  {
        try {
            const data = await RefreshTokenModel.create({
                ...value,
                refreshTokenId: uuidv4()
            });
            return Result.ok(data);
          } catch (error: any) {
            logger.error(error);
            return Result.fail(new RepoError(error.message, 500));
          }
      }

      async findByJTI(jti: string): Promise <any>{
        try {
          const data = await RefreshTokenModel.findOne({where: {jti}});
          return Result.ok(data);

        } catch (error: any) {
          logger.error(error);
          return Result.fail(new RepoError(error.message, 500));
        }
      }

      async delete(jti: string): Promise <any>{
        try {
            const data = await RefreshTokenModel.destroy({where: {jti}});
            return Result.ok(data);
        } catch (error: any) {
          logger.error(error);
          return Result.fail(new RepoError(error.message, 500));
        }
      }

      async findAllByAuthId(authId: string): Promise<any>{
        try {
          const data = await RefreshTokenModel.findAll({where: {authId}});
          return Result.ok(data);
        } catch (error: any) {
          logger.error(error);
          return Result.fail(new RepoError(error.message, 500));
        }
      }
      

}