(function() {
  function __$__(l, o, r) {
    if (typeof l === 'number' && typeof r === 'number') {
      switch (o) {
        case '+': return l + r;
        case '-': return l - r;
        case '*': return l * r;
        case '/': return l / r;
      }
    } else {
      if (l === void 0) {
        if (typeof r === 'number') {
          return -r;
        } else {
          return r.mul(-1);
        }
      }

      if (typeof l === 'number') {
        var tmp = l;
        l = r;
        r = tmp;
      }

      l = l.clone();
      switch (o) {
        case '+': return l.add(r);
        case '-': return l.sub(r);
        case '*': return l.mul(r);
        case '/': return l.div(r);
        case '^': return l.mmul(r);
      }
    }
  }

  var ms = [];
  Matrix.prototype.valueOf = function() {
    return this[0][0];
  };
  Vector.prototype.valueOf = function() {
    return this[0];
  };

  var fs;
  var _valueOf;
  function M(f) {
    var result;
    if (typeof f === 'function') {
      ms = [];
      deep = 0;
      f();

      fs = f.toString();
      fs = fs.replace(/[\r\n]/g, '').replace(/function *\(.*\) *{ *(.*) *;* *}/gm, '$1');
      fs = fs.replace(/(^\s+)|(\s+$)/g, '') + ';';
      var ast = acorn.parse(fs);
      var expressionRoot = ast.body[0].expression;
      var expression = walk(expressionRoot);
      result = eval(expression);
    } else if (typeof f === 'number') {
      var left  = ms.shift();
      var right = ms.shift();
      switch (f) {
        case  5: result = __$__(left, '+', right); break;
        case -1: result = __$__(left, '-', right); break;
        case  6: result = __$__(left, '*', right); break;
        case  1: result = __$__(left, '^', right); break;
        default: result = __$__(left, '/', right); break;
      }
    }

    if (_valueOf !== void 0) {
      Number.prototype.valueOf = _valueOf;
      _valueOf = void 0;
    }
    ms = [];
    Matrix.prototype.valueOf = matrixValueOf;
    Vector.prototype.valueOf = vectorValueOf;
    return result;
  }

  var deep = 0;
  function walk(node) {
    switch (node.type) {
      case 'BinaryExpression':
        var left, right;
        if (node.left.type === 'BinaryExpression' || node.right.type !== 'BinaryExpression') {
          left  = walk(node.left);
          right = walk(node.right);
        } else {
          right = walk(node.right);
          left  = walk(node.left);
        }
        return '__$__(' + left + ',' + '"' + node.operator + '",' + right + ')';
      case 'Identifier':
      case 'MemberExpression':
      case 'CallExpression':
        return 'ms[' + deep++ + ']';
      case 'Literal':
        return node.raw;
      case 'UnaryExpression':
        if (operator === '-') {
          return '__$__(void 0,' + '"' + node.operator + '",' + walk(node.argument) + ')';
        } else if (operator === '+') {
          walk(node.argument);
          break;
        }
    }
  }

  function push() {
    ms.push(this);
    return ms.length + 1;
  }

  var matrixValueOf;
  var vectorValueOf;
  var g = Function('return this')();
  Object.defineProperty(g, 'M', {
    enumerable: false,
    get: function() {
      matrixValueOf = Matrix.prototype.valueOf;
      vectorValueOf = Vector.prototype.valueOf;
      Matrix.prototype.valueOf = push;
      Vector.prototype.valueOf = push;

      return M;
    }
  });
  Object.defineProperty(Number.prototype, 'mat', {
    get: function() {
      if (_valueOf === void 0) {
        _valueOf = Number.prototype.valueOf;
        Number.prototype.valueOf = function() {
          var v = _valueOf.call(this);
          ms.push(v);
          return v;
        };
      }

      return this;
    }
  });
  Object.defineProperty(Number.prototype, 'vec', {
    get: function() {
      if (_valueOf === void 0) {
        _valueOf = Number.prototype.valueOf;
        Number.prototype.valueOf = function() {
          var v = _valueOf.call(this);
          ms.push(v);
          return v;
        };
      }

      return this;
    }
  });
})();
