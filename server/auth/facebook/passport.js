import passport from 'passport';
import {Strategy as FacebookStrategy} from 'passport-facebook';
import * as api from '../../api/api.service';

export function setup(config) {
  passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL,
    profileFields: [
      'displayName',
      'emails'
    ]
  },
  function(accessToken, refreshToken, profile, done) {
    //console.log('accessToken:'+ accessToken);
    // 1. facebook 사용자 정보 조회

    api.postJson('/v2/account/facebook/sign-in', {
      access_token: accessToken
    }, {})
    .then(data => {
      // 2. 정상이면 token 값을 리턴한다.(회원가입이 되어 있다면)
      return done(null, data);
    })
    .catch(err => {
      //console.log(err);
      // 3. errCode : 400 잘못된 요청
      //    errCode : 404 회원가입이 되어 있지 않은 상태
      var statusCode = err.statusCode;
      //console.log('statusCode:'+ statusCode);
      if(statusCode === 400) {
        return done(err);
      } else if (statusCode === 404) {
        api.postJson('/v2/account/facebook/register', {
          access_token: accessToken
        }, {})
        .then((data) => {
          return done(null, data);
        })
        .catch(err => {
          return done(err);
        });
      } else {
        return done(err);
      }
    });
  }));
}
