App.Collections.Keywords = Backbone.Collection.extend({
	url: '/keywords',
	comparator: 'term',
	initialize: function() {
		console.log('keyword collection created');
		this.fetch();
	}
});