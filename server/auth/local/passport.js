import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';

// import * as api from '../api.service';
import * as api from '../../api/api.service';

function localAuthenticate(email, password, done) {
  api.post('/v2/auth/token', {
    grant_type: 'password',
    username: email,
    password: password
  }, {})
  .then(data => {
    return done(null, data);
  })
  .catch(err => {
    done(err);
  });
}

export function setup(/*config*/) {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password' // this is the virtual field on the model
  }, function(email, password, done) {
    return localAuthenticate(email, password, done);
  }));
}
