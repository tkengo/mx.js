/**
 * Constructor for Matrix object. Generate Matrix object from an array of JavaScript. `elements`
 * argument must be 2 dims array.
 */
var Matrix = function(elements) {
  this.rows = 0;
  this.cols = 0;

  this.set(elements || []);
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
  var elements;

  if (typeof rows == 'number') {
    if (rows > 0 && cols > 0) {
      initVal = initVal || 0;
      elements = new Array(rows);
      for (var r = rows - 1; r >= 0; --r) {
        var row = new Array(cols);
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

/**
 * Create a new diagonal matrix object. We can specify scalar or vector object to `value` arg.
 * If the scalar value is passed to `value`, all of diagonal elements in the matrix is same value.
 * For example, `Matrix.diag(2, 3)` generates 3x3 new diagonal matrix:
 *  -------
 * | 2 0 0 |
 * | 0 2 0 |
 * | 0 0 2 |
 *  -------
 *
 * If the vector is passed to `value`, diagonal elements in the matrix have each elements of the
 * vector. If `v` is define for `Vector.create([ 2, 5, 3 ])`, `Matrix.diag(v)` generates follow:
 *  -------
 * | 2 0 0 |
 * | 0 5 0 |
 * | 0 0 3 |
 *  -------
 */
Matrix.diag = function(value, size) {
  if (typeof value == 'number') {
    var m = Matrix.zeros(size);
    for (var i = size - 1; i >= 0; --i) {
      m[i][i] = value;
    }
    return m;
  } else {
    size = size || 0;
    var len = value.length + size;
    var m = Matrix.zeros(len);
    for (var i = len - 1; i >= 0; --i) {
      m[i][i + size] = value[i];
    }
    return m;
  }
};

/**
 * Define the prototype of the matrix object.
 *
 * Basically, operation method for matrix object is destructive. For example, `add` method was
 * invoked like this `m1.add(m2)` each elements of the source matrix `m1` will be added value from
 * m2 and changed. We can use `clone` method if we don't want to effect to source matrix.
 *
 * Many methods in the matrix return self, so we can do method chain such like this:
 * var sum = m1.add(x).pow(2).sum();
 */
Matrix.prototype = {
  /**
   * Build a string from the matrix for a human.
   */
  toString: function() {
    // Find max length in the all of elements in order to align matrix.
    var maxLength = [];
    for (var c = 0, clen = this.cols; c < clen; ++c) {
      maxLength[c] = 0;
      for (var r = 0, rlen = this.rows; r < rlen; ++r) {
        maxLength[c] = Math.max((this[r][c] + '').length, maxLength[c]);
      }
    }

    var s = '';
    for (var r = 0, rlen = this.rows; r < rlen; ++r) {
      for (var c = 0, clen = this.cols; c < clen; ++c) {
        s += (new Array(maxLength[c] - (this[r][c] + '').length + 2)).join(' ');
        s += this[r][c];
      }
      s += "\n";
    }
    return s;
  },

  /**
   * Output this matrix to the console log.
   */
  disp: function() {
    console.log(this.toString());
  },

  /**
   * Copy this matrix object.
   */
  clone: function() {
    return new Matrix(this.toArray());
  },

  /**
   * Translate this matrix object to the 2 dims array. For example, if we have the follow matrix:
   *  -------
   * | 2 1 2 |
   * | 1 5 1 |
   * | 4 0 3 |
   *  -------
   * returns the follow array from the matrix by calling `toArray` method:
   * [ [ 2, 1, 2 ],
   *   [ 1, 5, 1 ],
   *   [ 4, 0, 3 ] ]
   *
   * The matrix is not changed even if a value in the array is changed because the array is copied
   * from the source matrix.
   */
  toArray: function() {
    var elements = new Array(this.rows);
    for (var r = this.rows - 1; r >= 0; --r) {
      elements[r] = this[r].concat();
    }
    return elements;
  },

  toVector: function(type) {
    type = type || Vector.COL;

    var vectors, r, elements;
    if (type === Vector.COL) {
      vectors = new Array(this.cols);
      for (var c = this.cols - 1; c >= 0; --c) {
        vectors[c] = this.col(c);
      }
    } else {
      vectors = new Array(this.rows);
      for (var r = this.rows - 1; r >= 0; --r) {
        vectors[r] = this.row(r);
      }
    }

    return vectors;
  },

  /**
   * Invokes the given function once for each element of this matrix object. 3 arguments are passed
   * to the function `function map(value, row, col)`. `value` is the element value. `row` and `col`
   * is the index of the row or the column in the current iteration.
   *
   * The function should return a value. The returned value is assgined to the current index element.
   *
   * `this` object in the function is matrix object. We are in the matrix object context in the
   * function.
   */
  map: function(f) {
    var row, c;
    for (var r = this.rows - 1; r >= 0; --r) {
      row = this[r];
      for (c = this.cols - 1; c >= 0; --c) {
        row[c] = f.call(this, row[c], r, c);
      }
    }
    return this;
  },

  set: function(elements) {
    this.rows = elements.length;
    this.cols = this.rows == 0 ? 0 : elements[0].length;

    var row, c;
    for (var r = this.rows - 1; r >= 0; --r) {
      row = new Array(this.cols);
      for (c = this.cols - 1; c >= 0; --c) {
        row[c] = elements[r][c];
      }
      this[r] = row;
    }

    return this;
  },

  setCol: function(index, col) {
    if (typeof col == 'number') {
      for (var r = this.rows - 1; r >= 0; --r) {
        this[r][index] = col;
      }
    } else {
      if (this.rows !== col.rows || this.cols <= index) {
        return undefined;
      }

      for (var r = this.rows - 1; r >= 0; --r) {
        this[r][index] = col[r];
      }
    }
    return this;
  },

  setRow: function(index, row) {
    if (typeof row == 'number') {
      for (var c = this.cols - 1; c >= 0; --c) {
        this[index][c] = row;
      }
    } else {
      if (this.cols != row.cols || this.rows <= index) {
        return undefined;
      }

      for (var c = this.cols - 1; c >= 0; --c) {
        this[index][c] = row[c];
      }
    }
    return this;
  },

  insertRow: function(index, row) {
    var i;
    if (typeof row == 'number') {
      var tmp = new Array(this.cols);
      for (i = this.cols - 1; i >= 0; --i) {
        tmp[i] = row;
      }
      row = tmp;
    } else if (row.dim) {
      row = row.toArray();
    }

    for (i = this.rows++; i > index; --i) {
      this[i] = this[i - 1];
    }
    this[index] = row;
    return this;
  },

  insertCol: function(index, col) {
    var c, r;
    if (typeof col == 'number') {
      var tmp = new Array(this.rows);
      for (r = this.rows - 1; r >= 0; --r) {
        tmp[r] = col;
      }
      col = tmp;
    } else if (col.dim) {
      col = col.toArray();
    }

    for (r = 0, rlen = this.rows; r < rlen; ++r) {
      for (c = this.cols; c > index; --c) {
        this[r][c] = this[r][c - 1];
      }
    }
    for (r = 0, rlen = this.rows; r < rlen; ++r) {
      this[r][index] = col[c];
    }

    return this;
  },

  removeCol: function(col) {
    if (this.cols >= col) {
      for (var r = this.rows - 1; r >= 0; --r) {
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
    var elements = new Array(this.rows);
    for (var r = this.rows - 1; r >= 0; --r) {
      elements[r] = this[r][col];
    }
    return Vector.create(elements, Vector.COL);
  },

  flat: function() {
    var elements = new Array(this.rows * this.cols), index = 0;
    for (var r = 0, rlen = this.rows; r < rlen; ++r) {
      for (var c = 0, clen = this.cols; c < clen; ++c) {
        elements[index++] = this[r][c];
      }
    }
    return elements;
  },

  t: function() {
    var elements = new Array(this.cols);
    for (var c = this.cols - 1; c >= 0; --c) {
      var row = new Array(this.rows);
      for (var r = this.rows - 1; r >= 0; --r) {
        row[r] = this[r][c];
      }
      elements[c] = row;
    }

    return this.set(elements);
  },

  add: function(v) {
    if (typeof v == 'number') {
      for (var r = this.rows - 1; r >= 0; --r) {
        for (var c = this.cols - 1; c >= 0; --c) {
          this[r][c] += v;
        }
      }
    } else {
      for (var r = this.rows - 1; r >= 0; --r) {
        for (var c = this.cols - 1; c >= 0; --c) {
          this[r][c] += v[r][c];
        }
      }
    }
    return this;
  },

  mul: function(v) {
    if (typeof v == 'number') {
      for (var r = this.rows - 1; r >= 0; --r) {
        for (var c = this.cols - 1; c >= 0; --c) {
          this[r][c] *= v;
        }
      }
    } else {
      for (var r = this.rows - 1; r >= 0; --r) {
        for (var c = this.cols - 1; c >= 0; --c) {
          this[r][c] *= v[r][c];
        }
      }
    }
    return this;
  },

  mmul: function(v) {
    var elements = new Array(this.rows);
    for (var r = 0, rlen = this.rows; r < rlen; ++r) {
        var row = new Array(v.cols);
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
