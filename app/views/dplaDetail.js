define([
  'underscore',
  'views/base',
  'text!templates/dplaDetail.html'
], function(_, BaseView, DplaDetailTemplate) {

  var DplaDetailView = BaseView.extend({
    template: _.template(DplaDetailTemplate)
  });

  return DplaDetailView;
});