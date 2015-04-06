App.Views.IntervalTimer = Backbone.View.extend({

	el: '#timer-view',

	events: {
		'click #go-back-button': 'goBack'
	},

	initialize: function() {
		console.log('Interval Timer View launched');
		this.template = Handlebars.compile($('#interval-timer-template').html());
	},

	render: function() {
		console.log('rendered');
		var renderedTemplate = this.template( App.currentUser.toJSON() );
		this.$el.html( renderedTemplate );
		this.$el.show();
		this.startTimer();
	},

	startTimer: function() {
		this.timer = setInterval( function() { 	

			var minutes = parseInt($('#timer-minutes').html());
			var seconds = parseInt($('#timer-seconds').html());
		
			if (seconds === 0) {
				if (minutes === 0) {
					clearInterval(this.timer);
					this.launchVideo();
				} else {
					seconds = 59;
					minutes -= 1;
					$('#timer-minutes').html(minutes = minutes < 10 ? "0" + minutes : minutes);
					$('#timer-seconds').html(seconds = seconds < 10 ? "0" + seconds : seconds);
				}
			} else {
				seconds -= 1;
				$('#timer-seconds').html(seconds = seconds < 10 ? "0" + seconds : seconds);
			};
		}.bind(this), 1000);
	},

	launchVideo: function() {
		clearInterval(this.timer);
		this.$el.hide();
		App.modal = new App.Views.VideoModal();
	},

	goBack: function() {
		clearInterval(this.timer);
		this.$el.hide();
		App.preferences.$el.show();
	}

});