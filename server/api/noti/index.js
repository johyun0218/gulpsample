'use strict';

import {Router} from 'express';
import * as controller from './noti.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.post('/', auth.isAuthenticated(), controller.read);
module.exports = router;
