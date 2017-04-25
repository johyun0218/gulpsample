'use strict';

import express from 'express';
import passport from 'passport';
import {signToken} from '../auth.service';

var router = express.Router();

router.post('/', function(req, res, next) {
  passport.authenticate('local', function(err, tokenInfo, info) {
    var error = err || info;
    if(error) {
      return res.status(401).json(error);
    }
    if(!tokenInfo) {
      return res.status(404).json({message: 'Something went wrong, please try again.'});
    }

    var token = signToken(tokenInfo.access_token);
    res.json(token);
  })(req, res, next);
});

export default router;
