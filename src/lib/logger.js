import winston, { transports, format as winstonFormat } from 'winston';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';

const { colorize, combine, simple, printf } = winstonFormat;

const customFormat = combine(
  colorize(),
  simple(),
  printf((info) => {
    const { level, message } = info;

    const timestamp = format(new Date(), 'yyyy-MM-dd HH:mm:ss', {
      locale: pt,
    });
    return `${timestamp} [${level}]: ${message}`;
  })
);

export default winston.createLogger({
  transports: [
    new transports.Console({
      level: 'info',
      format: customFormat,
    }),
  ],
});
