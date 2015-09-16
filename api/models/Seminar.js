/**
* Seminar.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  connection: 'sailsMongoDBServer',
  tableName: 'seminars',
  autoPK: false,

  attributes: {
    
    attendance: {
      collection: 'Attendance',
      via: 'seminar'

    },
    
    seminar_has_users: {
      collection: 'User',
      via: 'user_has_seminars',
    },

    players: {
      collection: 'Player',
      via: 'seminars'

    },

    seminar_id: {
      type: 'integer',
      required: true,
      primaryKey: true
    },

    seminar_name: {
      type: 'string',
      required: true
    },
  }
};

