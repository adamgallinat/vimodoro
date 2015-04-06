App.Views.KeywordView = Backbone.View.extend({
	
	className: 'keyword',

	events: {
		'click': 'toggleSelect'
	},

	initialize: function() {
		console.log('new keyword view created');
		this.template = Handlebars.compile($('#keyword-template').html());
		this.render();
	},

	render: function() {
		html = this.template(this.model.toJSON());
		this.$el.html(html);
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
		$('#start-interval-button').prop('disabled', false);
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
		var selectedList = $('.selected');
		if (!selectedList.length) {
			$('#start-interval-button').prop('disabled', true);
		}
	}

});