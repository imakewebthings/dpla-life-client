define([
  'mediator',
  'models/book',
  'mock/book',
  'views/dplaRelated'
], function(mediator, BookModel, BookMock, DplaRelatedView) {

  describe('DPLA Related View', function() {
    var book = new BookModel(BookMock());
    var view;

    beforeEach(function() {
      setFixtures('<div class="target" />');
      view = new DplaRelatedView({
        el: '.target',
        model: book
      });
    });

    it('renders the dpla-related template', function() {
      expect(view.$('.dpla-related')).toExist();
    });
  });
});