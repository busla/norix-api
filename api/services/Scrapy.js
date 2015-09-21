/**
 * scrapy
 *
 * @description :: Login service for Scrapy
 * @help        :: TODO
 */
 

module.exports.scrape = function(user, password, club, cb) {
    var rp = require('request-promise');
    var urls = {
        noriUrl: 'http://'+club+'.felog.is/UsersLogin.aspx',
        scrapyUrl: 'http://127.0.0.1:9080/crawl.json'
    };

    var payload = {      
      request: {
        url: urls.noriUrl, 
        meta: {
          user: user, 
          password: password,
          club: club
        },
      },
      spider_name:"norix", 
    };

    var options = {
      uri : urls.scrapyUrl,
      method : 'POST',
      json: true,
      body: payload
    };

    rp(options)
      .then(function(res) {
        //var data = JSON.parse(res);
        console.dir(res);
        
        /* If authenticated in Nori */
        if (res.items.length > 0) {
          cb(true)
        }   
        else {
          cb(false);  
        }
        
        

    })
    .catch(function(err) {
      return cb(err)
    })  
};
