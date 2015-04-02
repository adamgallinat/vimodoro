App.Views.KeywordsView = Backbone.View.extend({
	el: '#keywords-box',
	initialize: function() {
		console.log('new keywords collection view created');
		this.renderAll();
	},
	renderAll: function() {
		this.collection.each(this.renderOne, this);
	},
	renderOne: function(model) {
			var keyword = new App.Views.KeywordView({model: model});
			// keyworduserlist: the list of users of a particular keyword
			var keywordUserList = keyword.model.get('users');
			// turn keyworduserlist from a list of models to a list of names
			var keywordUserNames = keywordUserList.map(function(keywordUser) {
				return keywordUser.name;
			});
			var name = App.currentUser.get('name');
			// if the name of the current user is in the list of keywordusers, preselect it
			if (keywordUserNames.indexOf(name) !== -1) {
				keyword.$el.addClass('selected');
			}
			this.$el.append(keyword.el);
	}
});