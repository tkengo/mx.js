(function() {
  var ms = [];

  Matrix.prototype.valueOf = function() {
    ms.push(this);
    return 1 + ms.length;
  };
  Vector.prototype.valueOf = function() {
    ms.push(this);
    return 1 + ms.length;
  };

  var g = Function('return this')();
  g.S = function(a) {
    ms.push(a);
    return 1 + ms.length;
  };
  Object.defineProperty(g, 'M', {
    enumerable: false,
    get: function() {
      return function(v) {
        var m1 = ms.shift();
        var m2 = ms.shift();

        if (typeof m1 == 'number') {
          var tmp = m1;
          m1 = m2.clone();
          m2 = tmp;
        } else {
          m1 = m1.clone();
        }

        switch (v) {
          case 5:
            return m1.add(m2);
          case -1:
            // ToDo: sub
            return m1;
          case 6:
            return m1.mul(m2);
          case 1:
            return m1.pow(m2);
          default:
            return m1.div(m2);
        }
      }
    }
  });
})();
