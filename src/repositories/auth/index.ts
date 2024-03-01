import { RepoError, Result } from "../result";
import { logger } from "../../helpers/log";
import { v4 as uuidv4 } from 'uuid';
import { AuthModel, BiodataModel } from '../../domains/model/index';


export default class AuthRepository {
    async findUserByEmail(email: string): Promise<any>{
        try {
            const data = await AuthModel.findOne({ where: { email } });
            return Result.ok(data);
        } catch (error: any) {
            logger.error(error);
            return Result.fail(new RepoError(error.message, 500));
        }
    }
}