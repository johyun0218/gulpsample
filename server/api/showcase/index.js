'use strict';

import {Router} from 'express';
import * as controller from './showcase.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

router.get('/:id', auth.isAuthenticated(), controller.index);
router.get('/:id/comments', auth.isAuthenticated(), controller.comments);
router.post('/:id/comments', auth.isAuthenticated(), controller.createcomments);
router.delete('/:id/comments/:commentId', auth.isAuthenticated(), controller.destroycomments);

module.exports = router;
