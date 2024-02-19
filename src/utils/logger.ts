import logger from "pino";
import dayjs from "dayjs";
import config from "config";

const level = config.get<string>("logLevel");

const log = logger({
  transport: {
    target: "pino-pretty",
  },
  level,
  base: {
    pid: false, //process id
  },
  timestamp: () => `,"time":"${dayjs().format()}"`, //function returns a string
});

export default log;