import request from "supertest";
import { initApp } from "../server";
import dotenv from "dotenv";
import { Express } from "express";

dotenv.config();
let app: Express;

beforeAll(async () => {
  console.log("AI: Before all tests");
  app = await initApp();
});

afterAll(() => {
  console.log("AI: After all tests");
});

describe("AI Test", () => {
  test("Try AI connection", async () => {
    const response = await request(app)
      .post("/ai/prompt")
      .set("Content-Type", "application/json")
      .send({
        prompt: "Tell me a joke",
      });
    expect(response.status).toBe(200);
  });

});
