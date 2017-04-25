'use strict';

import * as api from '../api.service';

export function index(req, res, next) {
  var id = req.params.id;
  //console.log('q='+ q);
  api.get('/v2/showcases/'+ id, {
    showcaseId: id
  }, req)
  .then(data => res.finish(200, data))
  .catch(err => next(err));
}

export function comments(req, res, next) {
  api.get(`/v2/showcases/${req.params.id}/comments`, {
    showcaseId: req.params.id,
    count: 9,
    cursor: ''
  }, req)
  .then(data => res.json(data))
  .catch(err => next(err));
}

export function createcomments(req, res, next) {
  var id = req.params.id;
  var value = req.body.value;
  var params = {showcaseId: id};
  params.comment_text = {
    elements: [{
      type: 'Text',
      value: value
    }]
  };
  //console.log(params);
  //console.log(params.command.comment_text.elements);
  api.postJson(`/v2/showcases/${req.params.id}/comments`, params, req)
  .then(data => res.finish(200, data))
  .catch(err => next(err));
}


export function destroycomments(req, res, next) {
  var id = req.params.id;
  var commentId = req.params.commentId;
  api.del(`/v2/showcases/${id}/comments/${commentId}`, {
    showcaseId: id,
    commentId: commentId
  }, req)
  .then(data => res.finish(200, data))
  .catch(err => next(err));
}
