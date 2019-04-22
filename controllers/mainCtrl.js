var formidable = require("formidable");
var User = require("../models/User.js");
var crypto = require("crypto");

exports.showMain = function(req,res){
	
	//呈递模板引擎
	res.render("index",{
		"column" : "index" ,
		"login" : req.session.login ,
		"email" : req.session.email
	});
}

