App.Models.User = Backbone.Model.extend({
	initialize: function() {
		console.log('user model created');
	},
	defaults: {
		interval: 60,
		duration: 5,
		keywords: []
	}
});