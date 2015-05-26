var application_root = __dirname,
    express          = require('express'),
    bodyParser       = require('body-parser'),
    path             = require('path'),
    logger           = require('morgan'),
    models           = require('./models'),
    bcrypt 					 = require('bcrypt'),
    session					 = require('express-session'),
    Vimeo			 			 = require('vimeo-api').Vimeo;

var app = express();
require('dotenv').load();

// Vimeo suggested syntax for instantiating module
var lib = new Vimeo(process.env.VIMEO_CLIENT_ID, process.env.VIMEO_CLIENT_SECRET, process.env.VIMEO_TOKEN);

var User = models.users;
var Keyword = models.keywords;

// Server Configuration
app.use(logger('dev'));
app.use( bodyParser() );
app.use( session({
	secret: 'fdshakghdsagd'
}) );
app.use( express.static( path.join( application_root, 'public' )))
app.use( express.static( path.join( application_root, 'browser' )))

// Routes

// Export app as module
module.exports = app;

// USER ROUTES
// Request 50 videos with query req.params.category
app.get('/categories/:category/videos', function(req, res) {
	lib.request({
		method: 'GET',
		path: '/categories/' + req.params.category + '/videos', //vimeo.api/categories/{category}/videos
		query: {
			page: req.query.page,
			per_page: 50,
			sort: 'date',
			direction: 'desc'
		}
	}, function(error, body) {
		if (error) {
			console.log('error');
			console.log(error);
		} else {
			console.log('body');
			res.send(body.data);
		}
	});
});

app.get('/current_user', function(req, res) {
	res.send(req.session);
});

app.post('/login', function(req, res) {
	console.log(req.body);
	User.findOne({where: {name: req.body.name}, include: [Keyword]})
		.then(function(user) {
			if (user) {
				bcrypt.compare(req.body.password, user.password, function(err, result) {
					if (result) {
						req.session.current_user = user.id;
						res.send(user);
					}
				});
			}
			else {
				res.status(401).send({msg: 'That username / password does not exist!'});
			}
		});
});

app.delete('/login', function(req, res) {
	delete req.session.current_user;
	res.send('logged out');
});

app.get('/users', function(req, res) {
	User.findAll({include: Keyword})
		.then(function(users) {
			res.send(users);
		});
});

app.get('/users/:id', function(req, res) {
	User.findOne({where:
		{id: req.params.id},
		include: [Keyword]
	})
		.then(function(user) {
			res.send(user);
		}); 
});

app.post('/users', function(req, res) {
	bcrypt.hash(req.body.password, 10, function(err, hash) {
		User.create({
			name: req.body.name,
			password: hash,
			interval: 20,
			duration: 3
		})
			.then(function(user) {
				res.send(user);
			}, function(error) {
				res.status(401).send(error);
			});
	});
});

app.put('/users/:id', function(req, res) {
	User.findOne(req.params.id)
		.then(function(user) {
			user.update(req.body)
				.then(function(updatedUser) {
					res.send(updatedUser);
				});
		});
});

app.delete('/users/:id', function(req, res) {
	User.findOne(req.params.id)
		.then(function(user) {
			user.destroy()
				.then(function() {
					res.send(user);
				});
		});
});

// in AJAX call - data: {keyword_id: X}
app.put('/users/:id/add_keyword', function(req, res) {
	User.findOne(req.params.id)
		.then(function(user) {
			Keyword.findOne(req.body.keyword_id)
				.then(function(keyword) {
					user.addKeyword(keyword);
					res.send('success');
				});
		});
});

app.put('/users/:id/remove_keyword', function(req, res) {
	User.findOne(req.params.id)
		.then(function(user) {
			Keyword.findOne(req.body.keyword_id)
				.then(function(keyword) {
					user.removeKeyword(keyword);
					res.send('success');
				});
		});
});


// KEYWORD ROUTES --> NOT CURRENTLY IN USE
app.get('/keywords', function(req, res) {
	Keyword.findAll({include: User})
		.then(function(keywords) {
			res.send(keywords);
		});
});

app.get('/keywords/:id', function(req, res) {
	Keyword.findOne({where: 
		{id: req.params.id},
		include: [User]
	})
		.then(function(keyword) {
			res.send(keyword);
		});
});

app.post('/keywords', function(req, res) {
	Keyword.create(req.body)
		.then(function(keyword) {
			res.send(keyword);
		});
});

app.put('/keywords/:id', function(req, res) {
	Keyword.findOne(req.params.id)
		.then(function(keyword) {
			keyword.update(req.body)
				.then(function(updatedKeyword) {
					res.send(updatedKeyword);
				});
		});
});

app.delete('/keywords/:id', function(req, res) {
	Keyword.findOne(req.params.id)
		.then(function(keyword) {
			keyword.destroy()
				.then(function() {
					res.send(keyword);
				});
		});
});

app.listen(3000, function() {
	console.log('listening on 3000');
});