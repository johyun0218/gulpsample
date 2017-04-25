'use strict';

import * as api from '../api.service';

export function index(req, res, next) {
  var count = req.query.count || 50;
  var cursor = req.query.cursor || '';
  api.get('/v2/notifications', {
    count: count,
    cursor: cursor
  }, req)
  .then(function(data) {
    res.json(data);
  })
  .catch(function(err) {
    next(err);
  });
}

export function read(req, res, next) {
  var arr = [];
  var ids = req.body.ids.split(',');
  for (var i = 0; i < ids.length; i++) {
    arr.push({notification_id: ids[i]});
  }
  console.log(arr);
  
  api.postJson('/v2/notifications/mark-as-read', arr, req)
  .then(data => res.finish(200, data))
  .catch(err => next(err));
}
