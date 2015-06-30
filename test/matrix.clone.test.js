describe('Matrix', function(){
  describe('#clone', function(){
    it('should be clone to a new matrix', function() {
      var actual = Matrix.create([
        [ 1, 2 ],
        [ 3, 4 ]
      ]);

      var clone = actual.clone();
      actual.add(actual);

      expect(clone[0][0]).to.not.equal(actual[0][0]);
      expect(clone[1][0]).to.not.equal(actual[1][0]);
      expect(clone[0][1]).to.not.equal(actual[0][1]);
      expect(clone[1][1]).to.not.equal(actual[1][1]);
    });
  });
});
