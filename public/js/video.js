App.video = {
	
	pickRandomInterest: function() {
		var interests = App.currentUser.get('keywords');
		return interests[Math.floor(Math.random() * interests.length)].uri;
	},

	get: function() {
		console.log('getting videos...');
		var keyword = this.pickRandomInterest();
		$.ajax({
			url: '/categories/' + keyword + '/videos',
			method: 'GET',
			data: {
				// api: 1,
				page: parseInt($.cookie(keyword))
			}
		})
		.done(function(data, status, jqXHR) {
			this.pickOne(data, keyword);
		}.bind(this));
	},

	pickOne: function(data, keyword) {
		console.log('videos gotten');
		var videos = data.map(function(video) {
			return {
				uri: video.uri,
				duration: video.duration,
				html: video.embed.html,
				embed: video.privacy.embed
			};
		});
		var currentBestVideo = {};
		var currentBestDurationDifference = 60;

		videos.forEach(function(video) {
			var durationDifference = Math.abs(video.duration - (App.currentUser.get('duration') * 60));
			if ((durationDifference < currentBestDurationDifference) && (video.embed === 'public')) {
				currentBestVideo = video;
				currentBestDurationDifference = durationDifference;
			}
		});
		if (!currentBestVideo.html) {
			$.cookie(keyword, parseInt($.cookie(keyword))+1);
			this.get();
		} else {
			$.cookie(keyword, parseInt($.cookie(keyword))+1);
			App.currentVideo = currentBestVideo;
			this.parseHtml();
		}
	},

	parseHtml: function() {
		$.ajax({
			url: 'https://vimeo.com/api/oembed.json',
			method: 'GET',
			data: {
				url: App.currentVideo.html.split('"')[1],
				autoplay: 1,
				api: 1,
				maxwidth: 640,
				maxheight: 360
			}
		})
		.done(function(data) {
			App.currentVideo = data;
		});
	}
};