define([
  'underscore',
  'settings',
  'mediator',
  'views/appNotify',
  'models/user',
  'views/base',
  'text!templates/addFromDpla.html'
], function(
  _,
  settings,
  mediator,
  appNotify,
  UserModel,
  BaseView,
  AddFromDplaTemplate
) {

  var AddFromDplaView = BaseView.extend({
    el: '.app-main',
    template: _.template(AddFromDplaTemplate),

    events: {
      'submit .add-from-dpla-form': 'addItemToShelf'
    },

    addItemToShelf: function(event) {
      var $shelfFormElement = this.$('.add-from-dpla-form [name="shelf_id"]');
      var shelfID = $shelfFormElement.val();
      var shelfName = $shelfFormElement.find('option:selected').text();
      var itemID = this.model.get('id');
      var itemName = this.model.get('sourceResource').title;
      var userToken = UserModel.currentUser().get('token');

      $.ajax({
        type: 'post',
        url: settings.get('shelfPushURL', shelfID),
        data: { 
          item: {
            item_id: itemID,
            item_type: 'dpla',
            source: 'dpla'
          }
        },
        headers: {
          'Authorization': 'Token token=' + userToken
        },
        success: function() {
          appNotify.notify({
            type: 'success',
            message: itemName + ' added to ' + shelfName + ' shelf.'
          });
          mediator.trigger('navigate:shelf', shelfID);
        },
        error: function() {
          appNotify.notify({
            type: 'error',
            message: 'Something went wrong trying to add ' + itemName +
                     ' to ' + shelfName + ' shelf.'
          });
        }
      });
      event.preventDefault();
    }
  });

  return AddFromDplaView;
});