App.Views.VideoModal = Backbone.View.extend({

	el: '#video-modal-view',

	initialize: function() {
		this.template = Handlebars.compile( $('#video-modal-template').html() );
		this.renderView();
	},

	renderView: function() {
		this.$el.html(this.template(App.currentVideo));
		this.$el.show();
	},

	// go back to interval view
	goBacktoInterval: function() {
		this.$el.hide();
		App.timer.render();
	},

	// go back to preferences view
	goBacktoPreferences: function() {
		this.$el.hide();
		App.preferences.render();
	}

});


// template datathatgoesintothetemplate

// template({key: value, key: value})

// App.currentUser.toJSON()