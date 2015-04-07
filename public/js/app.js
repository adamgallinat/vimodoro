var App = {
	Models: {},
	Collections: {},
	Views: {},
	Routers: {},
};

App.saveCookie = function() {
	App.keywords.each(function(keyword) {
		$.cookie(keyword.get('uri'), '1');
	});
};

$(function() {
	console.log('Loaded, bro.');
	App.keywords = new App.Collections.Keywords();
	App.users = new App.Collections.Users();
	App.usersView = new App.Views.Users({collection: App.users});
});