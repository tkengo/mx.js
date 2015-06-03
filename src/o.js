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
        throw new Error("The given expression can't calculate due to the left operand has a scalar value and the right operand has a Matrix or Vector object: " + fs);
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
    ms.push(this);
    return ms.length + 1;
  };
  Vector.prototype.valueOf = function() {
    ms.push(this);
    return ms.length + 1;
  };

  var fs;
  function M(f) {
    if (typeof f === 'function') {
      var _valueOf = Number.prototype.valueOf;
      Number.prototype.valueOf = function() {
        var v = _valueOf.call(this);
        ms.push(v);
        return v;
      };

      ms = [];
      deep = 0;
      f();
      Number.prototype.valueOf = _valueOf;

      fs = f.toString();
      fs = fs.replace(/[\r\n]/g, '').replace(/function *\(.*\) *{ *(.*) *;* *}/gm, '$1');
      fs = fs.replace(/(^\s+)|(\s+$)/g, '') + ';';
      var ast = acorn.parse(fs);
      var expressionRoot = ast.body[0].expression;
      var expression = walk(expressionRoot);
      var result = eval(expression);
      ms = [];
      return result;
    } else if (typeof f === 'number') {
      var left  = ms.shift();
      var right = ms.shift();
      switch (f) {
        case  5: return __$__(left, '+', right);
        case -1: return __$__(left, '-', right);
        case  6: return __$__(left, '*', right);
        default: return __$__(left, '/', right);
      }
    }
  }

  var deep = 0;
  function walk(node) {
    switch (node.type) {
      case 'BinaryExpression':
        var left  = walk(node.left);
        var right = walk(node.right);
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

  var g = Function('return this')();
  Object.defineProperty(g, 'M', {
    enumerable: false,
    get: function() {
      return M;
    }
  });
  Object.defineProperty(g, 'S', {
    enumerable: false,
    get: function() {
      return function(scalar) {
        ms.push(scalar);
        return ms.length + 1;
      };
    }
  });
  Object.defineProperty(Number.prototype, 'mat', {
    get: function() {
      return this;
    }
  });
  Object.defineProperty(Number.prototype, 'vec', {
    get: function() {
      return this;
    }
  });
})();
