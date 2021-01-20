const assert = require("assert");
var functions = require("../getNewIdFunc");
describe("getNewId", () => {
  it("should return ref_1", (id = "ref_000") => {
    var result = functions.getNewId(id);
    assert.strictEqual(result, "ref_1");
  });
  it("should return res_5", (id = "res_4") => {
    var result = functions.getNewId(id);
    assert.strictEqual(result, "res_5");
  });

  it("should return an empty string", (id = "") => {
    var result = functions.getNewId(id);
    assert.strictEqual(result, "");
  });
});
