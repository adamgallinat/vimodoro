var App = {
	Models: {},
	Collections: {},
	Views: {},
	Routers: {},
};

App.saveCookie = function() {
	App.keywords.each(function(keyword) {
		$.cookie(keyword.get('term'), '1');
	});
};

$(function() {
	console.log('Loaded, bro.');
	App.timer = new App.Views.IntervalTimer();
	App.router = new App.Routers.Router();
	Backbone.history.start();
});