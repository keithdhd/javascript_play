

exports.helpers = {
  isequal: function(v1, v2, options) {
      if (v1 == v2) {
        return options.fn(this);
      }
      return options.inverse(this);
    },

  contains: function(haystack, needle, options) {
      if (haystack.match(needle) !== null) {
        return options.fn(this);
      }
      return options.inverse(this);
    },

  defaultVal: function(value, safeValue) {
      var out = value || safeValue;
      return out;
    },
};

