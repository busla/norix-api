/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  index: function (req, res) {

    if (!req.param('user') || !req.param('password') || !req.param('club')) {
      return res.json(401, {err: 'Það vantar eitthvað í formið'});
    }

    Scrapy.scrape(req.param('user'), req.param('password'), req.param('club'), function(results) {      
      if (results) {
        User.findOne({username: req.param('user')})
          .then(function(user) {
            if (user) {
              console.log('USER:', user);
              User.comparePassword(req.param('password'), user, function (err, valid) {
                //console.log('VALID:', valid);
                if (err) {
                  return res.json(403, {err: 'forbidden'});
                } 
                               
                if (!valid) {
                  return res.json(401, {err: 'invalid email or password'});
                  //console.log('result.res: ', result.res)
                } else {
                  res.json({
                    user: user,
                    token: jwToken.issue({id : user.id })
                  });
                  //console.log('result.res: ', result.res)
                }                                     
              })               
            }
            else {
              User.create({username: req.param('user'), password: req.param('password')})
              .then(function(user) {
                console.log('user: ', user);

                // If user created successfuly we return user and token as response
                if (user) {
                  // NOTE: payload is { id: user.id}
                  res.json(200, {user: user, token: jwToken.issue({id: user.id})});
                }
              })
              .catch(function (err) {
                return res.json(err.status, {err: err});
              }); 
            }
          })
          .catch(function (err) {
            return res.json(err.status, {err: err});
          }); 
      }
      else {
        return res.json(403, {err: 'Gat ekki innskráð þig í Nora :-/'});  
      }
      

    });

    /*
    rp(options)
      .then(function(res) {
        //var data = JSON.parse(res);
        console.dir(res);
        
        
        if (res.items.length > 0) {
          
        }         

    })
    .catch(console.error);
    return res.json(result.res);  
    */ 
  }

};