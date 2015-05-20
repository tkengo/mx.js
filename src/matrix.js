/**
 * Constructor for Matrix object. Generate Matrix object from an array of JavaScript. `elements`
 * argument must be 2 dims array.
 */
var Matrix = function(elements) {
  this.set(elements);
};

/**
 * Create a new matrix object. We can pass matrix size and initial value or array object directly.
 *
 * First, `Matrix.create(3, 3, 1)` generates a new 3x3 matrix and all elements in it will be '1':
 *  -------
 * | 1 1 1 |
 * | 1 1 1 |
 * | 1 1 1 |
 *  -------
 * Default value for the third argument is zero, so we can generate a Matrix that has zero value in
 * all of elements if the third argument is ommited.
 * If zero or negative value is passed to `rows` or `cols` arguments, this method returns empty
 * Matrix.
 *
 * Second, `Matrix.create([ 1, 2, 3 ])` generates a new 1x3 matrix and its elements have 1, 2, 3
 * values on the first row:
 *  -------
 * | 1 2 3 |
 *  -------
 *
 * Or we can also generate 3x2 matrix by passing 2 dims array like this
 * `Matrix.create([ [ 1, 2 ], [ 3, 4 ], [ 5, 6 ] ])`.
 *  -----
 * | 1 2 |
 * | 3 4 |
 * | 5 6 |
 *  -----
 */
Matrix.create = function(rows, cols, initVal) {
  var elements = [];

  if (typeof rows == 'number') {
    if (rows > 0 && cols > 0) {
      initVal = initVal || 0;
      for (var r = rows - 1; r >= 0; --r) {
        var row = [];
        for (var c = cols - 1; c >= 0; --c) {
          row[c] = initVal;
        }
        elements[r] = row;
      }
    }
  } else {
    rows = rows || [];
    if (typeof rows[0] == 'number') {
      elements = [ rows ];
    } else {
      elements = rows;
    }
  }

  return new Matrix(elements);
};

/**
 * Create a new matrix object. All of elements of the matrix is zero. We must specify the matrix
 * size with `rows` and `cols`. For example, `Matrix.zeros(3, 4)` generates 3x4 matrix follow:
 *  ---------
 * | 0 0 0 0 |
 * | 0 0 0 0 |
 * | 0 0 0 0 |
 *  ---------
 *
 * If cols argument is ommited such like `Matrix.zeros(3)`, this method generates squrea matrix:
 *  -------
 * | 0 0 0 |
 * | 0 0 0 |
 * | 0 0 0 |
 *  -------
 */
Matrix.zeros = function(rows, cols) {
  return Matrix.create(rows, cols || rows, 0);
};

/**
 * Create a new matrix object. All of elements of the matrix is 1. We must specify the matrix
 * size with `rows` and `cols`. For example, `Matrix.ones(3, 4)` generates 3x4 matrix follow:
 *  ---------
 * | 1 1 1 1 |
 * | 1 1 1 1 |
 * | 1 1 1 1 |
 *  ---------
 *
 * If cols argument is ommited such like `Matrix.ones(3)`, this method generates squrea matrix:
 *  -------
 * | 1 1 1 |
 * | 1 1 1 |
 * | 1 1 1 |
 *  -------
 */
Matrix.ones = function(rows, cols) {
  return Matrix.create(rows, cols || rows, 1);
};

/**
 * Create a new identity matrix object. We must specify the matrix size with `rows` and `cols`.
 * If cols argument is ommited, this method generates squrea matrix. For example, `Matrix.eye(3)`
 * is:
 *  -------
 * | 1 0 0 |
 * | 0 1 0 |
 * | 0 0 1 |
 *  -------
 *
 * And rectangular matrix is generated if rows and cols is not equals. `Matrix.eye(2, 3)` is:
 *  -------
 * | 1 0 0 |
 * | 0 1 0 |
 *  -------
 */
Matrix.eye = function(rows, cols) {
  cols = cols || rows;
  if (rows == cols) {
    return Matrix.diag(1, rows);
  } else {
    var m = Matrix.zeros(rows, cols);
    for (var i = Math.min(rows, cols) - 1; i >= 0; --i) {
        m[i][i] = 1;
    }
    return m;
  }
};

