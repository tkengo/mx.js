Vector = function(elements, type) {
  this.set(elements, type);
};

Vector.create = function(dim, initVal, type) {
  var elements = [];
  if (typeof dim == 'number') {
    for (var i = 0; i < dim; i++) {
      elements[i] = initVal;
    }
  } else {
    elements = dim;
    type = initVal;
  }

  return new Vector(elements, type);
};

Vector.zeros = function(dim, type) {
  return Vector.create(dim, 0, type);
};

Vector.ROW = 1;
Vector.COL = 2;

Vector.prototype = {
  clone: function() {
    return new Vector(this.flat(), this.type);
  },

  toArray: function() {
    var elements = [];
    for (var i = 0, dim = this.dim; i < dim; ++i) {
      elements[i] = this[i];
    }
    return elements;
  },

  map: function(f) {
    for (var i = 0, dim = this.dim; i < dim; ++i) {
      this[i] = f(this[i]);
    }
    return this;
  },

  set: function(elements, type) {
    this.dim    = elements.length;
    this.length = elements.length;
    this.type   = type || Vector.ROW;

    if (this.type == Vector.ROW) {
      this.rows = 1;
      this.cols = elements.length;
    } else {
      this.rows = elements.length;
      this.cols = 1;
    }

    for (var i = 0, dim = this.dim; i < dim; ++i) {
      this[i] = elements[i];
    }
  },

  remove: function(dim) {
    if (this.dim >= dim) {
      for (var i = dim, len = this.dim - 1; i < len; ++i) {
        this[i] = this[i + 1];
      }

      delete this[--this.dim];
      this.length--;

      if (this.type == Vector.ROW) {
        this.cols--;
      } else {
        this.rows--;
      }
    }

    return this;
  },

  flat: function() {
    return this.toArray();
  },

  t: function() {
    if (this.type == Vector.ROW) {
      this.rows = this.cols;
      this.cols = 1;
      this.type = Vector.COL;
    } else {
      this.cols = this.rows;
      this.rows = 1;
      this.type = Vector.ROW;
    }

    return this;
  },

  add: function(v) {
    if (typeof v == 'number') {
      for (var i = 0, dim = this.dim; i < dim; ++i) {
        this[i] += v;
      }
    } else {
      for (var i = 0, dim = this.dim; i < dim; ++i) {
        this[i] += v[i];
      }
    }
    return this;
  },

  sub: function(v) {
    if (typeof v == 'number') {
      for (var i = 0, dim = this.dim; i < dim; ++i) {
        this[i] -= v;
      }
    } else {
      for (var i = 0, dim = this.dim; i < dim; ++i) {
        this[i] -= v[i];
      }
    }
    return this;
  },

  mul: function(v) {
    if (typeof v == 'number') {
      for (var i = 0, dim = this.dim; i < dim; ++i) {
        this[i] *= v;
      }
    } else {
      for (var i = 0, dim = this.dim; i < dim; ++i) {
        this[i] *= v[i];
      }
    }
    return this;
  },

  div: function(v) {
    if (typeof v == 'number') {
      for (var i = 0, dim = this.dim; i < dim; ++i) {
        this[i] /= v;
      }
    } else {
      for (var i = 0, dim = this.dim; i < dim; ++i) {
        this[i] /= v[i];
      }
    }
    return this;
  },

  pow: function(p) {
    if (p == 1) {
      return this;
    }

    var _pow = Mx.Utils.getPow(p);
    for (var i = 0, dim = this.dim; i < dim; ++i) {
      this[i] = _pow(this[i]);
    }
    return this;
  },

  dot: function(v) {
    var dot = 0;
    for (var i = 0, len = this.dim; i < len; ++i) {
      dot += this[i] * v[i];
    }
    return dot;
  },

  sort: function(order) {
    var f = (order || 'asc') == 'asc' ?
            function(a, b) { return a - b; } :
            function(a, b) { return b - a; };
    [].sort.call(this, f);
  },

  sortWithIndex: function(order) {
    var elements = this.flat();
    var indices = Mx.Utils.sequence(0, elements.length - 1);
    var f = (order == 'asc') == 'asc' ?
            function(a, b) { return elements[a] - elements[b]; } :
            function(a, b) { return elements[b] - elements[a]; };
    indices.sort(f);

    for (var i = 0, len = indices.length; i < len; ++i) {
      this[i] = elements[indices[i]];
    }

    return [ this, indices ];
  },

  minWithIndex: function() {
    var elements = this.flat();
    var min = Math.min.apply(null, elements);
    var index = elements.indexOf(min);
    return [ min, index ];
  },

  sum: function() {
    var sum = 0;
    for (var i = 0, len = this.dim; i < len; ++i) {
      sum += this[i];
    }
    return sum;
  }
};

asMath.call(Vector.prototype);
