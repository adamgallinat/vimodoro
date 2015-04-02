App.Views.UserPreview = Backbone.View.extend({
	
	el: '#login-view',

	initialize: function() {
		console.log('New User Preview Created');
		userTemplate = Handlebars.compile($('#user-preview-template').html());
		this.listenTo(this.collection, 'sync', this.renderUsers);
	},

	renderUsers: function() {
		this.collection.each(function(user) {
			this.$el.prepend(
				userTemplate(user.toJSON())
			)
		}.bind(this));
	},

	events: {
		'click #create-user': 'createUser',
		'click #user-name': 'setUser'
	},

	createUser: function() {
		var newUser = $('#name').val();
		var newUserModel = new App.Models.User({name:newUser});
		App.currentUser = this.collection.create(newUserModel);
		this.$el.hide();
	},

	setUser: function() {
		var user = $('#user-name').text().trim();
		App.currentUser = this.collection.where({ name: user });
		this.$el.hide();
	}
});