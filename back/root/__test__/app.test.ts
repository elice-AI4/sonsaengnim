/* eslint-disable no-undef */
import app from "../src/app";
import request from "supertest";
import should from "should";

describe("GET /", () => {
  describe("성공 시", () => {
    it("status: succ 객체 반환", done => {
      request(app)
        .get("/")
        .end((err, res) => {
          should.exist({});
          res.body.should.have.property("status", "succ");
          done();
        });
    });
  });
});
