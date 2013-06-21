define([
  'views/dplaDetail'
], function(DplaDetailView) {

  describe('DPLA Detail View', function() {
    var view;

    beforeEach(function() {
      setFixtures('<div class="target" />');
      view = new DplaDetailView({
        el: '.target'
      });
    });

    it('renders the dpla-detail template', function() {
      expect(view.$('.dpla-detail')).toExist();
    });
  });
});