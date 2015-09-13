/**
* Attendance.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  connection: 'sailsMongoDBServer',
  tableName: 'attendance',
  //autoPK: true,
  schema: false,

  attributes: {
    /*    
    seminar: {
      type: 'integer',
      required: true      
      
    },
    */
    date: {
      type: 'datetime',
      required: true,
    }, 
    

    attended: {
      type: 'json'
    }, 
    
    seminar: {
      model: 'Seminar',
      //columnName: 'seminar'
    }              
  }    
};

