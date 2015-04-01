var application_root = __dirname,
    express          = require('express'),
    bodyParser       = require('body-parser'),
    path             = require('path'),
    logger           = require('morgan'),
    models           = require('./models'),
    Vimeo						 = require('vimeo-api').Vimeo;

var app = express();
require('dotenv').load();

var lib = new Vimeo(process.env.VIMEO_CLIENT_ID, process.env.VIMEO_CLIENT_SECRET, process.env.VIMEO_TOKEN);


// Server Configuration
app.use(logger('dev'));
app.use( bodyParser() );
app.use( express.static( path.join( application_root, 'public' )))
app.use( express.static( path.join( application_root, 'browser' )))

// Routes

// Export app as module
module.exports = app;

// Request 50 videos with query 'search_term'
app.get('/videos', function(req, res) {
	lib.request({
		method: 'GET',
		path: '/videos', //vimeo.api/videos
		query: {
			page: 1,
			per_page: 50,
			query: req.query.search_term,
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

app.listen(3000, function() {
	console.log('listening on 3000');
});