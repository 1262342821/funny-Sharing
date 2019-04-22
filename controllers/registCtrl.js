var formidable = require("formidable");
var crypto = require("crypto");
var User = require("../models/User.js");

//显示注册页面
exports.showRegist = function(req,res){
	res.render("regist" , {
		//当前所在的栏目
		"column" : "regist",
		"login" : req.session.login ,
		"email" : req.session.email
	});
}


//执行注册
exports.doRegist = function(req,res){
	//识别用户的请求
	var form = new formidable.IncomingForm();
	form.parse(req , function(err , fields , files){
		var email = fields.email;
		var password = fields.password1;

		//此时要进行加密！下面的语句表示用SHA256加密password然后处理为16进制
		password = crypto.createHash('SHA256').update(password + "qufenxiang").digest("hex");

		//再次验证用户名是否存在了！
		User.count({"email" : email} , function(err , count){
			if(count == 0){
				//写入数据库
				User.create({
					"email" : email , 
					"password" : password
				},function(err){
					res.json({"result" : err ? -1 : 1});
				});
			}else{
				//-2用户名被占用
				res.json({"result" : -2});
			}
		});
			
	});
}

//执行注册
exports.checkUserExist = function(req,res){
	//识别用户的请求
	var form = new formidable.IncomingForm();
	form.parse(req , function(err , fields , files){
		var email = fields.email;
		User.count({"email" : email} , function(err , count){
			res.json({"result" : count});
		});
	});
}