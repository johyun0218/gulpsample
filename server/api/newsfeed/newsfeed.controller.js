'use strict';

import * as api from '../api.service';

export function index(req, res, next) {
  api.get('/v2/newsfeed', {
    count: 50
  }, req)
  .then(function(data) {
    //res.finish(200, data);
    res.json(data);
    //console.log(data.data);
    //res.render('newsfeed/list', {data: data.data});
  })
  .catch(function(err) {
    next(err);
  });
}
