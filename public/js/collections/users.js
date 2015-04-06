App.Collections.Users = Backbone.Collection.extend({
	url: '/users',
	comparator: 'name',
	initialize: function() {
		console.log('users collection created');
		this.fetch(
			{success: function() {
				App.currentUser = App.users.at(0);
				// App.preferences = new App.Views.Preferences({model: App.currentUser});
			}
		});
	}
});