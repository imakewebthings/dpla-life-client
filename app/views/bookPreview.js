define([
  'underscore',
  'mediator',
  'models/book',
  'views/base',
  'views/appNotify',
  'text!templates/bookPreview.html'
], function(_, mediator, BookModel, BaseView, appNotify, BookPreviewTemplate) {

  var BookPreviewView = BaseView.extend({
    el: '.app-preview',
    template: _.template(BookPreviewTemplate),

    events: {
      'click .view-book': 'navigateToBook'
    },

    navigateToBook: function(event) {
      mediator.trigger('navigate:book', this.model.get('source_id'));
      event.preventDefault();
    }
  });
  var currentPreview;

  mediator.on('preview:load', function(id) {
    var book = new BookModel({ id: id });

    book.fetch({
      success: function(model, response, options) {
        if (currentPreview) {
          currentPreview.clear();
        }
        currentPreview = new BookPreviewView({ model: model });
      },

      error: function(model, xhr, options) {
        appNotify.notify({
          type: 'error',
          message: 'Something went wrong trying to load that book.'
        });
      }
    });
  });

  return BookPreviewView;
});