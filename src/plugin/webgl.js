Object.defineProperty(Vector.fn, 'x', {
  enumerable: false,
  get: function() {
    return this[0];
  },
  set: function(x) {
    this[0] = x;
  }
});
Object.defineProperty(Vector.fn, 'y', {
  enumerable: false,
  get: function() {
    return this[1];
  },
  set: function(y) {
    this[1] = y;
  }
});
Object.defineProperty(Vector.fn, 'z', {
  enumerable: false,
  get: function() {
    return this[2];
  },
  set: function(z) {
    this[2] = z;
  }
});

Vector.fn.rotate = function(angle, axis) {
  var r = Matrix.rotate(angle, axis);
  var v = this.clone().append(1);
  var n = M(r ^ v);

  return this.set(n.toVec().flat(0, 3), this.type);
};

Vector.fn.rotateX = function(angle) {
  return this.rotate(angle, [ 1, 0, 0 ]);
};
Vector.fn.rotateY = function(angle) {
  return this.rotate(angle, [ 0, 1, 0 ]);
};
Vector.fn.rotateZ = function(angle) {
  return this.rotate(angle, [ 0, 0, 1 ]);
};

Vector.fn.translate = function(translate) {
  var t = Matrix.translate(translate);
  var v = this.clone().append(1);
  var n = M(t ^ v);

  return this.set(n.toVec().flat(0, 3), this.type);
};

Matrix.lookAt = function(eye, center, up) {
  if (eye instanceof Array) {
    eye = Vector.create(eye, Vector.ROW);
  } else {
    eye = eye.toRowVector();
  }

  if (center instanceof Array) {
    center = Vector.create(center, Vector.ROW);
  } else {
    center = center.toRowVector();
  }

  if (up instanceof Array) {
    up = Vector.create(up, Vector.ROW);
  } else {
    up = up.toRowVector();
  }

  if (eye.equals(center)) {
    return Matrix.eye(4);
  }

  var c3 = M(eye - center).normalize();
  var c1 = up.cross(c3).normalize();
  if (c1[0] === Infinity) {
    c1 = Vector.zeros(3);
  }
  var c2 = c3.cross(c1).normalize();
  if (c2[0] === Infinity) {
    c2 = Vector.zeros(3);
  }

  return c1.vcat(c2, c3, 0).hcat([
    -M(c1 * eye).sum(),
    -M(c2 * eye).sum(),
    -M(c3 * eye).sum(),
    1
  ]);
};

Matrix.translate = function(v) {
  if (v instanceof Array) {
    v = Vector.create(v);
  }

  var t = Matrix.eye(4);
  t[0][3] = v.x;
  t[1][3] = v.y;
  t[2][3] = v.z;
  return t;
};

Matrix.rotate = function(angle, axis) {
  if (axis instanceof Array) {
    axis = Vector.create(axis);
  }

  axis.normalize();
  if (axis[0] === Infinity) {
    return Matrix.eye(4);
  }

  var s = Math.sin(angle);
  var c = Math.cos(angle);
  var t = 1 - c;
  var x = axis.x;
  var y = axis.y;
  var z = axis.z;

  return Matrix.create([
    [ x * x * t +     c, y * x * t - z * s, z * x * t + y * s, 0 ],
    [ x * y * t + z * s, y * y * t +     c, z * y * t - x * s, 0 ],
    [ x * z * t - y * s, y * z * t + x * s, z * z * t +     c, 0 ],
    [ 0,                 0,                 0,                 1 ]
  ]);
};

Matrix.perspective = function(fovy, aspect, near, far) {
  var f = 1.0 / Math.tan(fovy / 2);
  var v = near - far;

  var perspective = Matrix.zeros(4);
  perspective[0][0] = f * aspect;
  perspective[1][1] = f;
  perspective[2][2] = (far + near) / v;
  perspective[3][2] = -1;
  perspective[2][3] = (2 * far * near) / v;
  return perspective;
};

Matrix.orthogonal = function(left, right, bottom, top, near, far) {
    var w = (right - left);
    var h = (top - bottom);
    var d = (far - near);
    return Matrix.create([
      [ 2 / w,     0,      0, -(right + left) / w ],
      [     0, 2 / h,      0, -(top + bottom) / h ],
      [     0,     0, -2 / d, -(far + near)   / d ],
      [     0,     0,      0,                   1 ]
    ]);
}

Matrix.sphere = function(latBands, longBands, rad) {
  var vertices = [];
  for (var lat = 0; lat <= latBands; lat++) {
    var theta = lat * Math.PI / latBands;
    var sinTheta = Math.sin(theta);
    var cosTheta = Math.cos(theta);
    for (var long = 0; long <= longBands; long++) {
      var phi = long * 2 * Math.PI / longBands;
      var sinPhi = Math.sin(phi);
      var cosPhi = Math.cos(phi);
      var x = cosPhi * sinTheta;
      var y = cosTheta;
      var z = sinPhi * sinTheta;
      vertices.push([ rad * x, rad * y, rad * z ]);
    }
  }

  return Matrix.create(vertices);
};

Matrix.fn.toMatrixForWebGL = function() {
  return new Float32Array(this.clone().t().flat());
};

Matrix.fn.toBufferForWebGL = function(transpose) {
  return new Float32Array(this.flat());
};
