define([
  'underscore',
  'backbone',
  'mediator',
  'views/base',
  'text!templates/dplaPreview.html'
], function(
  _,
  Backbone,
  mediator,
  BaseView,
  DplaPreviewTemplate
) {

  var DplaPreviewView = BaseView.extend({
    el: '.app-preview',
    template: _.template(DplaPreviewTemplate)
  });
  var currentPreview;

  mediator.on('dpla:load', function(obj) {
    if (currentPreview) {
      currentPreview.clear();
    }
    currentPreview = new DplaPreviewView({
      model: new Backbone.Model(obj)
    });
  });

  mediator.on('preview:redraw', function() {
    if (currentPreview) {
      currentPreview.redraw();
    }
  });

  mediator.on('dpla:unload', function() {
    if (currentPreview) {
      currentPreview.clear();
    }
  });

  return DplaPreviewView;
});