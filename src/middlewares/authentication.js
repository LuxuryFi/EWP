const jwt = require('jsonwebtoken');
const logger = require('../services/loggerService');
const messages = require('../configs/customMessages');


exports.isAuthenticated = async (req ,res) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization;
      req.user = jwt.verify(token, 'test');
      logger.info(`Authenticated client: ${req.user.username}`);
    }

    const ipAddress = req.headers['x-forwarded-for'] || (req.connection && req.connection.remoteAddress);
    if (ipAddress !== undefined) {
      const geo = geoip.lookup(ipAddress);
      if (geo && geo.country !== undefined) {
        logger.info('Authenticated user country', { authClientCountry: geo.country });
      }
    }

    return next();
  } catch (err) {
    logger.error('Authenticated error', { err });
    return next(err);
  }

}
