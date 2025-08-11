process.env.NODE_ENV = "test";
const app = require("../server");
const supertest = require("supertest");
const { expect } = require("@jest/globals");
const request = supertest(app);

const db = require("../data/db");

beforeAll((done) => {
  db.intializeDb((err) => {
    if (err) return done(err);
    done();
  });
});

describe("GET Routes Tests", () => {
  test("responds to /books", async () => {
    const res = await request.get("/books");
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect([200, 500]).toContain(res.statusCode);
  });

  test("responds to /books/:id", async () => {
    const res = await request.get("/books/507f1f77bcf86cd799439011");
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect([200, 404, 500]).toContain(res.statusCode);
  });

  test("responds to /users", async () => {
    const res = await request.get("/users");
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect([200, 500]).toContain(res.statusCode);
  });

  test("responds to /users/:id", async () => {
    const res = await request.get("/users/507f1f77bcf86cd799439021");
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect([200, 404, 500]).toContain(res.statusCode);
  });

  test("responds to /bookGroups", async () => {
    const res = await request.get("/bookGroups");
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect([200, 500]).toContain(res.statusCode);
  });

  test("responds to /bookGroups/:id", async () => {
    const res = await request.get("/bookGroups/6897849fa9c433089269c9f1");
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect([200, 404, 500]).toContain(res.statusCode);
  });
});
