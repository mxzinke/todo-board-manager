const { createLogger, format, transports } = require('winston');
// See https://github.com/winstonjs/winston for documentation

const logger = createLogger({
  level: 'info', // To see more detailed errors, change this to 'debug'
  format: format.combine(format.splat(), format.simple()),
  transports: [new transports.Console()]
});

module.exports = function() {
  return (context) => {
    logger.debug(
      `${context.type} app.service('${context.path}').${context.method}()`
    );

    if (typeof context.toJSON === 'function') {
      logger.debug('Hook Context', JSON.stringify(context, null, '  '));
    }

    if (context.error) {
      logger.error(context.error);
    }
  };
};
