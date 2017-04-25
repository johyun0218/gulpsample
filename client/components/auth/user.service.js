'use strict';

export function UserResource($resource) {
  'ngInject';

  return $resource('/api/users/:id/:controller/:followeeId', {
    id: '@_id',
    followeeId: '@followeeId'
  }, {
    changePassword: {
      method: 'PUT',
      params: {
        id: 'me',
        controller: 'password'
      }
    },
    changeUsername: {
      method: 'PUT',
      params: {
        id: 'me',
        controller: 'change-username'
      }
    },
    get: {
      method: 'GET',
      params: {
        id: 'me'
      }
    },
    info: {
      method: 'GET',
      params: {
        controller: 'info',
      }
    },
    followers: {
      method: 'GET',
      params: {
        controller: 'followers',
      }
    },
    follow: { ///me/follow/:followeeId
      method: 'POST',
      params: {
        id: 'me',
        controller: 'follow'
      }
    },
    unfollow: {
      method: 'POST',
      params: {
        id: 'me',
        controller: 'unfollow'
      }
    }
  });
}
