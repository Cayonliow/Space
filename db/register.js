var User = require('./user');
var querystring = require('querystring');
var url = require('url');
var mongoose = require('mongoose');


exports.doFinal = function(req, res){



///////////////////////////////////////////
var preparse = '';
for (i=5; i<req.length; i++)
	preparse = preparse + req[i];

//Due to some reasons , it need to be pre-parse.

///////////////////////////////////////////



var para = querystring.parse(preparse);
var in_password = para.password;
var in_name = para.account;


console.log(para);


var element = new User({
	name: in_name ,
	id: "laochanlam" ,
	password: in_password });
	



User.findOne({ name : in_name },  function (err, user) {
  		if (err) return console.log(err);
  		if (user == null) {
  			element.save(function(err,element){
  			if (err) return console.error(err);
  			res.redirect('/');
  			});
  		}
  		else
  			res.send('該名字已經有人用囉~	');
	});	


	

}