App.Views.Users = Backbone.View.extend({
	
	el: '#login-container',

	initialize: function() {
		this.loginTemplate = Handlebars.compile($('#log-in-template').html());
		this.signUpTemplate = Handlebars.compile($('#sign-up-template').html());
		this.renderLogin();
	},

	renderLogin: function() {
		this.$el.html(this.loginTemplate());
	},

	renderSignUp: function() {
		this.$el.html(this.signUpTemplate());
	},

	events: {
		'click #log-in-button' : 'login',
		'click #sign-up-button' : 'signUp',
		'click #create-user-button' : 'renderSignUp',
		'click #login-user-button' : 'renderLogin'
	},

	login: function() {
		var name = $('#user-name').val();
		var password = $('#password').val();
		$.post('/login', {name: name, password: password})
			.done(function(user) {
				$('.header').html(App.headerTemplate({user: user.name}));
				App.currentUser = new App.Models.User({
					name: user.name,
					id: user.id,
					keywords: user.keywords,
					interval: user.interval,
					duration: user.duration
				});
				this.$el.hide();
				App.preferences = new App.Views.Preferences({model: App.currentUser});
			}.bind(this))
			.fail(function(err) {
				console.log(err.responseJSON.err);
			});
	},

	signUp: function() {
		var name = $('#user-name').val();
		var password = $('#password').val();
		$.post('/users', {name: name, password: password})
			.done(function(data) {
				console.log(data);
			});
	}
});