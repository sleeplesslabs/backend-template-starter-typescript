import {createLogger, format, transports} from "winston";

const customFormat = format.combine(
    format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
    format.colorize(),
    format.printf(
      (level) => `${level.timestamp} ${level.level}: ${level.message}`,
    ),
);

export const logger = createLogger({
    level: "debug",
    format: customFormat,
    transports: [new transports.Console()],
});