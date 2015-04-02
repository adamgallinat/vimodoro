App.Views.KeywordView = Backbone.View.extend({
	initialize: function() {
		console.log('new keyword view created');
		this.template = Handlebars.compile($('#keyword-template').html());
		this.render();
	},

	render: function() {
		html = this.template(this.model.toJSON());
		this.$el.html(html);
	},

	events: {
		'click': 'toggleSelect'
	},

	toggleSelect: function() {
		if (this.$el.hasClass('selected')) {
			this.unselect();
		} else {
			this.select();
		}
	},

	select: function() {
		var keywordID = this.model.get('id');
		var userID = App.currentUser.get('id');
		$.ajax({
			url: '/users/' + userID + '/add_keyword',
			method: 'PUT',
			data: {
				keyword_id: keywordID
			}
		})
		.done(this.addSelectedClass.bind(this));
	},

	addSelectedClass: function() {
		App.currentUser.fetch();
		this.$el.addClass('selected');
	},

	unselect: function() {
		var keywordID = this.model.get('id');
		var userID = App.currentUser.get('id');
		$.ajax({
			url: '/users/' + userID + '/remove_keyword',
			method: 'PUT',
			data: {
				keyword_id: keywordID
			}
		})
		.done(this.removeSelectedClass.bind(this));
	},

	removeSelectedClass: function() {
		App.currentUser.fetch();
		this.$el.removeClass('selected');
	}

});