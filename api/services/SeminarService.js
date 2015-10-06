
module.exports.getSeminars = function(req, seminars, cb) {
    //console.log('SeminarController: ', req.token.seminars);
  //console.log('seminars: ', seminarId);
  //var seminarIds = seminars;
  console.log('seminars: ', seminars);
  var seminarList = seminars.map(String);

  Seminar.find({seminar_id: seminarList}).sort('age_group ASC')
  .populate('attendance', { sort: 'date DESC', limit: req.param('limit'), skip: req.param('skip') })
  .populate('players', { sort: 'player_name ASC' })
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


