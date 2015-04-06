App.Views.VideoModal = Backbone.View.extend({

	el: '#video-modal-view',

	initialize: function() {
		this.template = Handlebars.compile( $('#video-modal-template').html() );
		this.renderView();
	},

	renderView: function() {
		this.$el.html(this.template(App.currentVideo));
		this.$el.show();
    $('iframe').ready(function() {
	    this.player = $f($('iframe')[0]);
    	this.player.addEvent('ready', function() {
    		this.player.addEvent('finish', this.goBacktoInterval.bind(this));
    	}.bind(this));
    }.bind(this));
	},

	goBacktoInterval: function() {
		this.$el.hide();
		App.video.get();
		App.timer.render();
	},

	goBacktoPreferences: function() {
		this.$el.hide();
		App.preferences.render();
	}

});