Matrix.diag = function(value, size) {
  if (typeof value == 'number') {
    var m = Matrix.zeros(size);
    for (var i = 0; i < size; ++i) {
      m[i][i] = value;
    }
    return m;
  } else {
    size = size || 0;
    var len = value.length + size;
    var m = Matrix.zeros(len);
    for (var i = 0; i < len; ++i) {
      m[i][i + size] = value[i];
    }
    return m;
  }
};

Matrix.prototype = {
  toString: function() {
    var s = '';
    for (var r = 0, rlen = this.rows; r < rlen; ++r) {
      for (var c = 0, clen = this.cols; c < clen; ++c) {
        s += ' ' + this[r][c];
      }
      s += "\n";
    }
    return s;
  },

  disp: function() {
    console.log(this.toString());
  },

  clone: function() {
    return new Matrix(this.toArray());
  },

  toArray: function() {
    var elements = [];
    for (var r = 0, len = this.rows; r < len; ++r) {
      elements[r] = this[r].concat();
    }
    return elements;
  },

  map: function(f) {
    for (var r = 0, rlen = this.rows; r < rlen; ++r) {
      var row = this[r];
      for (var c = 0, clen = this.cols; c < clen; ++c) {
        row[c] = f(row[c]);
      }
    }
    return this;
  },

  set: function(elements) {
    this.rows = elements.length;
    this.cols = this.rows == 0 ? 0 : elements[0].length;

    for (var r = 0, rlen = this.rows; r < rlen; ++r) {
      var row = [];
      for (var c = 0, clen = this.cols; c < clen; ++c) {
        row[c] = elements[r][c];
      }
      this[r] = row;
    }
  },

  setCol: function(index, col) {
    if (typeof col == 'number') {
      for (var r = 0, rlen = this.rows; r < rlen; ++r) {
        this[r][index] = col;
      }
    } else {
      if (this.rows != col.rows || this.cols <= index) {
        return undefined;
      }

      for (var r = 0, rlen = this.rows; r < rlen; ++r) {
        this[r][index] = col[r];
      }
    }
    return this;
  },

  setRow: function(index, row) {
    if (typeof row == 'number') {
      for (var c = 0, clen = this.cols; c < clen; ++c) {
        this[index][c] = row;
      }
    } else {
      if (this.cols != row.cols || this.rows <= index) {
        return undefined;
      }

      for (var c = 0, clen = this.cols; c < clen; ++c) {
        this[index][c] = row[c];
      }
    }
    return this;
  },

  insertRow: function(index, row) {
    if (typeof row == 'number') {
      var tmp = [];
      for (var i = 0, len = this.cols; i < len; ++i) {
        tmp[i] = row;
      }
      row = tmp;
    } else if (row.dim) {
      row = row.toArray();
    }

    for (var r = this.rows++; r > index; --r) {
      this[r] = this[r - 1];
    }
    this[index] = row;
    return this;
  },

  insertCol: function(index, col) {
    if (typeof col == 'number') {
      var tmp = [];
      for (var i = 0, len = this.rows; i < len; ++i) {
        tmp[i] = col;
      }
      col = tmp;
    } else if (col.dim) {
      col = col.toArray();
    }

    var c = this.cols++;
    for (var r = 0, rlen = this.rows; r < rlen; ++r) {
      for (; c > index; --c) {
        this[r][c] = this[r][c - 1];
      }
    }
    for (var r = 0, rlen = this.rows; r < rlen; ++r) {
      this[r][index] = col[c];
    }

    return this;
  },

  removeCol: function(col) {
    if (this.cols >= col) {
      for (var r = 0, rlen = this.rows; r < rlen; ++r) {
        this[r].splice(col, 1);
      }

      this.cols--;
    }

    return this;
  },

  removeRow: function(row) {
    if (this.rows >= row) {
      for (var r = row, len = this.rows - 1; r < len; ++r) {
        this[r] = this[r + 1];
      }

      delete this[--this.rows];
    }

    return this;
  },

  at: function(row, col) {
    if (typeof col == 'undefined') {
      col = row % this.cols;
      row = row / this.cols;
    }
    return this[row][col];
  },

  row: function(row) {
    return Vector.create(this[row].concat(), Vector.ROW);
  },

  col: function(col) {
    var elements = [];
    for (var r = 0, len = this.rows; r < len; ++r) {
      elements[r] = this[r][col];
    }
    return Vector.create(elements, Vector.COL);
  },

  flat: function() {
    var elements = [], index = 0;
    for (var r = 0, rlen = this.rows; r < rlen; ++r) {
      for (var c = 0, clen = this.cols; c < clen; ++c) {
        elements[index++] = this[r][c];
      }
    }
    return elements;
  },

  t: function() {
    var elements = [];
    for (var c = 0, clen = this.cols; c < clen; ++c) {
      var row = [];
      for (var r = 0, rlen = this.rows; r < rlen; ++r) {
        row[r] = this[r][c];
      }
      elements[c] = row;
    }

    this.set(elements);
    return this;
  },

  add: function(v) {
    if (typeof v == 'number') {
      for (var r = 0, rlen = this.rows; r < rlen; ++r) {
        for (var c = 0, clen = this.cols; c < clen; ++c) {
          this[r][c] += v;
        }
      }
    } else {
      for (var r = 0, rlen = this.rows; r < rlen; ++r) {
        for (var c = 0, clen = this.cols; c < clen; ++c) {
          this[r][c] += v[r][c];
        }
      }
    }
    return this;
  },

  mul: function(v) {
    if (typeof v == 'number') {
      for (var r = 0, rlen = this.rows; r < rlen; ++r) {
        for (var c = 0, clen = this.cols; c < clen; ++c) {
          this[r][c] *= v;
        }
      }
    } else {
      for (var r = 0, rlen = this.rows; r < rlen; ++r) {
        for (var c = 0, clen = this.cols; c < clen; ++c) {
          this[r][c] *= v[r][c];
        }
      }
    }
    return this;
  },

  mmul: function(v) {
    var elements = [];
    for (var r = 0, rlen = this.rows; r < rlen; ++r) {
        var row = [];
        for (var c = 0, clen = v.cols; c < clen; ++c) {
            var sum = 0;
            for (var i = 0, len = this.cols; i < len; ++i) {
                sum += this[r][i] * v[i][c];
            }
            row[c] = sum;
        }
        elements[r] = row;
    }
    return Matrix.create(elements);
  },

  div: function(v) {
    for (var r = 0, rlen = this.rows; r < rlen; ++r) {
      for (var c = 0, clen = this.cols; c < clen; ++c) {
        this[r][c] /= v;
      }
    }
    return this;
  },

  pow: function(p) {
    if (p == 1) {
      return this;
    }

    var _pow = Mx.Utils.getPow(p);
    for (var r = 0, rlen = this.rows; r < rlen; ++r) {
      for (var c = 0, clen = this.cols; c < clen; ++c) {
        this[r][c] = _pow(this[r][c]);
      }
    }

    return this;
  },

  minWithIndex: function() {
    var elements = this.flat();
    var min = Math.min.apply(null, elements);
    var index = elements.indexOf(min);
    return [ min, index ];
  },

  maxRows: function() {
    var maxes = [];
    for (var r = 0, len = this.rows; r < len; ++r) {
      maxes[r] = Math.max.apply(null, this[r]);
    }
    return Vector.create(maxes, Vector.COL);
  },

  sum: function() {
    var sum = 0;
    for (var r = 0, rlen = this.rows; r < rlen; ++r) {
      for (var c = 0, clen = this.cols; c < clen; ++c) {
        sum += this[r][c];
      }
    }
    return sum;
  },

  sumCols: function() {
    var sum = [];

    for (var c = 0, clen = this.cols; c < clen; ++c) {
      sum[c] = 0;
      for (var r = 0, rlen = this.rows; r < rlen; ++r) {
        sum[c] += this[r][c];
      }
    }

    return Vector.create(sum, Vector.ROW);
  },

  sumRows: function() {
    var sum = [];

    for (var r = 0, rlen = this.rows; r < rlen; ++r) {
      sum[r] = 0;
      for (var c = 0, clen = this.cols; c < clen; ++c) {
        sum[r] += this[r][c];
      }
    }

    return Vector.create(sum, Vector.COL);
  }
};

asMath.call(Matrix.prototype);
