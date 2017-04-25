'use strict';
import config from '../config/environment';
import querystring from 'querystring';
//import https from 'https';
//import request from 'request';
import rp from 'request-promise';
import _ from 'lodash';
import Q from 'q';
import cheerio from 'cheerio';
import iconv from 'iconv-lite';

export function ErrorNew(e) {
  var err = new Error();
  _.extend(err, e);
  return err;
}

function request(endpoint, data, req, method) {
  var deferred = Q.defer();
  var qs = {};
  var header = {};

  if(req.headers.authorization) {
    header.Authorization = req.headers.authorization;
  }
  _.extend(qs, data);
  var options = {
    method: method,
    uri: config.enviServiceApiUrl + endpoint,
    headers: header,
    qs: qs,
    json: true
  };
  rp(options).then(function(result) {
    deferred.resolve(result);
  })
  .catch(function(err) {
    //console.log(err);
    deferred.reject(err);
  });

  return deferred.promise;
}

export function get(endpoint, data, req) {
  return request(endpoint, data, req, 'GET');
}

export function del(endpoint, data, req) {
  return request(endpoint, data, req, 'DELETE');
}

export function postJson(endpoint, data, req) {
  var deferred = Q.defer();
  var qs = {};
  _.extend(qs, data);

  var jsonObject = qs;
  var header = {
    'Content-Type': 'application/json'
  };

  if(req && req.headers && req.headers.authorization) {
    header.Authorization = req.headers.authorization;
  }

  //console.log(header.Authorization);

  var options = {
    method: 'POST',
    uri: config.enviServiceApiUrl + endpoint,
    headers: header,
    body: jsonObject,
    json: true
  };
  rp(options).then(function(result) {
    deferred.resolve(result);
  })
  .catch(function(err) {
    deferred.reject(err);
  });

  return deferred.promise;
}

export function post(endpoint, data, req) {
  var deferred = Q.defer();
  var qs = {};
  _.extend(qs, data);

  var jsonObject = querystring.stringify(qs);
  var header = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(jsonObject, 'utf8')
  };

  if(req && req.headers && req.headers.authorization) {
    header.Authorization = req.headers.authorization;
  }

  var options = {
    method: 'POST',
    uri: config.enviServiceApiUrl + endpoint,
    headers: header,
    body: jsonObject,
    json: true
  };
  rp(options).then(function(result) {
    deferred.resolve(result);
  })
  .catch(function(err) {
    deferred.reject(err);
  });

  return deferred.promise;
}

// export function apiRequest(endpoint, method, data, req){
//   var deferred = Q.defer();
//   var qs = {};
//   _.extend(qs, data);

//   var jsonObject = querystring.stringify(qs);

//   var options = {
//     method: 'POST',
//     uri: config.enviServiceApiUrl + endpoint,
//     headers: {
//            'Content-Type': 'application/x-www-form-urlencoded',
//            'Content-Length': Buffer.byteLength(jsonObject, 'utf8')
//     },
//     body: jsonObject,
//     json:true
//   };
//   _.extend(options, {
//     method: method
//   });
//   rp(options).then(function(data){
//     deferred.resolve(data);
//   })
//   .catch(function(err){
//     deferred.reject(err);
//   });

//   return deferred.promise;
// }


export function cannonRequest(endpoint, method, data) {
  var deferred = Q.defer();
  var qs = {};
  _.extend(qs, data);
  var options = {
    method: 'GET',
    //uri: 'https://dev-envi-service-host.azurewebsites.net'+ endpoint,
    uri: endpoint,
    headers: {
      Authorization: 'Request-Promise',
      Origin: 'https://www.canon-ci.co.kr',
      Referer: 'https://www.canon-ci.co.kr/gallery'
    },
    qs: qs
  };

  _.extend(options, {
    method: method
  });

  rp(options).then(function(body) {
    //iconv.extendNodeEncodings();
    var strContents = new Buffer(body, 'binary');

    //console.log(iconv.decode(strContents, 'UTF-8').toString());

    var $ = cheerio.load(iconv.decode(strContents, 'UTF-8'));

    var list = [];
    $('li').each(function() {
      var obj = {};
      var me = $(this);
      obj.seq = me.find('a')
                  .attr('onclick')
                  .replace('goDetail(\'', '')
                  .replace('\'); return false;', '');
      obj.text = me.find('span.txt_overflow').html();
      obj.url = me.find('span.img img').attr('src');
      obj.score = me.find('span.score').html();
      //console.log(obj.text);
      list.push(obj);
    });
    deferred.resolve(list);
  })
  .catch(function(err) {
    deferred.reject(err);
    // deferred.reject(Error.new2({
    //   code: 'AUTHENTICATION_REQUIRED',
    //   message: err.error.Message
    // }));
  });
  return deferred.promise;
}
