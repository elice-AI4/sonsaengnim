/* eslint-disable no-undef */
import { expect } from "chai";
import { sum } from "./index";

describe("index.ts 테스트", () => {
  it("sum 테스트", () => {
    expect(sum(1, 1)).to.equal(2);
    expect(sum(1, 1)).to.not.equal("귀요미");
  });
});
