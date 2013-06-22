define([
  'underscore',
  'jquery',
  'settings',
  'mediator',
  'collections/review',
  'views/base',
  'views/dplaRelated',
  'views/bookSubjects',
  'views/reviews',
  'text!templates/bookRelateds.html',
  'jquery.qtip'
], function(
  _,
  $,
  settings,
  mediator,
  ReviewCollection,
  BaseView,
  DplaRelatedView,
  BookSubjectsView,
  ReviewsView,
  BookRelatedsTemplate
) {

  var BookRelatedsView = BaseView.extend({
    template: _.template(BookRelatedsTemplate),

    events: {
      'click .related-dpla': 'loadDplaItems',
      'click .related-subjects': 'loadSubjects',
      'click .related-reviews': 'loadReviews',
      'click .book-relateds-nav a': 'highlightNavItem'
    },

    initialize: function(options) {
      BaseView.prototype.initialize.call(this, options);
      if (!$('.stackview').length) {
        this.loadFirstSubjectStack();
      }
      this.$tabContainer = this.$('.book-relateds-container');
      this.loadDplaItems();
    },

    render: function() {
      BaseView.prototype.render.call(this);
      this.$('.qtip-me').qtip();
    },

    loadDplaItems: function() {
      if (!this.dplaView) {
        this.dplaView = new DplaRelatedView({
          bookModel: this.model
        });
        this.subviews.push(this.dplaView);
      }
      this.$tabContainer.contents().detach();
      this.$tabContainer.append(this.dplaView.el);
    },

    loadSubjects: function() {
      if (!this.subjectsView) {
        this.subjectsView = new BookSubjectsView({
          model: this.model
        });
        this.subviews.push(this.subjectsView)
      }
      this.$tabContainer.contents().detach();
      this.$tabContainer.append(this.subjectsView.el);
    },

    loadReviews: function() {
      if (this.reviewsView) {
        this.$tabContainer.contents().detach();
        this.$tabContainer.append(this.reviewsView.el);
      }
      else {
        var reviews = new ReviewCollection();
        var self = this;

        reviews.bookID = this.model.get('source_id');
        reviews.fetch({
          success: function(collection, response, options) {
            var view = new ReviewsView({
              collection: collection
            });
            self.reviewsView = view;
            self.$tabContainer.contents().detach();
            self.$tabContainer.append(view.el);
            self.subviews.push(view);
          },
          error: function(collection, xhr, options) {
            appNotify.notify({
              type: 'error',
              message: 'Something went wrong trying to load reviews.'
            });
          }
        });
      }
    },

    highlightNavItem: function(event) {
      this.$('.book-relateds-nav a').removeClass('active');
      $(event.target).addClass('active');
      event.preventDefault();
    },

    loadFirstSubjectStack: function() {
      var subjects = this.model.get('subjects');

      if (subjects && subjects[0]) {
        mediator.trigger('stack:load', {
          url: settings.get('searchURL'),
          search_type: 'subject',
          query: subjects[0],
          ribbon: subjects[0],
          fullHeight: true
        });
      }
    }
  });

  return BookRelatedsView;
});