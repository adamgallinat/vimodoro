App.Views.Preferences = Backbone.View.extend({
	el: '#preferences-view',
	initialize: function() {
		console.log('new preferences view created');
		this.template = Handlebars.compile($('#preferences-template').html());
		this.render();
	},

	render: function() {
		var html = this.template(this.model.toJSON());
		$('#preferences-view').html('');
		$('#preferences-view').append(html);
	},

	events: {
		'click #start-interval': 'startInterval'
	},

	startInterval: function() {
		this.model.save({
			'interval': parseInt($('#interval-input').val()),
			'duration': parseInt($('#duration-input').val())
		});
		this.getVideos();
		this.$el.hide();
		App.timer.render();
		// App.timer.$el.show();
	},

	getVideos: function() {
		var keyword = this.pickRandomInterest();
		$.ajax({
			url: '/videos',
			method: 'GET',
			data: {
				search_term: keyword,
				api: 1
			}
		})
		.done(this.pickOneVideo.bind(this));
	},

	pickRandomInterest: function() {
		var interests = this.model.get('keywords');
		return interests[Math.floor(Math.random() * interests.length)].term;
	},

	pickOneVideo: function(data) {
		var videos = data.map(function(video) {
			return {
				uri: video.uri,
				duration: video.duration,
				html: video.embed.html
			};
		});
		var currentBestVideo = {duration: 100000};

		videos.forEach(function(video) {
			if (Math.abs(video.duration - (this.model.get('duration') * 60)) < currentBestVideo.duration) {
				currentBestVideo = video;
			}
		}.bind(this));
		App.currentVideo = currentBestVideo;
		this.parseVideoHtml();
	},

	parseVideoHtml: function() {
		App.currentVideo.html;
		$.ajax({
			url: 'https://vimeo.com/api/oembed.json',
			method: 'GET',
			data: {
				url: App.currentVideo.html.split('"')[1],
				autoplay: 1,
				api: 1
			}
		})
		.done(function(data) {
			App.currentVideo = data;
		});
	}
});