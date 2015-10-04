/**
 * SeminarController
 *
 * @description :: Server-side logic for managing seminars
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  
  index: function(req, res) {
    console.log('SeminarController: ', req.token.seminars); 
    SeminarService.getSeminars(req.token.seminars, function(err, results) {
      //console.log('SeminarController: ', results); 
      if (err) {
        return res.json(err);  
      }

      res.json(200, {data: results})
    }); 
    /*   
    //console.log('SeminarController: ', req.token.seminars);
    Seminar.find({where: {seminar_id: req.token.seminars}})
    .populate('attendance')
    .populate('players')
      .then(function(seminars) {
        //console.log(seminars);
        res.json(200, seminars)  
      })
      .catch(function (err) {
        return res.json(err.status, {err: err});
      });       
    */
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
  },
  
  sync: function (req, res) {
    console.log(req.token)
    
    User.findOne({id: req.token.id})
      .then(function(user) {
        if (user) {  
          console.log(user)          
          Scrapy.scrape(user.username, req.token.password, user.club, function(results) {      
            console.log('results: ', results);

            if (results) { 
              SeminarService.getSeminars(req.token.seminars, function(err, results) { 
                
                console.log(user.username);     
                if (err) {
                  return res.json(err);  
                }

                res.json(200, {data: results})
              });                          
              //return res.json(200, {});
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

