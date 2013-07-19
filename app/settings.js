/*
Global settings object. Settings can either be a static property:

  foo: 'bar'
  baz: 1

Or a function:

  foo: function() { return 1; }

In either case, settings are accessed via the "get" method returned from
this module.

  settings.get('foo');

If the setting is a function that accepts arguments, those arguments can be
passed as additional arguments to .get:

  foo: function(n) { return n+1; }
  
  settings.get('foo', 4); // returns 5
*/

define(['underscore'], function(_) {
  // Environment agnostic settings
  var settings = {
    indexSearchTerm: 'Cooking, American',
    indexStackRibbon: 'Recently Most Read',

    bookmarkletURL: function() {
      return settings.webRoot + '/#shelves/dpla-add/'
    },

    bookURL: function() {
      return settings.apiRoot + '/books';
    },
    bookReadingTrackURL: function(bookID) {
      return [settings.bookURL(), bookID, 'readings'].join('/');
    },
    bookReviewsURL: function(bookID) {
      return [settings.bookURL(), bookID, 'reviews'].join('/');
    },
    dplaItemURL: function() {
      return settings.apiRoot + '/dpla-items';
    },
    dplaSearchURL: function(params) {
      return settings.apiRoot + '/dpla-items?' + $.param(params);
    },
    indexStackURL: function() {
      return settings.apiRoot + '/books/recent-most-read';
    },
    neighborsURL: function(bookID) {
      return [settings.bookURL(), bookID, 'neighbors'].join('/');
    },
    reviewURL: function() {
      return settings.apiRoot + '/reviews';
    },
    shelfURL: function() {
      return settings.apiRoot + '/shelves'
    },
    shelfPushURL: function(shelfID) {
      return [settings.shelfURL(), shelfID, 'items'].join('/');
    },
    shelfRemoveURL: function(shelfID, bookID) {
      return [settings.shelfURL(), shelfID, 'items', bookID].join('/');
    },
    searchURL: function() {
      return settings.apiRoot + '/search';
    },
    sessionURL: function() {
      return settings.apiRoot + '/session';
    },
    userShelvesURL: function(userID) {
      return [settings.userURL(), userID, 'shelves'].join('/');
    },
    userURL: function() {
      return settings.apiRoot + '/users';
    }
  };

  // Dev settings
  if (window.location.host.indexOf('localhost') !== -1) {
    _.extend(settings, {
      apiRoot: 'http://localhost:3000',
      webRoot: 'http://localhost:8000',
      secure: false
    });
  }
  // GH staging settings
  else if (window.location.host.indexOf('imakewebthings.com') !== -1) {
    _.extend(settings, {
      apiRoot: 'http://dpla-life-service-dev.herokuapp.com',
      webRoot: 'http://imakewebthings.com/dpla-life-client',
      secure: false
    });
  }
  else if (window.location.host.indexOf('law.harvard.edu')) {
    _.extend(settings, {
      apiRoot: '',
      webRoot: 'https://stacklife-dpla.law.hardard.edu',
      secure: true
    });
  }

  return {
    get: function(key) {
      var setting = settings[key];
      if (_.isFunction(setting)) {
        return setting.apply(null, Array.prototype.slice.call(arguments, 1));
      }
      return setting;
    }
  }
});