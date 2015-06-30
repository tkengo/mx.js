describe('Matrix', function(){
  describe('#inv', function(){
    it('should calculate the inverse matrix for 2x2 matrix', function() {
      var actual = Matrix.create([
        [ 1, 2 ],
        [ 3, 4 ]
      ]).inv();
      var expected = Matrix.create([
        [  -2,    1 ],
        [ 1.5, -0.5 ]
      ]);

      expect(actual).to.mat(expected);
    });

    it('should calculate the inverse matrix for 3x3 matrix', function() {
      var actual = Matrix.create([
        [ 2, 3, 2 ],
        [ 1, 2, 2 ],
        [ 4, 5, 3 ]
      ]).inv();
      var expected = Matrix.create([
        [ -4,  1,  2 ],
        [  4.999999999999999,  -1.9999999999999998, -2], // [  5, -2, -2 ]
        [ -2.9999999999999996,  1.9999999999999998,  1]  // [ -3,  2,  1 ]
      ]);

      expect(actual).to.mat(expected);
    });

    it('should calculate the inverse matrix for 3x3 matrix with pivot selection', function() {
      var actual = Matrix.create([
        [ 3, 3, 2 ],
        [ 2, 2, 1 ],
        [ 4, 3, 2 ]
      ]).inv();
      var expected = Matrix.create([
        [ -1,  0,  1 ],
        [  0,  2, -1 ],
        [  2, -3,  0 ]
      ]);

      expect(actual).to.mat(expected);
    });
  });
});
