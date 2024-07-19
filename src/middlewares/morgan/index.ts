import morgan from "morgan";
import { logger } from "../../helpers/log";

const stream = {
  write: (message: string) => logger.info(message),
};


export const MiddlewareMorgan = morgan(
 ":remote-addr :method :url :status :res[content-length] - :response-time ms",
    {
    stream: stream as morgan.StreamOptions
    }
);

