var functionsToAttribute = function (query) {
  // With the templating implementation attributes are function.
  // Therefore, we must call them and return the string.
  if (query) {
    var q = {};
    _.each(query, function (attr, key) {
      if (_.isFunction(attr)) {
        q[key] = attr();
      } else {
        q[key] = attr;
      }
    });
    query = q;
  }
  return query;
};

if (Handlebars) {
  Handlebars.registerHelper('pathFor', function (routeName, query, options) {
    var obj = this;
    // XXX added hash
    query = functionsToAttribute(query); 
    return Router.path(routeName, obj, {
      query: query,
      // hash: hash
    });
  });

  Handlebars.registerHelper('urlFor', function (routeName, query, options) {
    var obj = this;
    // XXX added hash
    query = functionsToAttribute(query); 
    return Router.url(routeName, obj, {
      query: query,
      // hash: hash
    });
  });

  Handlebars.registerHelper('renderRouter', function (options) {
    return Router.render();
  });

  Handlebars.registerHelper('currentRouteController', function () {
    return Router.current();
  });

  Handlebars.registerHelper('link', function (options) {
    var hash = options.hash || {};
    var route = hash.route;
    var params = hash.params || this;
    var query = hash.query;
    var urlHash = hash.hash;
    var cls = hash.class || '';

    var path = Router.path(route, params, {
      query: query,
      hash: urlHash
    });

    var html = '<a href="' + path + '" class="' + cls + '">';
    html += options.fn(this);
    html += '</a>'

    return new Handlebars.SafeString(html);
  });
}
