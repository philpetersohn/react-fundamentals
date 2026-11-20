import { describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../src/app.js";

describe("employee API", () => {
  it("returns health", async () => {
    const response = await request(app).get("/api/health");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
  });

  it("returns employees", async () => {
    const response = await request(app).get("/api/employees");
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(12);
    expect(response.body[0]).toMatchObject({ id: 1, name: "Alice Johnson" });
  });

  it("returns an employee by id", async () => {
    const response = await request(app).get("/api/employees/2");
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Bob Smith");
  });

  it("rejects an invalid id", async () => {
    expect((await request(app).get("/api/employees/nope")).status).toBe(400);
  });

  it("returns 404 for an unknown employee", async () => {
    expect((await request(app).get("/api/employees/999")).status).toBe(404);
  });
});
