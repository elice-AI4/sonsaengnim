/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
import app from "../src/app";
import request from "supertest";
import should from "should";
import mongoose from "mongoose";

const databaseName = "test";

describe("integration test", () => {
  before(async () => {
    const url = `mongodb://127.0.0.1/${databaseName}`;
    await mongoose.connect(url);
  });

  after(async () => {
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

  describe("POST /register", () => {
    describe("성공 시", () => {
      it("가입 유저 반환 + 201 반환", done => {
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
    describe("실패 시", () => {
      it("error code 400반환", done => {
        const user = { email: "test@test.com", password: "12341234" };
        request(app).post("/register").send(user).expect(400).end(done);
      });
    });
  });

  describe("POST /user", () => {
    describe("로그인 성공시", () => {
      it("login user object 반환", done => {
        const user = { email: "test@test.com", password: "12341234" };
        request(app)
          .post("/user")
          .send(user)
          .expect(200)
          .end((err, res) => {
            res.body.should.be.instanceof(Object);
            done();
          });
      });
    });
    describe("로그인 실패시", () => {
      it("password 8자 미만 + 400error 반환", done => {
        const user = { email: "test@test.com", password: "123" };
        request(app)
          .post("/user")
          .send(user)
          .expect(400)
          .end((err, res) => {
            const error = res.body.errors[0];
            error.should.have.property("msg", "8글자 이상 써주세요.");
            done();
          });
      });

      it("email 형식 x + 400error 반환", done => {
        const user = { email: "testst.com", password: "12341234" };
        request(app)
          .post("/user")
          .send(user)
          .expect(400)
          .end((err, res) => {
            const error = res.body.errors[0];
            error.should.have.property("msg", "이메일 형식으로 입력하세요.");
            done();
          });
      });

      it("비밀번호 틀림 + 400 error 반환 ", done => {
        const user = { email: "test@test.com", password: "12345678" };
        request(app)
          .post("/user")
          .send(user)
          .expect(400)
          .end((err, res) => {
            res.body.should.have.property("message", "Error: 비밀 번호가 일치하지 않습니다.");
            done();
          });
      });

      it("email 없음 + 400error반환", done => {
        const user = { email: "test1@test.com", password: "12341234" };
        request(app)
          .post("/user")
          .send(user)
          .expect(400)
          .end((err, res) => {
            res.body.should.have.property("message", "Error: 해당 이메일로 가입한 유저가 없습니다.");
            done();
          });
      });
    });
  });

  describe("PUT /user", () => {
    let token;
    beforeEach(done => {
      const user = { email: "test@test.com", password: "12341234" };
      request(app)
        .post("/user")
        .send(user)
        .end((err, res) => {
          token = res.body.token;
          done();
        });
    });

    describe("변경 실패 시 ", () => {
      it("400Error", done => {
        const user = { email: "test" };
        request(app)
          .put("/user")
          .set({ Authorization: `Bearer ${token}` })
          .send(user)
          .expect(400)
          .end(done);
      });
    });

    describe("변경 성공 시", () => {
      it("변경된 user object 반환 + 200 반환", done => {
        const user = { email: "test1@test.com", password: "12341234" };
        request(app)
          .put("/user")
          .set({ Authorization: `Bearer ${token}` })
          .send(user)
          .expect(200)
          .end((err, res) => {
            res.body.should.be.instanceof(Object);
            done();
          });
      });
    });
  });

  describe("PUT /user/password", () => {
    let token;
    beforeEach(done => {
      const user = { email: "test1@test.com", password: "12341234" };
      request(app)
        .post("/user")
        .send(user)
        .end((err, res) => {
          token = res.body.token;
          done();
        });
    });

    describe("실패 시", () => {
      it("400 error 반환", done => {
        const updatePassword = { password: "1234" };
        request(app)
          .put("/user/password")
          .set({ Authorization: `Bearer ${token}` })
          .send(updatePassword)
          .expect(400)
          .end(done);
      });
    });

    describe("성공 시 ", () => {
      it("바뀐 비밀번호 user object + 200 반환", done => {
        const updatePassword = { password: "12345678" };
        request(app)
          .put("/user/password")
          .set({ Authorization: `Bearer ${token}` })
          .send(updatePassword)
          .expect(200)
          .end((err, res) => {
            res.body.should.be.instanceof(Object);
            done();
          });
      });
    });
  });

  describe("DELETE /user", () => {
    let token;
    beforeEach(done => {
      const user = { email: "test1@test.com", password: "12345678" };
      request(app)
        .post("/user")
        .send(user)
        .end((err, res) => {
          token = res.body.token;
          done();
        });
    });

    describe("성공 시", () => {
      it("deleteUser has status property", done => {
        request(app)
          .delete("/user")
          .set({ Authorization: `Bearer ${token}` })
          .expect(200)
          .end((err, res) => {
            res.body.should.have.property("status", "succ");
            done();
          });
      });
    });
    describe("실패 시", () => {
      it("400 Error", done => {
        request(app).delete("/user").expect(401).end(done);
      });
    });
  });
});
