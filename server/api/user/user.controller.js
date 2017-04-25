'use strict';

import User from './user.model';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';
import * as api from '../api.service';

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    return res.status(statusCode).json(err);
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    return res.status(statusCode).send(err);
  };
}


/**
 * Get list of users
 * restriction: 'admin'
 */
export function index(req, res) {
  return User.find({}, '-salt -password').exec()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(handleError(res));
}

/**
 * Creates a new user
 */
export function create(req, res) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save()
    .then(function(user) {
      var token = jwt.sign({ _id: user._id }, config.secrets.session, {
        expiresIn: 60 * 60 * 5
      });
      res.json({ token });
    })
    .catch(validationError(res));
}

/**
 * Get a single user
 */
export function show(req, res, next) {
  var userId = req.params.id;

  return User.findById(userId).exec()
    .then(user => {
      if(!user) {
        return res.status(404).end();
      }
      res.json(user.profile);
    })
    .catch(err => next(err));
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
export function destroy(req, res) {
  return User.findByIdAndRemove(req.params.id).exec()
    .then(function() {
      res.status(204).end();
    })
    .catch(handleError(res));
}

/**
 * Change a users password
 */
export function changePassword(req, res) {
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  api.postJson('/v2/me/change-password', {
    old_password: oldPass,
    new_password: newPass
  }, req)
  .then(() => {
    res.status(204).end();
  })
  .catch(err => {
    console.log(err);
    return res.status(403).end();
  });
}

/**
 * Change user name
 */
export function changeUsername(req, res, next) {
  var username = String(req.body.username);
  api.postJson('/v2/me/change-username', {
    username: username
  }, req)
  .then(() => {
    res.status(204).end();
  })
  .catch(err => {
    next(err);
  });
}

export function updateProfilePhoto(req, res) {
  //console.log(req.file);
  var image_data = req.file.buffer.toString('base64');

  api.postJson('/v2/me/update-profile-photo', {
    image_data: image_data
  }, req)
  .then(() => {
    res.json({
      name: req.file.originalname,
      base64: image_data
    });
  })
  .catch(err => {
    console.log(err);
    return res.status(403).end();
  });
  
  
}

/**
 * Get my info
 */
export function me(req, res, next) {
  api.get('/v2/me', {}, req)
  .then(user => {
    user.role = 'user';
    user._id = user.user.id;
    user.name = user.username;
    res.json(user);
  })
  .catch(err => next(error));
}

/**
 * Authentication callback
 */
export function authCallback(req, res) {
  res.redirect('/');
}

export function info(req, res, next) {
  var id = req.params.id;
  api.get('/v2/users/'+ id, {
    userId: id
  }, req)
  .then(data => res.finish(200, data))
  .catch(err => {
    next(api.ErrorNew({
        code: err.statusCode,
        message: err.error.Message
      }));
  });
}


export function showcases(req, res, next) {
  var id = req.params.id;
  var cursor = req.query.cursor || '';
  var count = req.query.count || 10;

  api.get('/v2/users/'+ id + '/showcases', {
    userId: id,
    count: count,
    cursor: cursor
  }, req)
  .then(data => res.json(data))
  .catch(err => next(err));
}

export function envied_showcases(req, res, next) {
  var id = req.params.id;
  api.get('/v2/users/'+ id + '/envied-showcases', {
    userId: id,
    count: 10,
    cursor: 1
  }, req)
  .then(data => res.finish(200, data))
  .catch(err => next(err));
}

export function follow(req, res, next) {
  var followeeId = req.params.followeeId;
  api.post('/v2/me/follow/'+ followeeId, {
  }, req)
  .then(data => res.finish(200, data))
  .catch(err => next(err));
}

export function unfollow(req, res, next) {
  var followeeId = req.params.followeeId;
  api.post('/v2/me/unfollow/'+ followeeId, {
  }, req)
  .then(data => res.finish(200, data))
  .catch(err => next(err));
}

export function followers(req, res, next) {
  var id = req.params.id;
  var cursor = req.query.cursor || '';
  var count = req.query.count || 10;
  api.get('/v2/users/'+ id + '/followers', {
    userId: id,
    count: count,
    cursor: cursor
  }, req)
  .then(data => res.finish(200, data))
  .catch(err => next(err));
}

export function followees(req, res, next) {
  var id = req.params.id;
  api.get('/v2/users/'+ id + '/followees', {
    userId: id,
    count: 10,
    cursor: 1
  }, req)
  .then(data => res.finish(200, data))
  .catch(err => next(err));
}