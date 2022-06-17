import request from "supertest";
import app from "../app.js";

describe("ENDPOINT /faculty", () => {
  describe("POST /", () => {
    describe("while all conditions are met", () => {
      test("should return status of 200 and userId", async () => {
        const response = await request(app).post("/faculty").send({
          name: "Shahab",
          degree: "Ph.D in All",
          facebook: "NA",
          twitter: "NA",
          linkedin: "NA",
          email: "NA@gmail.com",
          image: "not yet specified",
        });
        expect(response.statusCode).toBe(200);
        expect(response.body._id).toBeDefined();
      });
    });
    describe("while name is not given", () => {
      test("should return status of 400 and userId", async () => {
        const response = await request(app).post("/faculty").send({
          degree: "Ph.D in All",
          facebook: "NA",
          twitter: "NA",
          linkedin: "NA",
          email: "NA@gmail.com",
          image: "not yet specified",
        });
        expect(response.statusCode).toBe(400);
      });
      test("if error is correct", async () => {
        const response = await request(app).post("/faculty").send({
          degree: "Ph.D in All",
          facebook: "NA",
          twitter: "NA",
          linkedin: "NA",
          email: "NA@gmail.com",
          image: "not yet specified",
        });
        expect(response.body).toBe(`\"name\" is required`);
      });
    });
    describe("while degree is not given", () => {
      test("should return status of 400 and userId", async () => {
        const response = await request(app).post("/faculty").send({
          name: "Shahab",
          facebook: "NA",
          twitter: "NA",
          linkedin: "NA",
          email: "NA@gmail.com",
          image: "not yet specified",
        });
        expect(response.statusCode).toBe(400);
      });
      test("if error is correct", async () => {
        const response = await request(app).post("/faculty").send({
          name: "Shahab",
          facebook: "NA",
          twitter: "NA",
          linkedin: "NA",
          email: "NA@gmail.com",
          image: "not yet specified",
        });
        expect(response.body).toBe(`\"degree\" is required`);
      });
    });
    describe("while facebook is not given", () => {
      test("should return status of 400 and userId", async () => {
        const response = await request(app).post("/faculty").send({
          name: "Shahab",
          degree: "Ph.D in All",
          twitter: "NA",
          linkedin: "NA",
          email: "NA@gmail.com",
          image: "not yet specified",
        });
        expect(response.statusCode).toBe(400);
      });
      test("if error is correct", async () => {
        const response = await request(app).post("/faculty").send({
          name: "Shahab",
          degree: "Ph.D in All",
          twitter: "NA",
          linkedin: "NA",
          email: "NA@gmail.com",
          image: "not yet specified",
        });
        expect(response.body).toBe(`\"facebook\" is required`);
      });
    });
    describe("while twitter is not given", () => {
      test("should return status of 400 and userId", async () => {
        const response = await request(app).post("/faculty").send({
          name: "Shahab",
          degree: "Ph.D in All",
          facebook: "NA",
          linkedin: "NA",
          email: "NA@gmail.com",
          image: "not yet specified",
        });
        expect(response.statusCode).toBe(400);
      });
      test("if error is correct", async () => {
        const response = await request(app).post("/faculty").send({
          name: "Shahab",
          degree: "Ph.D in All",
          facebook: "NA",
          linkedin: "NA",
          email: "NA@gmail.com",
          image: "not yet specified",
        });
        expect(response.body).toBe(`\"twitter\" is required`);
      });
    });
    describe("while linkedin is not given", () => {
      test("should return status of 400 and userId", async () => {
        const response = await request(app).post("/faculty").send({
          name: "Shahab",
          degree: "Ph.D in All",
          facebook: "NA",
          twitter: "NA",
          email: "NA@gmail.com",
          image: "not yet specified",
        });
        expect(response.statusCode).toBe(400);
      });
      test("if error is correct", async () => {
        const response = await request(app).post("/faculty").send({
          name: "Shahab",
          degree: "Ph.D in All",
          facebook: "NA",
          twitter: "NA",
          email: "NA@gmail.com",
          image: "not yet specified",
        });
        expect(response.body).toBe(`\"linkedin\" is required`);
      });
    });
    describe("while email is not given", () => {
      test("should return status of 400 and userId", async () => {
        const response = await request(app).post("/faculty").send({
          name: "Shahab",
          degree: "Ph.D in All",
          facebook: "NA",
          twitter: "NA",
          linkedin: "NA",
          image: "not yet specified",
        });
        expect(response.statusCode).toBe(400);
      });
      test("if error is correct", async () => {
        const response = await request(app).post("/faculty").send({
          name: "Shahab",
          degree: "Ph.D in All",
          facebook: "NA",
          twitter: "NA",
          linkedin: "NA",
          image: "not yet specified",
        });
        expect(response.body).toBe(`\"email\" is required`);
      });
    });
    describe("while image is not given", () => {
      test("should return status of 400 and userId", async () => {
        const response = await request(app).post("/faculty").send({
          name: "Shahab",
          degree: "Ph.D in All",
          facebook: "NA",
          twitter: "NA",
          linkedin: "NA",
          email: "NA@gmail.com",
        });
        expect(response.statusCode).toBe(400);
      });
      test("if error is correct", async () => {
        const response = await request(app).post("/faculty").send({
          name: "Shahab",
          degree: "Ph.D in All",
          facebook: "NA",
          twitter: "NA",
          linkedin: "NA",
          email: "NA@gmail.com",
        });
        expect(response.body).toBe(`\"image\" is required`);
      });
    });
    describe("while given nothing", () => {
      test("should return status of 400 and userId", async () => {
        const response = await request(app).post("/faculty").send({});
        expect(response.statusCode).toBe(400);
      });
      test("if error is correct", async () => {
        const response = await request(app).post("/faculty").send({});
        expect(response.body).toBe(`\"name\" is required`);
      });
    });
  });
});
