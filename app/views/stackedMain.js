define([
  'underscore',
  'settings',
  'mediator',
  'views/base',
  'views/stack',
  'views/bookPreview',
  'views/dplaPreview',
  'text!templates/stackedMain.html',
  
], function(
  _,
  settings,
  mediator,
  BaseView,
  StackView,
  BookPreviewView,
  DplaPreviewView,
  StackedMainTemplate
) {

  var StackedMainView = BaseView.extend({
    el: '.app-main',
    template: _.template(StackedMainTemplate),

    events: {
      'click .stack-item-link': 'pivot',
      'click .stack-book .stack-item-link': 'loadPreview',
      'click .stack-dpla .stack-item-link': 'loadDplaItem'
    },

    pivot: function(event) {
      var $target = $(event.target).closest('.stack-item');
      if ($target.hasClass('stack-pivot')) {
        return false;
      }
      this.$('.stack-pivot').removeClass('stack-pivot');
      $target.addClass('stack-pivot');
      event.preventDefault();
    },
    
    loadPreview: function(event) {
      var $target = $(event.target).closest('.stack-item');
      var id = $target.data('stackviewItem')['source_id'];
      mediator.trigger('dpla:unload');
      mediator.trigger('navigate:book', id);
      
    },

    loadDplaItem: function(event) {
      var $target = $(event.target).closest('.stack-item');
      var item = $target.data('stackviewItem');
      mediator.trigger('preview:unload');
      mediator.trigger('dpla:load', item);
    }
  });

  return StackedMainView;
});