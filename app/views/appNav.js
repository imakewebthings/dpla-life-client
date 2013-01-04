define([
  'underscore',
  'mediator',
  'views/base',
  'views/login',
  'views/signup',
  'text!templates/appNav-loggedOut.html',
  'text!templates/appNav-loggedIn.html'
], function(
  _,
  mediator,
  BaseView,
  LoginView,
  SignupView,
  LoggedOutTemplate,
  LoggedInTemplate
) {

  var AppNavView = BaseView.extend({
    el: '.app-nav',

    events: {
      'click .app-login': 'showLoginModal',
      'click .app-signup': 'showSignupModal',
      'click .app-logout': 'logout'
    },

    showLoginModal: function(event) {
      mediator.trigger('modal:show', LoginView);
      event.preventDefault();
    },

    showSignupModal: function(event) {
      mediator.trigger('modal:show', SignupView);
      event.preventDefault();
    },

    logout: function(event) {
      mediator.trigger('user:logout');
      event.preventDefault();
    }
  });

  var appNav;

  mediator.on('user:login', function(user) {
    if (appNav) appNav.clear();
    appNav = new AppNavView({
      template: _.template(LoggedInTemplate),
      model: user
    });
  });

  mediator.on('user:logout', function() {
    if (appNav) appNav.clear();
    appNav = new AppNavView({ template: _.template(LoggedOutTemplate) });
  });

  return AppNavView;
});