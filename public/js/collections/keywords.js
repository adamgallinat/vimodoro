App.Collections.Keywords = Backbone.Collection.extend({
	url: '/keywords',
	initialize: function() {
		console.log('keyword collection created');
		this.fetch();
	}
});