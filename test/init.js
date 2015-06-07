mocha.setup('bdd');
var expect = chai.expect;

chai.Assertion.addMethod('mat', function () {
  var actually = this._obj;
  var expected = arguments[0];

  for (var r = 0; r < actually.rows; r++) {
    for (var c = 0; c < actually.cols; c++) {
      if (actually[r][c] !== expected[r][c]) {
        this.assert(false, 'actually[' + r + '][' + c + '] and expcted[' + r + '][' + c + '] is not equal');
      }
    }
  }
  this.assert(true);
});
