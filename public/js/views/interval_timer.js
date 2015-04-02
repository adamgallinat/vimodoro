App.Views.IntervalTimer = Backbone.View.extend({

	el: '#timer-view',

	events: {
		'click #go-back-button': 'goBack'
	},

	initialize: function() {
		console.log('Interval Timer View launched');
		this.model    = App.currentUser;
		this.template = Handlebars.compile($('#interval-timer-template').html());
	},

	render: function() {
		console.log('rendered');
		var renderedTemplate = this.template( this.model.toJSON() );
		this.$el.html( renderedTemplate );
		this.$el.show();
		this.startTimer();
	},

	startTimer: function() {
		this.timer = setInterval( function() { 			
			var seconds = parseInt( $('#timer-seconds').html() );
			var minutes = parseInt( $('#timer-minutes').html() );
			if (seconds === 0) {
				if (minutes === 0) {
					clearInterval(this.timer);
					this.launchVideo();
				} else {
					seconds = 59;
					minutes -= 1;
					$('#timer-minutes').html(minutes);
					$('#timer-seconds').html(seconds);
				}
			} else {
				seconds -= 1;
				$('#timer-seconds').html(seconds);
			};
		}.bind(this), 1000);
	},

	launchVideo: function() {
		alert("video launched");
		// ---------------------->
		clearInterval(this.timer);
		App.videoModal.$el.show();
	},

	goBack: function() {
		clearInterval(this.timer);
		this.$el.hide();
		App.preferences.$el.show();
	}

});