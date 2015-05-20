describe('Matrix', function(){
  describe('#diag', function(){
    it('should create a new diagonal matrix from a scalar value', function() {
      var m = Matrix.diag(3, 3);
      expect(m[0][0]).to.equal(3);
      expect(m[0][1]).to.equal(0);
      expect(m[0][2]).to.equal(0);
      expect(m[1][0]).to.equal(0);
      expect(m[1][1]).to.equal(3);
      expect(m[1][2]).to.equal(0);
      expect(m[2][0]).to.equal(0);
      expect(m[2][1]).to.equal(0);
      expect(m[2][2]).to.equal(3);
      expect(m.rows).to.equal(3);
      expect(m.cols).to.equal(3);
    });

    it('should create a new diagonal matrix from a vector', function() {
      var v = Vector.create([ 2, 5, 3 ]);
      var m = Matrix.diag(v);
      expect(m[0][0]).to.equal(2);
      expect(m[0][1]).to.equal(0);
      expect(m[0][2]).to.equal(0);
      expect(m[1][0]).to.equal(0);
      expect(m[1][1]).to.equal(5);
      expect(m[1][2]).to.equal(0);
      expect(m[2][0]).to.equal(0);
      expect(m[2][1]).to.equal(0);
      expect(m[2][2]).to.equal(3);
      expect(m.rows).to.equal(3);
      expect(m.cols).to.equal(3);
    });
  });
});
