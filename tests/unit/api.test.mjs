import assert from "node:assert/strict";
import test from "node:test";

import { ApiError, fetchJson } from "../../public/scripts/api.mjs";

test("fetchJson trata sucesso, erros HTTP, resposta inválida e falha de rede", async (t) => {
  const originalFetch = globalThis.fetch;
  t.after(() => {
    globalThis.fetch = originalFetch;
  });

  await t.test("retorna JSON em respostas válidas", async () => {
    globalThis.fetch = async () =>
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    assert.deepEqual(await fetchJson("/teste"), { ok: true });
  });

  for (const status of [400, 500]) {
    await t.test(`normaliza erro ${status}`, async () => {
      globalThis.fetch = async () =>
        new Response(JSON.stringify({ error: `Falha ${status}` }), {
          status,
          headers: { "content-type": "application/json" },
        });
      await assert.rejects(fetchJson("/teste"), (error) => {
        assert.ok(error instanceof ApiError);
        assert.equal(error.status, status);
        assert.equal(error.message, `Falha ${status}`);
        return true;
      });
    });
  }

  await t.test("rejeita resposta sem JSON", async () => {
    globalThis.fetch = async () => new Response("texto", { status: 200 });
    await assert.rejects(fetchJson("/teste"), /resposta inválida/i);
  });

  await t.test("normaliza falha de conexão", async () => {
    globalThis.fetch = async () => {
      throw new TypeError("offline");
    };
    await assert.rejects(fetchJson("/teste"), /conectar ao servidor/i);
  });
});
