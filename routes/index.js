
var express = require('express');
var db = require('../models/db');
var router = express.Router();

function authentication(req, res, next) {
	if (!req.session.admin) {
		return res.redirect('/login');
	}
  res.locals.admin = req.session.admin;
	res.locals.users = db.users;
	next();
}
function noauthentication(req, res, next) {
	if (req.session.admin) {
		return res.redirect('/index');
	}
	next();
}
var findAll = function(){
	db.connect(function(){
		db.findAll(function(){
			db.disconnect();
		})
	});
}

router.get('/', function(req, res) {
  res.redirect('/login');
});
router.get('/login', noauthentication, function(req, res) {
  res.render('login', { title: 'Login', err: db.errMsg });
});
router.get('/signup', noauthentication, function(req, res) {
  res.render('signup', { title: 'Sign up', err: db.errMsg });
});
router.get('/index', authentication, function(req, res){
	findAll();
	res.render('index', { title: 'Home' });
});
router.get('/chat', authentication, function(req, res){
	res.render('chat', { title: 'chat' });
});
router.get('/logout', function(req, res){
	db.errMsg = '';
  req.session.admin = null;
	res.redirect('/login');
});
router.get('/toLogin', noauthentication, function(req, res) {
	db.errMsg = '';
  res.redirect('/login');
});
router.get('/toSignup', noauthentication, function(req, res) {
	db.errMsg = '';
  res.redirect('/signup');
});

router.post('/loginForm', function(req, res) {
	var admin = {
		username: req.body.username,
		password: req.body.password
	}
	db.connect(function(){
		db.search(admin, function(){
			db.disconnect();
			if(db.errMsg === ''){
				req.session.admin = admin;
        res.redirect('/index');
      }else{
				res.redirect('/login');
      }
		});
	});
});
router.post('/signupForm', function(req, res) {
	var admin = {
		username: req.body.username,
		password: req.body.password
	}
	db.connect(function(){
		db.add(admin, function(){
      db.disconnect();
      if(db.errMsg === ''){
				req.session.admin = admin;
        res.redirect('/index');
      }else{
				res.redirect('/signup');
      }
		});
	});
});

module.exports = router;
