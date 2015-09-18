/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  login: function (req, res) {
    
    if (!req.param('user') || !req.param('password') || !req.param('club')) {
      return res.json(401, {err: 'Það vantar eitthvað í formið'});
    }

    User.findOne({username: req.param('user')})
    .populate('user_has_seminars')
      .then(function(user) {
        if (user) {          
          User.comparePassword(req.param('password'), user, function (err, valid) {                
            if (err) {
              return res.json(403, {err: 'bannað!'});
            } 
                           
            if (!valid) {
              return res.json(401, {err: 'rangt notandanafn eða lykilorð'});                  
            } else {
              var seminars = [];
              user.user_has_seminars.forEach(function (seminar) {
                  seminars.push(seminar.seminar_id)
              });
              console.log('SEMINARS: ', seminars)
              res.json(200, {
                username: user.username,
                /* 
                TODO: figure out how to have bcrypt return the unencrypted 
                password to prevent storing unencrypted password in token 
                */
                token: jwToken.issue({id : user.id, password: req.param('password'), seminars: seminars})
              });                  
            }                                     
          })               
        }
        else {
          Scrapy.scrape(req.param('user'), req.param('password'), req.param('club'), function(results) {      
            //console.log('results: ', results);

            if (results) {
              User.findOne({username: req.param('user')})
              .populate('user_has_seminars')
                .then(function(user) {   
                  var seminars = [];
                  user.user_has_seminars.forEach(function (seminar) {
                      seminars.push(seminar.seminar_id)
                  });
                  res.json(200, {
                    username: user.username,
                    /* 
                    TODO: figure out how to have bcrypt return the unencrypted 
                    password to prevent storing unencrypted password in token 
                    */
                    token: jwToken.issue({id : user.id, password: req.param('password'), seminars: seminars })
                  });
                })
              .catch(function (err) {
                return res.json(err.status, {err: err});
              });
            }
            else {
              return res.json(403, {err: 'Gat ekki innskráð þig í Nora :-/'});  
            }
          });
        }
      })
      .catch(function (err) {
        return res.json(err.status, {err: err});
      }); 
  },

};