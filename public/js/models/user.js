App.Models.User = Backbone.Model.extend({
	urlRoot: '/users',
	defaults: {
		interval: 60,
		duration: 5,
		keywords: []
	}
});