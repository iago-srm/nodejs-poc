import pino from "pino";
const logger = pino({
  prettyPrint: {
    ignore: process.env.NODE_ENV !== "prod" ? "pid, hostname" : undefined,
  },
});

export { logger };
