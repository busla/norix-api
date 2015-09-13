/**
* Player.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  connection: 'sailsMongoDBServer',
  tableName: 'players',
  autoPK: false,

  attributes: {

    player_name: {
      type: 'string',
      required: true
    },

    seminars: {
      collection: 'Seminar',
      via: 'players'
    },
    // e.g., "cm"
    phone: {
      type: 'string',
      required: false
    },
    
    email: {
      type: 'string',
      required: false
    },
    ssn: {
      type: 'string',
      required: true,
      primaryKey: true
    }
  }
};

