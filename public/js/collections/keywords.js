App.Collections.Keywords = Backbone.Collection.extend({
	url: '/keywords',
	comparator: 'term',
	initialize: function() {
		this.fetch(
			{ success: function() {
				App.saveCookie();
			}
		});
	}
});