App.Views.KeywordsView = Backbone.View.extend({

	el: '#keywords-box',

	initialize: function() {
		this.renderAll();
	},

	renderAll: function() {
		this.collection.each(this.renderOne, this);
		if (!$('.selected').length) {
			$('#start-interval-button').addClass('disabled')
																 .prop('disabled', true);
		} else {
			$('#start-interval-button').addClass('enabled')
																 .prop('disabled', false);
		}
	},

	renderOne: function(model) {
		var keywordView = new App.Views.KeywordView({model: model});
		var currentUserKeywords = App.currentUser.get('keywords').map(function(keyword) {
			return keyword.id;
		});
		if (currentUserKeywords.indexOf(model.get('id')) !== -1) {
			keywordView.$el.addClass('selected');
		}
		this.$el.append(keywordView.el);
	}

});