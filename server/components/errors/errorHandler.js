'use strict';

var status = function(err) {
  switch (err.code) {
  case 'AUTHENTICATION_REQUIRED':
  case 'AUTHENTICATION_INVALID':
  case 'TOKEN_INVALID':
  case 'TOKEN_EXPIRED':
  case 'UNAUTHORIZED':
    return 401;
  case 'API_NOT_FOUND':
    return '404';
  default:
    //console.error(err.stack);
    return 500;
  }
};

exports = module.exports = function errorHandler() {
  /* jshint unused: false */
  return function errorHandler(err, req, res, next) {
    // Http Header설정
    res.status(status(err));
    var error = {};
    if (err.statusCode === 404) {
      error = {
        "error": {
          "code": err.statusCode,
          "message": err.response.statusMessage
        }
      }
    } else {
      error = err;
    }
    //for(var prop in err) error[prop] = err[prop];
    var json = JSON.stringify(error);
    res.setHeader('Content-Type', 'application/json');
    //console.log(json);
    res.end(json);
  };
};
