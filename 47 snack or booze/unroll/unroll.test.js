const unroll = require("./unroll");

describe("#unroll", function () {
  it("is a function", function () {
    expect(typeof unroll).toEqual("function");
  });
  it("unrolls nested arrays", function () {
    expect(
      unroll([
        [1, 2],
        [3, 4],
      ])
    ).toEqual([1, 2, 3, 4]);
  });
  it("returns empty on empty array", function () {
    expect(unroll([])).toEqual([]);
  });
  it("unrolls a mixture of arrays and numbers", function () {
    expect(unroll([1, [2, 3], 4])).toEqual([1, 2, 3, 4]);
  });
});
