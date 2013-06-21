define([
  'models/book',
  'mock/book',
  'views/bookRelateds'
], function(BookModel, BookMock, BookRelatedsView) {

  describe('Book Relateds View', function() {
    var book = new BookModel(BookMock());
    var relateds;

    beforeEach(function() {
      setFixtures('<div class="target" />');
      relateds = new BookRelatedsView({
        el: '.target',
        model: book
      });
    });

    it('renders the related template', function() {
      expect(relateds.$('.book-relateds-nav')).toExist();
    });
  });
});