import request from "supertest";
import app from "../app.js";

let refreshToken = "";

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

  describe("POST /login", () => {
    describe("with email and password", () => {
      test("should respond with a 200 status code and has userId, accessToken and refreshToken", async () => {
        const response = await request(app).post("/auth/login").send({
          email: "shahabathar25@gmail.com",
          password: "12345678",
        });

        refreshToken = response.body.refreshToken;

        expect(response.body._id).toBeDefined();
        expect(response.body.accessToken).toBeDefined();
        expect(response.body.refreshToken).toBeDefined();
      });
    });

    describe("while given nothing", () => {
      test("should return status code of 400", async () => {
        const response = await request(app).post("/auth/login").send({});
        expect(response.statusCode).toBe(400);
      });

      test("if error is correct", async () => {
        const response = await request(app).post("/auth/login").send({});
        expect(response.body).toBe(`\"email\" is required`);
      });
    });

    describe("while given only email", () => {
      test("should return status code of 400", async () => {
        const response = await request(app).post("/auth/login").send({
          email: "shahab@gmail.com",
        });
        expect(response.statusCode).toBe(400);
      });

      test("if error is correct", async () => {
        const response = await request(app).post("/auth/login").send({
          email: "shahab@gmail.com",
        });
        expect(response.body).toBe(`\"password\" is required`);
      });
    });

    describe("while email is incorrect", () => {
      test("should return status code of 404", async () => {
        const response = await request(app).post("/auth/login").send({
          email: "wrong",
          password: "12345678",
        });
        expect(response.statusCode).toBe(404);
      });

      test("if error is correct", async () => {
        const response = await request(app).post("/auth/login").send({
          email: "wrong",
          password: "12345678",
        });
        expect(response.body).toBe(`Invalid email or password`);
      });
    });

    describe("while password is incorrect", () => {
      test("should return status code of 404", async () => {
        const response = await request(app).post("/auth/login").send({
          email: "shahabathar25@gmail.com",
          password: "wrong",
        });
        expect(response.statusCode).toBe(404);
      });

      test("if error is correct", async () => {
        const response = await request(app).post("/auth/login").send({
          email: "shahabathar25@gmail.com",
          password: "wrong",
        });
        expect(response.body).toBe(`Invalid email or password`);
      });
    });
  });

  describe("POST /refresh", () => {
    describe("while refresh token is correct", () => {
      test("should return status code of 200 and accessToken", async () => {
        const response = await request(app).post("/auth/refresh").send({
          token: refreshToken,
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.accessToken).toBeDefined();
      });
    });
    describe("while given nothing", () => {
      test("should return status code of 400", async () => {
        const response = await request(app).post("/auth/refresh").send({});
        expect(response.statusCode).toBe(400);
      });
      test("if error is correct", async () => {
        const response = await request(app).post("/auth/refresh").send({});
        expect(response.body).toBe("No token provided");
      });
    });
    describe("while token is incorrect and is not in database", () => {
      test("should return status code of 403", async () => {
        const response = await request(app).post("/auth/refresh").send({
          token: "wrong",
        });
        expect(response.statusCode).toBe(403);
      });
      test("if error is correct", async () => {
        const response = await request(app).post("/auth/refresh").send({
          token: "wrong",
        });
        expect(response.body).toBe("token is incorrect");
      });
    });
  });

  describe("POST /logout", () => {
    describe("while refresh token is correct", () => {
      test("should return status code of 200 and accessToken", async () => {
        const response = await request(app).delete("/auth/logout").send({
          token: refreshToken,
        });
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe("Successfully logged out");
      });
    });
  });
});
