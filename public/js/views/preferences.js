App.Views.Preferences = Backbone.View.extend({

	el: '#preferences-view',
	
	initialize: function() {
		console.log('new preferences view created');
		this.template = Handlebars.compile($('#preferences-template').html());
		this.render();
	},

	render: function() {
		var html = this.template(App.currentUser.toJSON());
		$('#preferences-view').html('');
		$('#preferences-view').append(html);
		App.keywordsView = new App.Views.KeywordsView({collection: App.keywords});
		this.$el.show();
	},

	events: {
		'click #start-interval-button': 'startInterval'
	},

	startInterval: function() {
		App.currentUser.save({
			'interval': parseInt($('#interval-input').val()),
			'duration': parseInt($('#duration-input').val())
		});
		App.video.get();
		this.$el.hide();
		App.timer.render();
	}

});