describe('Matrix', function(){
  describe('#inv', function(){
    it('should calculate the inverse matrix for 2x2 matrix', function() {
      var ac = Matrix.create([
        [ 1, 2 ],
        [ 3, 4 ]
      ]).inv();
      var ex = Matrix.create([
        [  4, -2 ],
        [ -3,  1 ]
      ]).mul(-0.5);

      expect(ac[0][0]).to.equal(ex[0][0]);
      expect(ac[0][1]).to.equal(ex[0][1]);
      expect(ac[1][0]).to.equal(ex[1][0]);
      expect(ac[1][1]).to.equal(ex[1][1]);
    });

    it('should calculate the inverse matrix for 3x3 matrix', function() {
      var ac = Matrix.create([
        [ 2, 3, 2 ],
        [ 1, 2, 2 ],
        [ 4, 5, 3 ]
      ]).inv();
      var ex = Matrix.create([
        [ -4,  1,  2 ],
        [  5, -2, -2 ],
        [ -3,  2,  1 ]
      ]);

      expect(ac[0][0]).to.equal(ex[0][0]);
      expect(ac[0][1]).to.equal(ex[0][1]);
      expect(ac[0][2]).to.equal(ex[0][2]);
      expect(ac[1][0]).to.equal(ex[1][0]);
      expect(ac[1][1]).to.equal(ex[1][1]);
      expect(ac[1][2]).to.equal(ex[1][2]);
      expect(ac[2][0]).to.equal(ex[2][0]);
      expect(ac[2][1]).to.equal(ex[2][1]);
      expect(ac[2][2]).to.equal(ex[2][2]);
    });

    it('should calculate the inverse matrix for 3x3 matrix with pivot selection', function() {
      var ac = Matrix.create([
        [ 3, 3, 2 ],
        [ 2, 2, 1 ],
        [ 4, 3, 2 ]
      ]).inv();
      var ex = Matrix.create([
        [ -6, -1,  4 ],
        [  2,  0, -1 ],
        [  9,  2, -6 ]
      ]);

      ac.disp();
      expect(ac[0][0]).to.equal(ex[0][0]);
      expect(ac[0][1]).to.equal(ex[0][1]);
      expect(ac[0][2]).to.equal(ex[0][2]);
      expect(ac[1][0]).to.equal(ex[1][0]);
      expect(ac[1][1]).to.equal(ex[1][1]);
      expect(ac[1][2]).to.equal(ex[1][2]);
      expect(ac[2][0]).to.equal(ex[2][0]);
      expect(ac[2][1]).to.equal(ex[2][1]);
      expect(ac[2][2]).to.equal(ex[2][2]);
    });
  });
});
