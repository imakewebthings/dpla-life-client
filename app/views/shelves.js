define([
  'underscore',
  'jquery',
  'mediator',
  'models/user',
  'views/base',
  'views/appNotify',
  'views/appConfirm',
  'text!templates/shelves.html',
  'jquery.serialize-object'
], function(
  _,
  $,
  mediator,
  UserModel,
  BaseView,
  appNotify,
  appConfirm,
  ShelvesTemplate
) {

  var ShelvesView = BaseView.extend({
    el: '.app-main',
    template: _.template(ShelvesTemplate),
    privateToUser: true,

    events: {
      'submit .new-shelf-form': 'createShelf',
      'click .edit-shelf': 'editShelf',
      'submit .update-shelf-form': 'updateShelf',
      'click .delete-shelf': 'deleteShelf',
      'click .view-shelf': 'viewShelf'
    },

    initialize: function(options) {
      this.helpers = {
        shelfDescription: function(shelf) {
          if (shelf.get('description')) {
            return shelf.get('description');
          }
          return 'This shelf does not have a description.'
        }
      };
      BaseView.prototype.initialize.call(this, options);
      options.collection.on('remove change', _.bind(this.redraw, this));
      options.collection.on('remove change', function() {
        mediator.trigger('user:sync');
      });
    },

    render: function() {
      BaseView.prototype.render.call(this);
      this.$('.new-shelf-form label').inFieldLabels();
    },

    createShelf: function(event) {
      var shelfObject = this.$('.new-shelf-form').serializeObject().shelf;
      var userToken = UserModel.currentUser().get('token');

      event.preventDefault();
      event.stopPropagation();
      if (!shelfObject.name) return;

      this.options.collection.create(shelfObject, {
        url: this.options.collection.url(),
        headers: {
          'Authorization': 'Token token=' + userToken
        },
        error: function(model, xhr, options) {
          appNotify.notify({
            type: 'error',
            message: 'Something went wrong creating that shelf.'
          });
        }
      });
    },

    editShelf: function(event) {
      $('.shelf-overview.editing').removeClass('editing');
      $(event.target).closest('.shelf-overview').addClass('editing')
        .find('input:not([type=hidden])').first().focus();
      event.preventDefault();
    },

    updateShelf: function(event) {
      var $shelfForm = $(event.target).closest('.update-shelf-form');
      var shelfObject = $shelfForm.serializeObject().shelf;
      var shelfID = $shelfForm.closest('.shelf-overview').data('shelfid');
      var userToken = UserModel.currentUser().get('token');

      this.options.collection.get(shelfID).save(shelfObject, {
        headers: {
          'Authorization': 'Token token=' + userToken
        },
        error: function(model, xhr, options) {
          console.log(arguments);
        }
      });
      event.preventDefault();
    },

    deleteShelf: function(event) {
      var userToken = UserModel.currentUser().get('token');
      var shelfID = $(event.target).closest('.shelf-overview').data('shelfid');
      var shelf = this.options.collection.get(shelfID);
      var shelfName = shelf.get('name');

      appConfirm({
        message: 'Are you sure you want to delete this shelf?',
        confirmText: 'Yes, Delete Shelf',
        onConfirm: function() {
          shelf.destroy({
            headers: {
              'Authorization': 'Token token=' + userToken
            },
            success: function() {
              appNotify.notify({
                type: 'notice',
                message: shelfName + ' shelf has been deleted.'
              });
            },
            error: function(model, xhr, options) {
              appNotify.notify({
                type: 'error',
                message: 'There was a problem deleting this shelf.'
              });
            }
          });
        }
      });
      event.preventDefault();
    },

    viewShelf: function(event) {
      var shelfID = $(event.target).closest('.shelf-overview').data('shelfid');

      mediator.trigger('navigate:shelf', shelfID);
      event.preventDefault();
    }
  });

  return ShelvesView;
});