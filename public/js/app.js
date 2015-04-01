var App = {
	Models: {},
	Collections: {},
	Views: {},
	Routers: {}
};

$(function() {
	console.log('Loaded, bro.');
	App.keywords = new App.Collections.Keywords();
	App.users = new App.Collections.Users();
	App.users.fetch(
		{success: function() {
			App.currentUser = App.users.at(0);
			App.preferences = new App.Views.Preferences({model: App.currentUser});
			// App.preferences.render();
			App.keywords.fetch(
				{success: function() {
						App.keywordsView = new App.Views.KeywordsView({collection: App.keywords});
				}
			});
		}
	});
});









	// App.keywords.fetch(
	// 	{success: function() {
	// 		App.keywordsView = new App.Views.KeywordsView({collection: App.keywords});
	// 	}
	// });