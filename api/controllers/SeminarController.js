/**
 * SeminarController
 *
 * @description :: Server-side logic for managing seminars
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  sync: function (req, res) {
    console.log(req.token)
    
    User.findOne({id: req.token.id})
      .then(function(user) {
        if (user) {  
          console.log(user)          
          Scrapy.scrape(user.username, req.token.password, user.club, function(results) {      
            console.log('results: ', results);

            if (results) {              
              return res.json(200, {});
            }
            else {
              return res.json(403, {err: 'Gat ekki innskráð þig í Nora :-/'});  
            }
          });
        }

        else {
          return res.json(403, {err: 'Hvað ertu að reyna að gera?'});
        }
      })
      .catch(function (err) {
        return res.json(err.status, {err: err});
      }); 
    
  }  
};

