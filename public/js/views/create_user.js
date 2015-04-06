App.Views.createUser = Backbone.View.extend({
	
	el: '#create-user-view',

	initialize: function() {
		console.log('create user view created');
		this.template = Handlebars.compile($('#create-user-template').html());
		this.render();
	},

	render: function() {
		this.$el.append(this.template);
	},

	events: {
		'keypress': 'enterButton',
		'click #create-user-button': 'createUser'
	},

	createUser: function() {
		var newUser = $('#name-input').val();
		var newUserModel = new App.Models.User({name:newUser});
		App.users.create(newUserModel);
		App.currentUser = App.users.findWhere({name:newUser});
		this.$el.hide();
		App.usersView.$el.hide();
		App.preferences = new App.Views.Preferences({model: App.currentUser});
	},

	enterButton: function(e) {
		if (e.keyCode === 13) {
			this.createUser();
		}
	}
});