Vector = function(elements, type) {
  this.set(elements, type);
};

Vector.create = function(dim, initVal, type) {
  dim     = dim     || 0;
  initVal = initVal || 0;

  var elements = [];
  if (typeof dim === 'number') {
    for (var i = dim - 1; i >= 0; --i) {
      elements[i] = initVal;
    }
  } else {
    if (typeof dim[0] === 'number') {
      elements = dim;
      type = initVal;
    } else {
      for (var i = dim.length - 1; i >= 0; --i) {
        elements[i] = dim[i][0];
      }
      type = Vector.COL;
    }
  }

  return new Vector(elements, type);
};

Vector.empty = function(type) {
  return Vector.create(0, 0, type);
};

Vector.zeros = function(dim, type) {
  return Vector.create(dim, 0, type);
};

Vector.rand = function(dim, type, f) {
  dim = dim || 0;
  var rand = f || Math.random;
  var elements = new Array(dim);
  for (var i = dim - 1; i >= 0; --i) {
    elements[i] = rand();
  }
  return Vector.create(elements, type);
};

Vector.randn = function(dim, type) {
  return Vector.rand(dim, type, Mx.Utils.randn);
};

Vector.ROW = 1;
Vector.COL = 2;

Vector.prototype = {
  /**
   * Build a string from the matrix for a human.
   */
  toString: function() {
    var s = '';
    for (var i = 0; i < this.dim; ++i) {
      s += this[i];
      if (this.type === Vector.COL) {
        s += "\n";
      } else {
        s += ' ';
      }
    }
    return s;
  },

  /**
   * Output this matrix to the console log.
   */
  disp: function() {
    console.log(this.toString());
  },

  clone: function() {
    return new Vector(this.flat(), this.type);
  },

  toArray: function(start, end) {
    start = start || 0;
    end   = end   || this.dim;

    var elements = new Array(dim);
    for (var i = start, dim = Math.min(end, this.dim); i < dim; ++i) {
      elements[i] = this[i];
    }
    return elements;
  },

  toMat: function() {
    if (this.type === Vector.ROW) {
      return Matrix.create(this.toArray());
    } else {
      var elements = new Array(this.dim);
      for (var i = this.dim - 1; i >= 0; --i) {
        elements[i] = [ this[i] ];
      }
      return Matrix.create(elements);
    }
  },

  toRowVector: function() {
    if (this.type === Vector.ROW) {
      return this.clone();
    } else {
      return this.t();
    }
  },

  toColVector: function() {
    if (this.type === Vector.COL) {
      return this.clone();
    } else {
      return this.t();
    }
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

    return this;
  },

  equals: function(v) {
    if (this.rows !== v.rows || this.cols !== v.cols) {
      return false;
    }

    var c;
    for (var i = this.dim - 1; i >= 0; --i) {
      if (this[i] !== v[i]) {
        return false;
      }
    }

    return true;
  },

  norm: function() {
    return Math.sqrt(this.clone().pow(2).sum());
  },

  normalize: function() {
    return this.div(this.norm());
  },

  hcat: function() {
   var mat = this.toMat();
   var catMat = mat.hcat.apply(mat, arguments);

    if (this.type === Vector.ROW) {
      return catMat.toVec();
    } else {
      return catMat;
    }
  },

  vcat: function() {
    var mat = this.toMat();
    var catMat = mat.vcat.apply(mat, arguments);

    if (this.type === Vector.COL) {
      return catMat.toVec();
    } else {
      return catMat;
    }
  },

  append: function(value) {
    return this.insert(this.dim, value);
  },

  insert: function(dim, value) {
    var array = this.flat();
    array.splice(dim, 0, value);
    return this.set(array, this.type);
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

  flat: function(start, end) {
    return this.toArray(start, end);
  },

  t: function() {
    var t = this.clone();

    if (t.type == Vector.ROW) {
      t.rows = t.cols;
      t.cols = 1;
      t.type = Vector.COL;
    } else {
      t.cols = t.rows;
      t.rows = 1;
      t.type = Vector.ROW;
    }

    return t;
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

  mmul: function(v) {
    if (v instanceof Vector) {
      if (this.type === Vector.ROW && v.type === Vector.COL) {
        var result = 0;
        for (var i = this.dim - 1; i >= 0; --i) {
          result += this[i] * v[i];
        }
        return result;
      } else {
        v = v.toMat();
      }
    }

    return this.toMat().mmul(v);
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

  /**
   * Note that cross product is defined only if vector is three dimensions.
   */
  cross: function(v) {
    if (this.dim !== 3 || v.dim !== 3) {
      throw new Error("Can't define cross product because vector dimension is not three dims.");
    }

    return Vector.create([
      this[1] * v[2] - this[2] * v[1],
      this[2] * v[0] - this[0] * v[2],
      this[0] * v[1] - this[1] * v[0]
    ], this.type);
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
Vector.fn = Vector.prototype;

asMath.call(Vector.prototype);
