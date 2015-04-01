
var models  = require('./models');
var User    = models.users;
var Keyword = models.keywords;

var seedConnections = function () { 

// -------------------------
// Adam's Connections
// -------------------------
	User
		.findOne( { 
			where: { 
				name: 'Adam Gallinat' 
			} 
		})
		.then( function (user) { 
			Keyword
				.findOne(1)
				.then(function (keyword) { 
					user.addKeyword(keyword) 
				});
		});

	User
		.findOne( { 
			where: { 
				name: 'Adam Gallinat' 
			} 
		})
		.then( function (user) { 
			Keyword
				.findOne(4)
				.then(function (keyword) { 
					user.addKeyword(keyword) 
				});
		});

// -------------------------
// Eric's Connections
// -------------------------	
	User
		.findOne( { 
			where: { 
				name: 'Eric Vince' 
			} 
		})
		.then( function (user) { 
			Keyword
				.findOne(2)
				.then(function (keyword) { 
					user.addKeyword(keyword) 
				});
		});

	User
		.findOne( { 
			where: { 
				name: 'Eric Vince' 
			} 
		})
		.then( function (user) { 
			Keyword
				.findOne(5)
				.then(function (keyword) { 
					user.addKeyword(keyword) 
				});
		});

// -------------------------
// Mark's Connections
// -------------------------
	User
		.findOne( { 
			where: { 
				name: 'Mark Smukler' 
			} 
		})
		.then( function (user) { 
			Keyword
				.findOne(3)
				.then(function (keyword) { 
					user.addKeyword(keyword) 
				});
		});	

	User
		.findOne( { 
			where: { 
				name: 'Mark Smukler' 
			} 
		})
		.then( function (user) { 
			Keyword
				.findOne(6)
				.then(function (keyword) { 
					user.addKeyword(keyword) 
				});
		});	
};

seedConnections();