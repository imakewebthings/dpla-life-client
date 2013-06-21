define([
  'models/book',
  'mock/book',
  'views/bookSubjects'
], function(BookModel, BookMock, BookSubjectsView) {

  describe('Book Subjects View', function() {
    var book = new BookModel(BookMock());
    var subjects;

    beforeEach(function() {
      setFixtures('<div class="target" />');
      subjects = new BookSubjectsView({
        el: '.target',
        model: book
      });
    });

    it('renders the subjects template', function() {
      expect(subjects.$('.book-subjects')).toExist();
    });
  });
});