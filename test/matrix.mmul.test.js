describe('Matrix', function(){
  describe('#mmul', function(){
    it('should calculate the multiplation with matrix and matrix', function() {
      var actual = Matrix.create([
        [ 1, 2 ],
        [ 3, 4 ]
      ]);
      var expected = Matrix.create([
        [  7, 10 ],
        [ 15, 22 ]
      ]);

      expect(actual.mmul(actual)).to.mat(expected);
    });
  });

  describe('#mmul', function(){
    it('should calculate the multiplation with column vector and matrix', function() {
      var v = Vector.create([ 2, 3 ]);
      var m = Matrix.create([
        [ 1, 0 ],
        [ 0, 1 ]
      ]);
      var expected = Matrix.create([
        [ 2, 3 ]
      ]);

      expect(v.mmul(m)).to.mat(expected);
    });
  });
});

