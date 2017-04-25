'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/envicase3-dev'
  },

  FACEBOOK_ID: '240855822718053',
  FACEBOOK_SECRET: '72bde7a6a943d15b4f9dd490d39c2c95',

  GOOGLE_ID: '115119258346-vfcuic11cq8ikivnsqokb4ud927mrm53.apps.googleusercontent.com',
  GOOGLE_SECRET: 'OX03aCH0oDUPr0tF3CMFTFDM',

  // Seed database on startup
  seedDB: true

};
