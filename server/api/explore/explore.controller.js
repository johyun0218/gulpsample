'use strict';

//import jsonpatch from 'fast-json-patch';
//import performRequest from '../../components/utilities/performRequest';
import * as api from '../api.service';

export function index(req, res, next) {
  var count = req.query.count || 50;
  var cursor = req.query.cursor || '';
  api.get('/v2/explore', {
    count: count,
    cursor: cursor
  }, req)
  .then(data => res.json(data))
  .catch(err => next(err));
}


export function trending(req, res, next) {
  api.get('/v2/explore/trending', {}, req)
  .then(function(data) {
    res.json(data);
  })
  .catch(function(err) {
    next(err);
  });
  // var pageIndex = req.param('pageIndex').replace('t3_', '');
  // if(pageIndex === null) {
  //   pageIndex = '0';
  // }

  // pageIndex = parseInt(pageIndex, 10);
  // api.cannonRequest('https://www.canon-ci.co.kr/gallery/themeListMore/ajax',
  // 'POST'
  // , {
  //   firstIndex: pageIndex * 48,
  //   lastIndex: pageIndex * 48 + 48
  // })
  // .then(function(data) {
  //   res.finish(200, data);
  // })
  // .catch(function(err) {
  //   next(err);
  // });
}

export function featured(req, res, next) {
  api.get('/v2/explore/featured', {}, req)
  .then(function(data) {
    res.json(data);
  })
  .catch(function(err) {
    next(err);
  });
}


export function trendinghtml(req, res, next) {
  var pageIndex = req.param('pageIndex').replace('t3_', '');
  if(pageIndex === null) {
    pageIndex = '0';
  }

  pageIndex = parseInt(pageIndex, 10);
  //cannonRequest()
  api.cannonRequest('https://www.canon-ci.co.kr/gallery/themeListMore/ajax',
  'POST'
  , {
    firstIndex: pageIndex * 48,
    lastIndex: pageIndex * 48 + 48
  })
  .then(function(data) {
    res.render('explore/list', {title: 'zzzz', data: data});
  })
  .catch(function(err) {
    next(err);
  });
}
