import { createLogger, format, transports } from "winston";
import type { TransformableInfo } from "logform";

const { combine, timestamp, json, colorize, printf } = format;

const consoleLogFormat = printf((info: TransformableInfo) => {
    const message = typeof info.message === "string" ? info.message : JSON.stringify(info.message);
    return `${info.timestamp} ${info.level}: ${message}`;
  });
  

const logger = createLogger({
  level: "info",
  format: combine(colorize(), timestamp(), json()),
  transports: [
    new transports.Console({
      format: consoleLogFormat,
    }),
    new transports.File({ filename: "app.log" }),
  ],
});

export default logger;
