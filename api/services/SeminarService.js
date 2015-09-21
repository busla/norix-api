
module.exports.getSeminars = function(seminarId, cb) {
    //console.log('SeminarController: ', req.token.seminars);
  //console.log('seminars: ', seminarId);
  //var seminarIds = seminars;
  seminarId.map(String);

  Seminar.find({seminar_id: seminarId})
  .populate('attendance')
  .populate('players')
    .then(function(seminars) {
      //console.log(seminars);
      cb(null, seminars)  
    })
  /*    
  Seminar.find()
  .populate('players')
  .populate('attendance')
  .populate('seminar_has_users')
    .then(function(seminars) {
      if (seminars) {
        //console.log(seminars)
        //res.json(200, seminars)          
      }
    })
    */  
    .catch(function (err) {
      cb(err, null)  
    });  
         
};
