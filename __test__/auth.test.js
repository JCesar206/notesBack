import request from "supertest";
import app from "../src/server.js"; // importa tu server principal
import db from "../src/config/db.js";

beforeAll(async () => {
  await db.query("DELETE FROM users"); // limpia tabla antes de tests
});

afterAll(async () => {
  await db.end(); // cerrar conexión
});

describe("Auth Endpoints", () => {
  test("registro exitoso", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ username: "julio", email: "julio@test.com", password: "123456" });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Usuario registrado con éxito");
  });

  test("login exitoso", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "julio@test.com", password: "123456" });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  test("login con credenciales inválidas", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "fake@test.com", password: "wrong" });
    expect(res.statusCode).toBe(401);
  });
});
