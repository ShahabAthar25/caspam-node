import request from "supertest";
import app from "../app";

describe("POST /auth", () => {
  describe("POST /register", () => {
    describe("With username and password", () => {
      test("should respond with a 200 status code and has userId", async () => {
        const response = await request(app).post("/auth/register").send({
          username: "Shahab",
          email: "shahabathar25@gmail.com",
          password: "12345678",
        });
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe("User registered successfully");
      });
    });

    describe("While given nothing", () => {
      test("should respond with a 400 status code", async () => {
        const response = await request(app).post("/auth/register").send({});
        expect(response.statusCode).toBe(400);
      });
      test("if error is correct", async () => {
        const response = await request(app).post("/auth/register").send({});
        expect(response.body).toBe(`\"username\" is required`);
      });
    });

    describe("While given only username", () => {
      test("should respond with a 400 status code", async () => {
        const response = await request(app).post("/auth/register").send({
          username: "Shahab",
        });
        expect(response.statusCode).toBe(400);
      });
      test("if error is correct", async () => {
        const response = await request(app).post("/auth/register").send({
          username: "Shahab",
        });
        expect(response.body).toBe(`\"email\" is required`);
      });
    });

    describe("While given username and email", () => {
      test("should respond with a 400 status code", async () => {
        const response = await request(app).post("/auth/register").send({
          username: "Shahab",
          email: "shahab@gmail.com",
        });
        expect(response.statusCode).toBe(400);
      });
      test("if error is correct", async () => {
        const response = await request(app).post("/auth/register").send({
          username: "Shahab",
          email: "shahab@gmail.com",
        });
        expect(response.body).toBe(`\"password\" is required`);
      });
    });

    describe("While email is incorrect", () => {
      test("should respond with a 400 status code", async () => {
        const response = await request(app).post("/auth/register").send({
          username: "Shahab",
          email: "wrong",
        });
        expect(response.statusCode).toBe(400);
      });
      test("if error is correct", async () => {
        const response = await request(app).post("/auth/register").send({
          username: "Shahab",
          email: "wrong",
        });
        expect(response.body).toBe(`\"email\" must be a valid email`);
      });
    });

    describe("While password is shorter than 8 correcters", () => {
      test("should respond with a 400 status code", async () => {
        const response = await request(app).post("/auth/register").send({
          username: "Shahab",
          email: "shahab@gmail.com",
          password: "1234567",
        });
        expect(response.statusCode).toBe(400);
      });
      test("if error is correct", async () => {
        const response = await request(app).post("/auth/register").send({
          username: "Shahab",
          email: "shahab@gmail.com",
          password: "1234567",
        });
        expect(response.body).toBe(
          `\"password\" length must be at least 8 characters long`
        );
      });
    });
  });
});
