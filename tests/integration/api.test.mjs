import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

test("API protege listagens e registra consentimento", async (t) => {
  const temporaryDirectory = await mkdtemp(path.join(tmpdir(), "doeja-api-"));
  process.env.DATABASE_PATH = path.join(temporaryDirectory, "database.db");

  const require = createRequire(import.meta.url);
  const sqlite3 = require("sqlite3").verbose();
  const legacyDatabase = new sqlite3.Database(process.env.DATABASE_PATH);
  await new Promise((resolve, reject) => {
    legacyDatabase.exec(
      `
        CREATE TABLE doadores (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nome TEXT NOT NULL,
          email TEXT NOT NULL,
          telefone TEXT,
          cidade TEXT,
          observacoes TEXT
        );
        CREATE TABLE beneficiarios (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nome TEXT NOT NULL,
          cpf TEXT NOT NULL,
          telefone TEXT,
          endereco TEXT,
          familia_tamanho INTEGER,
          necessidade TEXT
        );
        INSERT INTO doadores (nome, email) VALUES ('Registro legado', 'legado@example.com');
        INSERT INTO beneficiarios (nome, cpf) VALUES ('Registro legado', '00000000000');
      `,
      (error) => (error ? reject(error) : resolve()),
    );
  });
  await new Promise((resolve, reject) => {
    legacyDatabase.close((error) => (error ? reject(error) : resolve()));
  });

  const app = require("../../dist/app.js").default;
  const db = require("../../dist/db/database.js").default;
  const { initializeDatabase } = require("../../dist/migrations/init.js");

  await initializeDatabase();
  const legacyDonors = await db.all(
    "SELECT nome, consentimento FROM doadores WHERE email = ?",
    ["legado@example.com"],
  );
  const legacyBeneficiaries = await db.all(
    "SELECT nome, consentimento FROM beneficiarios WHERE cpf = ?",
    ["00000000000"],
  );
  assert.deepEqual(legacyDonors, [
    { nome: "Registro legado", consentimento: 0 },
  ]);
  assert.deepEqual(legacyBeneficiaries, [
    { nome: "Registro legado", consentimento: 0 },
  ]);

  const server = app.listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  const address = server.address();
  assert.ok(address && typeof address === "object");
  const baseUrl = `http://127.0.0.1:${address.port}`;

  t.after(async () => {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
    await db.close();
    delete process.env.DATABASE_PATH;
    await rm(temporaryDirectory, { recursive: true, force: true });
  });

  for (const endpoint of ["doadores", "beneficiarios"]) {
    const response = await fetch(`${baseUrl}/api/${endpoint}`);
    assert.equal(response.status, 405);
    assert.deepEqual(await response.json(), {
      error: "Consulta pública não disponível.",
    });
  }

  const withoutConsent = await fetch(`${baseUrl}/api/doadores`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome: "Ana", email: "ana@example.com" }),
  });
  assert.equal(withoutConsent.status, 400);
  assert.deepEqual(await withoutConsent.json(), {
    error: "O consentimento é obrigatório.",
  });

  const donorResponse = await fetch(`${baseUrl}/api/doadores`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nome: "Ana",
      email: "ana@example.com",
      consentimento: true,
    }),
  });
  assert.equal(donorResponse.status, 201);
  const donor = await donorResponse.json();
  assert.equal(donor.consentimento, true);
  assert.match(donor.consentido_em, /^\d{4}-\d{2}-\d{2}T/);

  const beneficiaryResponse = await fetch(`${baseUrl}/api/beneficiarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nome: "Bruno",
      cpf: "52998224725",
      consentimento: true,
    }),
  });
  assert.equal(beneficiaryResponse.status, 201);

  const donorRows = await db.all(
    "SELECT consentimento, consentido_em FROM doadores",
  );
  const beneficiaryRows = await db.all(
    "SELECT consentimento, consentido_em FROM beneficiarios",
  );
  const consentedDonor = donorRows.find(
    ({ consentimento }) => consentimento === 1,
  );
  const consentedBeneficiary = beneficiaryRows.find(
    ({ consentimento }) => consentimento === 1,
  );
  assert.match(consentedDonor.consentido_em, /^\d{4}-\d{2}-\d{2}T/);
  assert.match(consentedBeneficiary.consentido_em, /^\d{4}-\d{2}-\d{2}T/);
});
