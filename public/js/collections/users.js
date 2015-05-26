App.Collections.Users = Backbone.Collection.extend({
	url: '/users',
	comparator: 'name',
	initialize: function() {
		this.fetch();
	}
});