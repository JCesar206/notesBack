import request from "supertest";
import app from "../src/server.js";
import db from "../src/config/db.js";

let token;

beforeAll(async () => {
  await db.query("DELETE FROM notes");
  await db.query("DELETE FROM users");

  // crea usuario de prueba
  await request(app)
    .post("/api/auth/register")
    .send({ username: "tester", email: "tester@test.com", password: "123456" });

  const res = await request(app)
    .post("/api/auth/login")
    .send({ email: "tester@test.com", password: "123456" });

  token = res.body.token;
});

afterAll(async () => {
  await db.end();
});

describe("Notes Endpoints", () => {
  test("crear nota", async () => {
    const res = await request(app)
      .post("/api/notes")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Nota test", content: "Contenido test", category: "Test" });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Nota creada con éxito");
  });

  test("listar notas", async () => {
    const res = await request(app)
      .get("/api/notes")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("editar nota", async () => {
    const notas = await request(app)
      .get("/api/notes")
      .set("Authorization", `Bearer ${token}`);
    const id = notas.body[0].id;

    const res = await request(app)
      .put(`/api/notes/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Nota editada", content: "Nuevo contenido" });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Nota actualizada");
  });

  test("eliminar nota", async () => {
    const notas = await request(app)
      .get("/api/notes")
      .set("Authorization", `Bearer ${token}`);
    const id = notas.body[0].id;

    const res = await request(app)
      .delete(`/api/notes/${id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Nota eliminada");
  });
});
