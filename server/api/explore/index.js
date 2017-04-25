'use strict';

var express = require('express');
var controller = require('./explore.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/trending', controller.trending);
router.get('/featured', controller.featured);
router.get('/trendinghtml', controller.trendinghtml);

module.exports = router;
