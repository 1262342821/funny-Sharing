var express = require("express");
var fs = require("fs");
var mongoose = require("mongoose");
var url = require("url");
var app = express();
var session = require("express-session");

var loginCtrl = require("./controllers/loginCtrl.js");
var registCtrl = require("./controllers/registCtrl.js");
var mainCtrl = require("./controllers/mainCtrl.js");

app.use(express.static("www"));
//设置模板引擎
app.set("view engine", "ejs");

app.set('trust proxy', 1);
app.use(session({
    resave: false,
    secret: 'qasystem',
    saveUninitialized: true,
    cookie: { maxAge: 86400 }	//session能够存储的时间
}));

//数据库
mongoose.connect("mongodb://localhost/shareV1");

app.get("/login", loginCtrl.showLogin);
app.post("/login", loginCtrl.doLogin);

app.get("/regist", registCtrl.showRegist);
app.post("/regist", registCtrl.doRegist);
app.checkout("/regist", registCtrl.checkUserExist);

app.get("/main",mainCtrl.showMain);

app.get("/",function(req,res , next){
    var login = req.session.login;
    if(!login){
        res.redirect("/login");
    }else{
        next();
    }
});
app.get("/login",function(req,res){
    res.send("请登录,<input type='text'/>")
});

app.listen(3000);
console.log("我在3000端口等你呦！");