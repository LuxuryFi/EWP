const logger = require('../services/loggerService');
var geoip = require('geoip-lite');
const generateBcrypt = require('../services/generateBcrypt');

exports.service1Test = async (req, res) => {
  try {
    logger.info('Working');
    const ip = req.headers['x-forwarded-for'].split(',').shift();

    var geo = geoip.lookup(ip);

    console.log(geo);

    res.send('Congratulations');
  } catch (err) {
    console.log('Test')
    logger.error('Failed', err);
  }
}
