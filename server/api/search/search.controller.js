'use strict';

import * as api from '../api.service';

export function showcases(req, res, next) {
  var search = req.query.search;
  var count = req.query.count;
  var cursor = req.query.cursor || '';
  //console.log('q='+ q);
  api.get('/v2/search/showcases', {
    search: search,
    count: count,
    cursor: cursor
  }, req)
  .then(data => res.json(data))
  //.then(data => res.render('newsfeed/list', {data: data.data}))
  .catch(err => next(err));
}

export function users(req, res, next) {
  var q = req.query.q;
  var c = req.query.c || '';
  api.get('/v2/search/users', {
    search: q,
    count: 9,
    cursor: c
  }, req)
  .then(data => res.finish(200, data))
  .catch(err => next(err));
}

export function items(req, res, next) {
  var arr = [];
  var data = {};
  for (var i = 0; i < 10; i++) {
    arr.push({id: 'id_'+ i, name: 'name_'+ i});
  }
  data.data = arr;
  res.json(data);
}
