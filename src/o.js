(function() {
  function __$__(l, o, r) {
    if (typeof l === 'number' && typeof r === 'number') {
      switch (o) {
        case '+': return l + r;
        case '-': return l - r;
        case '*': return l * r;
        case '^': return Mx.Utils.getPow(r)(l);
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
        case '^': return l.pow(r);
        case '/': return l.div(r);
      }
    }
  }

  var fs;
  function M(f) {
    fs = f.toString();
    fs = fs.replace(/[\r\n]/g, '').replace(/function *\(.*\) *{ *(.*) *;* *}/gm, '$1');
    fs = fs.replace(/(^\s+)|(\s+$)/g, '') + ';';
    var ast = acorn.parse(fs);
    var expressionRoot = ast.body[0].expression;
    var expression = walk(expressionRoot);
    // console.log(ast.body[0].expression);
    // console.log(expression);
    return eval(expression);
  }

  function walk(node) {
    switch (node.type) {
      case 'BinaryExpression':
        var left  = walk(node.left);
        var right = walk(node.right);
        return '__$__(' + left + ',' + '"' + node.operator + '",' + right + ')';
      case 'Identifier':
        return node.name;
      case 'Literal':
        return node.raw;
      case 'UnaryExpression':
        if (operator === '-') {
          return '__$__(void 0,' + '"' + node.operator + '",' + walk(node.argument) + ')';
        } else if (operator === '+') {
          walk(node.argument);
          break;
        }
      case 'CallExpression':
        var arguments = node.arguments;
        if (node.callee.object !== void 0) {
          var obj = walk(node.callee.object);

          if (arguments.length === 0) {
            return obj + '.' + fs.substring(node.callee.property.start, node.end);
          } else {
            var len = arguments.length;
            var str = new Array(len);
            for (var i = 0; i < len; ++i) {
              str[i] = walk(arguments[i]);
            }
            return obj + '.' + fs.substring(node.callee.property.start, node.callee.property.end) + '(' + str.join() + ')';
          }
        } else {
          if (arguments.length === 0) {
            return fs.substring(node.start, node.end);
          } else {
            var len = arguments.length;
            var str = new Array(len);
            for (var i = 0; i < len; ++i) {
              str[i] = walk(arguments[i]);
            }
            return fs.substring(node.callee.start, node.callee.end) + '(' + str.join() + ')';
          }
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
})();
