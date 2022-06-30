/* eslint-disable no-undef */
import app from "../src/app";
import request from "supertest";
import { v4 as uuid } from "uuid";

describe("End-to-End Test", () => {
  let random_user;

  beforeAll(() => {
    random_user = uuid().split("-")[1];
  });

  describe("POST /register", () => {
    test("responds with user information in json", async () => {
      await request(app)
        .post("/register")
        .set("Accept", "application/json")
        .type("application/json")
        .send({ username: "test" + random_user, email: random_user + "@test.com", password: "12341234" })
        .expect(200)
        .expect("Content-Type", /json/);
      //.expect({ name: "modolee" });
    });
  });

  describe("GET /", () => {
    test("responds with json", async () => {
      await request(app)
        .get("/")
        .set("Accept", "application/json")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect({ status: "succ" });
    });
  });

  describe("POST /user", () => {
    test("user login", async () => {
      await request(app)
        .post("/user")
        .set("Accept", "application/json")
        .type("application/json")
        .send({ email: random_user + "@test.com", password: "12341234" })
        .expect(200)
        .expect("Content-Type", /json/);
      //.expect({ name: "modolee" });
    });
  });

  describe("GET /hands", () => {
    test("check hand data", async () => {
      await request(app).get("/hands").set("Accept", "application/json").expect(200).expect("Content-Type", /json/);
    });
  });

  describe("GET /hands/:alphabet", () => {
    let alphabet = "a";
    test("check hand data", async () => {
      await request(app)
        .get("/hands/" + alphabet)
        .set("Accept", "application/json")
        .expect(200)
        .expect("Content-Type", /json/);
    });
  });
});
