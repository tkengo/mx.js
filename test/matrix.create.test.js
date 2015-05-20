describe('Matrix', function(){
  describe('#create', function(){
    it('should create a new square matrix', function() {
      var m = Matrix.create(3, 3, 1);
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
    })

    it('should create a new rectangular matrix', function() {
      var m = Matrix.create(2, 3, 2);
      expect(m[0][0]).to.equal(2);
      expect(m[0][1]).to.equal(2);
      expect(m[0][2]).to.equal(2);
      expect(m[1][0]).to.equal(2);
      expect(m[1][1]).to.equal(2);
      expect(m[1][2]).to.equal(2);
      expect(m.rows).to.equal(2);
      expect(m.cols).to.equal(3);

      m = Matrix.create(3, 2, 3);
      expect(m[0][0]).to.equal(3);
      expect(m[0][1]).to.equal(3);
      expect(m[1][0]).to.equal(3);
      expect(m[1][1]).to.equal(3);
      expect(m[2][0]).to.equal(3);
      expect(m[2][1]).to.equal(3);
      expect(m.rows).to.equal(3);
      expect(m.cols).to.equal(2);
    })

    it('should create a new matrix from an array', function() {
      var elements = [ 1, 2, 3 ];
      var m = Matrix.create(elements);
      expect(m[0][0]).to.equal(1);
      expect(m[0][1]).to.equal(2);
      expect(m[0][2]).to.equal(3);
      expect(m.rows).to.equal(1);
      expect(m.cols).to.equal(3);
    })

    it('should create a new matrix from a 2 dimes array', function() {
      var elements = [ [ 1, 2 ], [ 3, 4 ], [ 5, 6 ] ];
      var m = Matrix.create(elements);
      expect(m[0][0]).to.equal(1);
      expect(m[0][1]).to.equal(2);
      expect(m[1][0]).to.equal(3);
      expect(m[1][1]).to.equal(4);
      expect(m[2][0]).to.equal(5);
      expect(m[2][1]).to.equal(6);
      expect(m.rows).to.equal(3);
      expect(m.cols).to.equal(2);
    })
  })
})
