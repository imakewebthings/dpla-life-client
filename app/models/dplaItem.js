define([
  'backbone',
  'settings'
], function(Backbone, settings) {

  var DplaItemModel = Backbone.Model.extend({
    urlRoot: settings.get('dplaItemURL')
  });

  return DplaItemModel;
});