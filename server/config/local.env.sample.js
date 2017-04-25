'use strict';

// Use local.env.js for environment variables that will be set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN: 'http://localhost:3000',
  SESSION_SECRET: 'envicase3-secret',

  FACEBOOK_ID: '240855822718053',
  FACEBOOK_SECRET: '72bde7a6a943d15b4f9dd490d39c2c95',

  GOOGLE_ID: '115119258346-vfcuic11cq8ikivnsqokb4ud927mrm53.apps.googleusercontent.com',
  GOOGLE_SECRET: 'OX03aCH0oDUPr0tF3CMFTFDM',

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
