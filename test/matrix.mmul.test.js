describe('Matrix', function(){
  describe('#mmul', function(){
    it('should calculate the multiplation with matrix and matrix', function() {
      var ac = Matrix.create([
        [ 1, 2 ],
        [ 3, 4 ]
      ]);
      var ex = Matrix.create([
        [  7, 10 ],
        [ 15, 22 ]
      ]);

      expect(ac.mmul(ac)).to.mat(ex);
    });
  });

  describe('#mmul', function(){
    it('should calculate the multiplation with column vector and matrix', function() {
      var v = Vector.create([ 2, 3 ]);
      var m = Matrix.create([
        [ 1, 0 ],
        [ 0, 1 ]
      ]);
      var ex = Matrix.create([
        [ 2, 3 ]
      ]);

      expect(v.mmul(m)).to.mat(ex);
    });
  });
});

