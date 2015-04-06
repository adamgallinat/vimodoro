App.Views.User = Backbone.View.extend({
	
	initialize: function() {
		this.template = Handlebars.compile($('#user-preview-template').html());
		this.render();
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
	},

	events: {
		'click .user-name': 'setUser',
		'click .delete-user': 'deleteUser'
	},

	setUser: function() {
		App.currentUser = this.model;
		App.usersView.$el.hide();
		App.createUserView.$el.hide();
		App.preferences = new App.Views.Preferences({model: App.currentUser});
	},

	deleteUser: function() {
		console.log('deleting user');
		this.model.destroy();
		this.remove();
	}
});