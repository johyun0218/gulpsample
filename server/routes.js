/**
 * Main application routes
 */

'use strict';

import errorHandler from './components/errors/errorHandler';
import path from 'path';
import _ from 'lodash';
import errors from './components/errors';

// var errors = require('./components/errors'),
//     errorHandler = require('./components/errors/errorHandler');

var api = function(route) {
  return '/api' + route;
};

Error.new2 = function(e) {
  var err = new Error();
  _.extend(err, e);
  return err;
};

export default function(app) {
  app.route(api('/*'))
    .all(function(req, res, next) {
      res.setToken = function(token) {
        res.setHeader('Auth-Token', token);
        res.token = token;
      };

      res.finish = function(data) {
        if(arguments.length == 1) {
          if(typeof data == 'number') {
            res.status(data);
          }
        }

        if(arguments.length == 2) {
          if(typeof arguments[1] == 'number') {
            res.status(arguments[1]);
          } else {
            res.status(data);
            data = arguments[1];
          }
        }

        // 응답데이타
        data = data || {};
        var result = {data: data};
        if(res.token) result.token = res.token;
        res.json(result);
      };

      next();
    });

  // Insert routes below
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/explore', require('./api/explore'));
  app.use('/api/newsfeed', require('./api/newsfeed'));
  app.use('/api/search', require('./api/search'));
  app.use('/api/showcase', require('./api/showcase'));
  app.use('/api/noti', require('./api/noti'));

  app.use('/auth', require('./auth').default);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
  .get(errors[404]);

  app.route(api('/*'))
    .all(function(req, res, next) {
      //console.log(Error);
      next(Error.new2({
        code: 'API_NOT_FOUND',
        message: 'API for url:' + req.url + ' is not found'
      }));
    });

  app.use(errorHandler());

  // 나중에 동적으로 페이지 생성시 사용
  //All other routes should redirect to the index.html
  app.use('/', function(req, res) {
    var data = {title: 'envicase-' + req.url, isLoggedIn : false};
    if(req && req.cookies && req.cookies.token) {
      data.isLoggedIn = true;
    }
    var isApple = !!req.headers['user-agent'].match(/iPad|iPhone/);
    var isAndroid = !!req.headers['user-agent'].match(/Android/);
    data.isApple = isApple;
    data.isAndroid = isAndroid;

    res.render(path.resolve(`${app.get('appPath')}/index2.html`), {data: data});
  });

  // 일반 html 파일 테스트
  // app.route('/*')
  //   .get((req, res) => {
  //     res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
  //   });
}
