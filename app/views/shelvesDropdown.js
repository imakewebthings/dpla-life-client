define([
  'underscore',
  'mediator',
  'settings',
  'models/shelf',
  'views/base',
  'views/shelfForm',
  'text!templates/shelvesDropdown.html',
  'jquery.qtip'
], function(
  _,
  mediator,
  settings,
  ShelfModel,
  BaseView,
  ShelfFormView,
  ShelvesDropdownTemplate
) {

  var ShelvesDropdownView = BaseView.extend({
    el: '.shelves-dropdown',
    template: _.template(ShelvesDropdownTemplate),

    events: {
      'click .new-shelf': 'newShelf'
    },

    initialize: function(options) {
      this.helpers = {
        bookmarkletURL: function() {
          return settings.get('bookmarkletURL');
        }
      };
      BaseView.prototype.initialize.call(this, options);
      this.collection.on('change', _.bind(this.redraw, this));
    },

    render: function() {
      BaseView.prototype.render.call(this);
      this.$('.dpla-bookmarklet > a').qtip();
    },

    newShelf: function(event) {
      mediator.trigger('modal:show', ShelfFormView, {
        model: new ShelfModel(),
        collection: this.collection
      });
      event.preventDefault();
    }
  });

  return ShelvesDropdownView;
});