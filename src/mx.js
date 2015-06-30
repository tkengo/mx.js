var Mx = {};
Mx.Math  = {};

var asMath = (function() {
  function abs(m)   { return (m || this).map(function(v) { return Math.abs(v);   }); };
  function acos(m)  { return (m || this).map(function(v) { return Math.acos(v);  }); };
  function asin(m)  { return (m || this).map(function(v) { return Math.asin(v);  }); };
  function atan(m)  { return (m || this).map(function(v) { return Math.atan(v);  }); };
  function atan2(m) { return (m || this).map(function(v) { return Math.atan2(v); }); };
  function ceil(m)  { return (m || this).map(function(v) { return Math.ceil(v);  }); };
  function cos(m)   { return (m || this).map(function(v) { return Math.cos(v);   }); };
  function exp(m)   { return (m || this).map(function(v) { return Math.exp(v);   }); };
  function floor(m) { return (m || this).map(function(v) { return Math.floor(v); }); };
  function log(m)   { return (m || this).map(function(v) { return Math.log(v);   }); };
  function round(m) { return (m || this).map(function(v) { return Math.round(v); }); };
  function sin(m)   { return (m || this).map(function(v) { return Math.sin(v);   }); };
  function sqrt(m)  { return (m || this).map(function(v) { return Math.sqrt(v);  }); };
  function tan(m)   { return (m || this).map(function(v) { return Math.tan(v);   }); };

  return function() {
    this.abs   = abs;
    this.acos  = acos;
    this.asin  = asin;
    this.atan  = atan;
    this.atan2 = atan2;
    this.ceil  = ceil;
    this.cos   = cos;
    this.exp   = exp;
    this.floor = floor;
    this.log   = log;
    this.round = round;
    this.sin   = sin;
    this.sqrt  = sqrt;
    this.tan   = tan;
  };
})();
asMath.call(Mx);

Mx.Utils = {
  getPow: function(p) {
    if (p == 0) {
      return function(x) { return 1; };
    } else if (p == 2) {
      return function(x) { return x * x; };
    } else {
      return function(x) { return Math.pow(x, p); };
    }
  },

  generateFlatArray: function(dim, initVal) {
    var array = new Array(dim);
    for (var i = dim - 1; i >= 0; --i) {
      array[i] = initVal;
    }
    return array;
  },

  sequence: function(from, to) {
    var size = to - from + 1;
    var sequence = new Array(size);
    for (var i = 0; i < size; ++i) {
      sequence[i] = i;
    }
    return sequence;
  },

  randn: function () {
    var x1 = Math.random();
    var x2 = Math.random();
    return Math.sqrt(-2 * Math.log(x1)) * Math.cos(2 * Math.PI * x2);
  }
};
