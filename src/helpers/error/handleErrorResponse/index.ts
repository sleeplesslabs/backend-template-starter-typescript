import { Response } from 'express';
import { logger } from "../../log";
import { ValidationException } from "../../../helpers/validator"; 
import ErrorFormatter from "../../../helpers/response/error";
import CustomException from '../customException';

const HandleErrorResponse = (res: Response, error: any) => {
    if (error instanceof ValidationException || error instanceof CustomException) {
      const response = ErrorFormatter(error.toResponseObject());
      return res.status(error.status).send(response);
    } else {
        logger.error(error.message);
        const response = ErrorFormatter(error.message);
        return res.status(500).send(response);
    }
  
};

export default HandleErrorResponse;