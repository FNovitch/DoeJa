import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("apresenta as duas jornadas sem renderizar listagens", async ({
  page,
}) => {
  const journeys = page.locator(".impact-grid");
  await expect(journeys.getByText("Quero doar", { exact: true })).toBeVisible();
  await expect(
    journeys.getByText("Preciso de apoio", { exact: true }),
  ).toBeVisible();
  await expect(
    page
      .locator("#privacidade")
      .getByText("Esta página não apresenta uma listagem", { exact: false }),
  ).toBeVisible();
  await expect(page.locator("table")).toHaveCount(0);
  await expect(page.locator("body")).not.toContainText("123.456.789-00");
});

test("menu móvel mantém tamanho, estado ARIA e retorno de foco", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const toggle = page.locator("#menu-toggle");
  await expect(toggle).toBeVisible();
  const box = await toggle.boundingBox();
  expect(box?.width).toBeGreaterThanOrEqual(44);
  expect(box?.height).toBeGreaterThanOrEqual(44);

  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(toggle).toBeFocused();
});

test("formulário valida campos, impede duplicidade e anuncia sucesso", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Cadastrar como doador" }).click();
  await expect(page.locator("#doador-nome-erro")).toHaveText(
    "Este campo é obrigatório.",
  );
  await expect(page.locator("#doador-nome")).toBeFocused();

  let releaseResponse = () => {};
  const responseGate = new Promise<void>((resolve) => {
    releaseResponse = resolve;
  });
  await page.route("**/api/doadores", async (route) => {
    await responseGate;
    await route.fulfill({
      status: 201,
      contentType: "application/json",
      body: JSON.stringify({
        id: 1,
        nome: "Ana Souza",
        email: "ana@example.com",
        telefone: null,
        cidade: null,
        observacoes: null,
      }),
    });
  });
  await page.locator("#doador-nome").fill("Ana Souza");
  await page.locator("#doador-email").fill("ana@example.com");
  await page.locator("#doador-consentimento").check();
  const submit = page.locator("#form-doador button[type='submit']");
  await submit.click();
  await expect(submit).toBeDisabled();
  releaseResponse();
  await expect(page.locator("#feedback-doador")).toHaveText(
    "Cadastro de doador enviado com sucesso.",
  );
});

test("preserva os dados e apresenta erro de API", async ({ page }) => {
  await page.route("**/api/doadores", (route) =>
    route.fulfill({
      status: 500,
      contentType: "application/json",
      body: JSON.stringify({ error: "Serviço temporariamente indisponível." }),
    }),
  );
  await page.locator("#doador-nome").fill("Ana Souza");
  await page.locator("#doador-email").fill("ana@example.com");
  await page.locator("#doador-consentimento").check();
  await page.getByRole("button", { name: "Cadastrar como doador" }).click();

  await expect(page.locator("#feedback-doador")).toHaveText(
    "Serviço temporariamente indisponível.",
  );
  await expect(page.locator("#doador-nome")).toHaveValue("Ana Souza");
});

test("não possui violações críticas ou sérias de acessibilidade", async ({
  page,
}) => {
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  const blocking = results.violations.filter(({ impact }) =>
    ["critical", "serious"].includes(impact ?? ""),
  );
  expect(blocking).toEqual([]);
});
