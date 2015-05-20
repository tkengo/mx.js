describe('Matrix', function(){
  describe('#ones', function(){
    it('should create a new square matrix', function() {
      var m = Matrix.ones(3, 3);
      expect(m[0][0]).to.equal(1);
      expect(m[0][1]).to.equal(1);
      expect(m[0][2]).to.equal(1);
      expect(m[1][0]).to.equal(1);
      expect(m[1][1]).to.equal(1);
      expect(m[1][2]).to.equal(1);
      expect(m[2][0]).to.equal(1);
      expect(m[2][1]).to.equal(1);
      expect(m[2][2]).to.equal(1);

      expect(m.rows).to.equal(3);
      expect(m.cols).to.equal(3);
    });

    it('should create a new square matrix by ommitting cols arg', function() {
      var m = Matrix.ones(3);
      expect(m[0][0]).to.equal(1);
      expect(m[0][1]).to.equal(1);
      expect(m[0][2]).to.equal(1);
      expect(m[1][0]).to.equal(1);
      expect(m[1][1]).to.equal(1);
      expect(m[1][2]).to.equal(1);
      expect(m[2][0]).to.equal(1);
      expect(m[2][1]).to.equal(1);
      expect(m[2][2]).to.equal(1);

      expect(m.rows).to.equal(3);
      expect(m.cols).to.equal(3);
    });

    it('should create a new rectangular matrix', function() {
      var m = Matrix.ones(2, 3);
      expect(m[0][0]).to.equal(1);
      expect(m[0][1]).to.equal(1);
      expect(m[0][2]).to.equal(1);
      expect(m[1][0]).to.equal(1);
      expect(m[1][1]).to.equal(1);
      expect(m[1][2]).to.equal(1);
      expect(m.rows).to.equal(2);
      expect(m.cols).to.equal(3);

      m = Matrix.ones(3, 2);
      expect(m[0][0]).to.equal(1);
      expect(m[0][1]).to.equal(1);
      expect(m[1][0]).to.equal(1);
      expect(m[1][1]).to.equal(1);
      expect(m[2][0]).to.equal(1);
      expect(m[2][1]).to.equal(1);
      expect(m.rows).to.equal(3);
      expect(m.cols).to.equal(2);
    })
  });
});
