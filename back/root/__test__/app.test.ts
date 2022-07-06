/* eslint-disable no-undef */
import app from "../src/app";
import request from "supertest";
import should from "should";
import mongoose from "mongoose";

const databaseName = "test";

describe("integration test", () => {
  beforeEach(async () => {
    const url = `mongodb://127.0.0.1/${databaseName}`;
    await mongoose.connect(url);
  });

  afterEach(async () => {
    // 모든 테스트가 종료되고 이게 마지막으로 실행된다.
    if (mongoose.connection) {
      await mongoose.connection.dropDatabase();
      await mongoose.disconnect();
    }
  });
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

  describe("post /register", () => {
    describe("GET /register", () => {
      describe("성공 시", () => {
        it("가입 유저 반환", done => {
          const user = { email: "test@test.com", password: "12341234", username: "kim" };
          request(app)
            .post("/register")
            .send(user)
            .end((err, res) => {
              res.body.should.be.instanceof(Object);
              done();
            });
        });
      });
    });
  });
});
