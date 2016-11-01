var path = require('path');
var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
var webpack = require('webpack');
var GatewayUtils = require('@hec/api-gateway');


var config = require('./webpack.config');

var compiler = webpack(config);

var app = express();

app.use(require('webpack-dev-middleware')(compiler, {
	//noInfo : true,
	//publicPath : config.output.path,
	stats: {
	   colors: true,
	}
}));
app.use(require('webpack-hot-middleware')(compiler));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(session({
  saveUninitialized: true,
  secret: 'keyboard cat',
  resave: false,
  cookie  : {secure: false,maxAge: 30 * 60 * 1000}
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use('local', new LocalStrategy({
    passReqToCallback : true
  },
  function (req, username, password, done) {
    var user = {
      'username': username,
      'password': password
    };

    let params = 'password='+password;
    params += '&userName='+username;

    let gateway = GatewayUtils.Gateway('23437156','cc7cd675676a2960f3f08d2f33929e09');
    let jsonStr = gateway.postJson('http://1db0e248ba89495892a8027366afb4f3-cn-beijing.alicloudapi.com/login','/login',params)

    console.log('abc123:' + jsonStr);

    if(jsonStr && JSON.parse(jsonStr).status == 'success'){
      return done(null, user);
    } else {
      return done(null, false, { message: '登录名或登录密码不正确' });
    }
  }
));

passport.serializeUser(function (user, done) {
  console.log('将登陆用户序列化！');
  done(null, user.username);//可以通过数据库方式操作
});

passport.deserializeUser(function (username, done) {
  console.log('将登陆用户反序列化！');
  done(null, username);//可以通过数据库方式操作
});

app.post('/login', function(req, res, next){
  passport.authenticate('local', function(err, user, info){
    if(err){
      return res.send({
        'status': 'error',
        'message': '操作超时,请刷新后再试!'
      });
    }
    if(!user){
      return res.send({
        'status': 'error',
        'message': info.message
      });
    }
    req.logIn(user, {}, function(err) {
      if (err) { return next(err); }
      res.send({
        'status': 'success',
        'message': '登录成功!'
      });

      next();
    });
  })(req, res, next)
});

app.get('/logout', function (req, res, next) {
  req.logout();
  res.json({
    'status' : 'success',
    'message' : '登出成功!'
  });
})
app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});


app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'src/index.html'));
});


app.listen(3000, function(err){
	if(err){
		console.log(err);
		return;
	}
	console.log('http://loalhost:3000');
})
