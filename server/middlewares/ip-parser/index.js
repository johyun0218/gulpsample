'use strict';

export default function(app) {
  app.use(function(req, res, next) {
    var ipAddress = '';
    if(!req.hasOwnProperty('sessionID')) {
      ipAddress = req.headers['x-forwarded-for'];
    } else {
      var forwardedIpsStr = req.header('x-forwarded-for');
      if(forwardedIpsStr) {
        ipAddress = forwardedIpsStr.split(',')[0];
      }
      if(!ipAddress) {
        ipAddress = req.connection.remoteAddress;
      }
    }
    req.headers['client-ip'] = ipAddress;//req.hreaders['client-ip'] || req.hreaders['x-forwarded-ip'] || '0.0.0.0';
    next();
  });
}
