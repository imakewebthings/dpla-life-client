define([
  'underscore',
  'jquery',
  'settings',
  'mediator',
  'views/base',
  'text!templates/bookSubjects.html',
  'jquery.qtip'
], function(
  _,
  $,
  settings,
  mediator,
  BaseView,
  BookSubjectsTemplate
) {

  var BookSubjectsView = BaseView.extend({
    template: _.template(BookSubjectsTemplate),

    events: {
      'click .single-subject-link': 'loadSingleSubject',
      'click .subject-union': 'loadSubjectUnion',
      'click .subject-intersection': 'loadSubjectIntersection',
      'click .neighbors.enabled': 'loadNeighbors',
      'click .subject-button': 'setActiveButton'
    },

    render: function() {
      BaseView.prototype.render.call(this);
      this.$('.qtip-me').qtip();
      if (!this._neighborsLoaded) {
        this.loadNeighborData();
      }
      else if (!this.neighborsData) {
        this.$('.neighbors').remove();
      }
    },

    loadNeighborData: function() {
      var onSuccess = _.bind(function(data) {
        this._neighborData = data;
        this._neighborsLoaded = true;
        if (data) {
          this.$('.neighbors').removeClass('disabled').addClass('enabled');  
        }
        else {
          this.$('.neighbors').remove();
        }
      }, this);

      $.ajax({
        url: settings.get('neighborsURL', this.model.get('source_id')),
        datatype: 'json',
        success: onSuccess
      });
    },

    loadNeighbors: function(event) {
      this.loadStack({
        data: this._neighborData,
        ribbon: 'User Shelves'
      });
      event.preventDefault();
    },

    loadSingleSubject: function(event) {
      var subject = $(event.target).data('subject');

      this.loadStack({
        url: settings.get('searchURL'),
        search_type: 'subject',
        query: subject,
        ribbon: subject,
        fullHeight: true
      });

      event.preventDefault();
    },

    loadSubjectUnion: function(event) {
      this.loadStack({
        url: settings.get('searchURL'),
        search_type: 'subject_union',
        query: this.model.get('source_id'),
        ribbon: 'Expanded'
      });
      event.preventDefault();
    },

    loadSubjectIntersection: function(event) {
      this.loadStack({
        url: settings.get('searchURL'),
        search_type: 'subject_intersection',
        query: this.model.get('source_id'),
        ribbon: 'Focused'
      });
      event.preventDefault();
    },

    loadStack: function(options) {
      mediator.trigger('stack:load', options);
    },

    setActiveButton: function(event) {
      this.$('.subject-button').removeClass('active');
      $(event.target).addClass('active');
    },

    loadPreview: function(event) {
      var $target = $(event.target).closest('.stack-item');
      var id = $target.data('stackviewItem')['source_id'];

      if ($target.is('.stack-pivot, .stack-current')) {
        return event.preventDefault();
      }

      mediator.trigger('preview:load', id);
      event.preventDefault();
    }
  });

  return BookSubjectsView;
});