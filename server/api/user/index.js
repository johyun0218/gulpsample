'use strict';

import {Router} from 'express';
import multer from 'multer';
import * as controller from './user.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();
var upload = multer();

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/me/password', auth.isAuthenticated(), controller.changePassword);
router.put('/me/change-username', auth.isAuthenticated(), controller.changeUsername);
router.post('/me/update-profile-photo', auth.isAuthenticated(), upload.single('file'), controller.updateProfilePhoto);
router.post('/me/follow/:followeeId', auth.isAuthenticated(), controller.follow);
router.post('/me/unfollow/:followeeId', auth.isAuthenticated(), controller.unfollow);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);

router.get('/:id/info', auth.isAuthenticated(), controller.info);
router.get('/:id/showcases', auth.isAuthenticated(), controller.showcases);
router.get('/:id/envied-showcases', auth.isAuthenticated(), controller.envied_showcases);
router.get('/:id/followers', auth.isAuthenticated(), controller.followers);
router.get('/:id/followees', auth.isAuthenticated(), controller.followees);

module.exports = router;
