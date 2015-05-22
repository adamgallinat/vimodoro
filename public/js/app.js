var App = {
	Models: {},
	Collections: {},
	Views: {}
};

$(function() {
	App.headerTemplate = Handlebars.compile($('#header').html());
	$('.header').html(App.headerTemplate());
	$(document).on('click', '#logout-link', App.logout);
	$.get('/current_user')
		.done(function(data) {
			if (!data.current_user) {
				App.usersView = new App.Views.Users();
			} else {
				$.get('/users/' + data.current_user)
					.done(function(user) {
						$('#login-container').hide();
						$('.header').html(App.headerTemplate({user: user.name}));
						App.currentUser = new App.Models.User(user);
						App.preferencesView = new App.Views.Preferences();
					});
			}
		});
	App.keywords = new App.Collections.Keywords();
});

App.saveCookie = function() {
	App.keywords.each(function(keyword) {
		$.cookie(keyword.get('uri'), '1');
	});
};

App.logout = function() {
	$.ajax({
		url: '/login',
		method: 'DELETE'
	})
		.done(function(data) {
			if (App.timer) {
				clearInterval();
			}
			$('#welcome-user').empty();
			$('#login-container').removeClass('animated fadeInUpBig').empty().show();
			$('#preferences-view').empty();
			$('#timer-view').empty();
			$('#video-modal-view').empty();
			App.usersView = new App.Views.Users();
		});
}