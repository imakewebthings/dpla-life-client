define([
  'underscore',
  'mediator',
  'views/base',
  'views/dplaDetail',
  'text!templates/dplaRelated.html'
], function(_, mediator, BaseView, DplaDetailView, DplaRelatedTemplate) {

  var DplaRelatedView = BaseView.extend({
    template: _.template(DplaRelatedTemplate),

    events: {
      'click .view-dpla-item': 'showDplaDetail'
    },

    showDplaDetail: function(event) {
      mediator.trigger('modal:show', DplaDetailView);
      event.preventDefault();
    }
  });

  return DplaRelatedView;
});