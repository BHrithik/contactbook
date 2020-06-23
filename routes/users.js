var express =require('express');
var router = express.Router();
var mongojs =require('mongojs');
var db = mongojs('passportapp',['users']);
var bcrypt = require('bcryptjs');
var passport = require('passport');
var LocalStratergy = require('passport-local').Stratergy;


//LOGIN PAGE GET REQUEST
router.get('/login',function(req,res){
	res.render('login');
});

//REGISTER PAGE GET
router.get('/register',function(req,res){
	res.render('register');
});

router.get('/about',function(req,res){
	res.render('about');
});

router.post('/register',function(req,res){
	var name = req.body.name;
	var username = req.body.username;
	var email = req.body.email;
	var password = req.body.password;
	var password2 = req.body.password2;

	req.checkBody('name','Name field is required').notEmpty();
	req.checkBody('email','Email field is required').notEmpty();
	req.checkBody('email','Please enter a valid email').isEmail();
	req.checkBody('username','Username field is required').notEmpty();
	req.checkBody('password','Password field is required').notEmpty();
	req.checkBody('password2','Passwords do not match').equals(req.body.password);
	//chechking for errors
	var errors = req.validationErrors();

	if (errors) {
		console.log('form has errors...');
		res.render('register',{
			errors: errors,
			name: name,
			email: email,
			username: username,
			password: password,
			password2: password2,
		});
	} else {
				var newUser ={
					name: name,
					username :username,
					email: email,
					password: password
				}

				bcryptj.genSalt(10,function(err,salt){
					bcrypt.hash(newUser.password,salt,function(err,hash){
						newUser.password =hash;
					db.users.insert(newUser,function(err, doc){
						if(err){
							res.send(err);
						}
						else{
							console.log('User Added....');
							req.flash('success','you are now registered and can now log in ');

							res.location('/');
							res.redirect('/');
					}
				});
			});
		});
		
	}

});

passport.serializeUser(function(user,done){
	done(null,user._id)
});

passport.deserializeUser(function(user,done){
	db.users.findOne({_id:mongojs.ObjectId(id)},function(err,user){
		done(err,user);
	});
});



passport.use(new LocalStratergy(
	function(username,password,one){
		db.users.findOne({username:username},function(err,user){
			if(err){
				return done(err);
			}
			if(!user)
			{
				return done(null,false,{message:'Incorrect username '});
			}
			bcrypt.compare(password,user.password,function(err, isMatch){
				if(err){
				return done(err);
				}
				if(isMatch){
					return done(null,user);
				} else {
					return done(null,false,{message:'Incorrect  password'});
				}
			});
		});
	}
	));

router.post('/login',
	passport.authenticate('local'{successRedirect: '/',
									failureRedirect: '/users/login',
									failureFlash: 'Invalid Username or pass word'})function(req,res){
		console.log('auth successful');
		res.redirect('/');
	});




module.exports =router;