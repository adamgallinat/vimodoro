var application_root = __dirname,
    express          = require('express'),
    bodyParser       = require('body-parser'),
    path             = require('path'),
    logger           = require('morgan'),
    models           = require('./models'),
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
app.use( express.static( path.join( application_root, 'public' )))
app.use( express.static( path.join( application_root, 'browser' )))

// Routes

// Export app as module
module.exports = app;

// USER ROUTES
// Request 50 videos with query 'search_term'
app.get('/categories/:category/videos', function(req, res) {
	lib.request({
		method: 'GET',
		path: '/categories/' + req.params.category + '/videos', //vimeo.api/videos
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

app.get('/users', function(req, res) {
	User.findAll({include: Keyword})
		.then(function(users) {
			res.send(users);
		});
});

app.get('/users/:id', function(req, res) {
	User.findOne({where:
		{id: req.params.id}, include: [Keyword]})
		.then(function(user) {
			res.send(user);
		}); 
});

app.post('/users', function(req, res) {
	User.create(req.body)
		.then(function(user) {
			res.send(user);
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


// KEYWORD ROUTES
app.get('/keywords', function(req, res) {
	Keyword.findAll({include: User})
		.then(function(keywords) {
			res.send(keywords);
		});
});

app.get('/keywords/:id', function(req, res) {
	Keyword.findOne({where: {id: req.params.id}, include:[User]})
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