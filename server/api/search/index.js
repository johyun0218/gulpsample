'use strict';

import {Router} from 'express';
import * as controller from './search.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

router.get('/showcases', auth.isAuthenticated(), controller.showcases);
router.get('/users', auth.isAuthenticated(), controller.users);
router.get('/items', auth.isAuthenticated(), controller.items);

module.exports = router;
