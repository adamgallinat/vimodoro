
var models  = require('./models');
var User    = models.users;
var Keyword = models.keywords;

// var users = [
// 	{
// 		name: 'Adam Gallinat',
// 		interval: 44,
// 		duration: 8,
// 	},
// 	{
// 		name: 'Eric Vince',
// 		interval: 33,
// 		duration: 5,
// 	},
// 	{
// 		name: 'Mark Smukler',
// 		interval: 22,
// 		duration: 18,
// 	}
// ]

var keywords = [
	{
		term: 'Animation',
		uri: 'animation'
	},
	{
		term: 'Arts & Design',
		uri: 'art'
	},
	{
		term: 'Cameras & Techniques',
		uri: 'cameratechniques'
	},
	{
		term: 'Comedy',
		uri: 'comedy'
	},
	{
		term: 'Documentary',
		uri: 'documentary'
	},
	{
		term: 'Experimental',
		uri: 'experimental'
	},
	{
		term: 'Fashion',
		uri: 'fashion'
	},
	{
		term: 'Food',
		uri: 'food'
	},
	{
		term: 'Instructionals',
		uri: 'instructionals'
	},
	{
		term: 'Music',
		uri: 'music'
	},
	{
		term: 'Narrative',
		uri: 'narrative'
	},
	{
		term: 'Personal',
		uri: 'personal'
	},
	{
		term: 'Reporting & Journalism',
		uri: 'journalism'
	},
	{
		term: 'Sports',
		uri: 'sports'
	},
	{
		term: 'Talks',
		uri: 'talks'
	},
	{
		term: 'Travel',
		uri: 'travel'
	}
]

var seedDatabase = function () {
	// users.forEach( function (userData) {
	// 	User
	// 		.create({
	// 			name: 		userData.name,
	// 			interval: userData.interval,
	// 			duration: userData.duration
	// 		});
	// });
	keywords.forEach( function (keyword) {
		Keyword
			.create({
				term: keyword.term,
				uri: keyword.uri
			});
	});
};

seedDatabase();




















