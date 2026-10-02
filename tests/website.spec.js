import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("responsive layout, images, internal links and accessible content", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => {
    if (response.status() >= 400) errors.push(response.url());
  });
  for (const width of [360, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all(
        [...document.querySelectorAll("img[src]")].map((img) => {
          img.loading = "eager";
          return img.decode();
        }),
      );
    });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    expect(
      await page
        .locator('a[href^="#"]')
        .evaluateAll((links) =>
          links.every((link) => document.getElementById(link.hash.slice(1))),
        ),
    ).toBe(true);
  }
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => (document.documentElement.style.fontSize = "200%"));
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  expect(errors).toEqual([]);
});

test("mobile navigation opens, follows links and closes with Escape", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const button = page.getByRole("button", { name: "Menú" });
  const navigation = page.getByRole("navigation", {
    name: "Navegación principal",
  });
  await button.click();
  await expect(button).toHaveAttribute("aria-expanded", "true");
  await navigation.getByRole("link", { name: "Clases", exact: true }).click();
  await expect(page).toHaveURL(/#clases$/);
  await expect(navigation).toBeHidden();
  await button.click();
  await page.keyboard.press("Escape");
  await expect(navigation).toBeHidden();
  await expect(button).toBeFocused();
});

test("photo enlargement supports keyboard, closing and focus return", async ({
  page,
}) => {
  await page.goto("/");
  const link = page.locator(".gallery-link").first();
  await link.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.locator("img")).toHaveAttribute(
    "alt",
    /Grupo de personas/,
  );
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(link).toBeFocused();
  await link.click();
  await page.getByRole("button", { name: "Cerrar fotografía" }).click();
  await expect(dialog).toBeHidden();
  await expect(page.locator("body")).not.toHaveClass(/photo-open/);
});

test("contact planner prepares selected preferences without sending a message", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .locator("#class-type")
    .selectOption({ label: "Sesiones individuales" });
  await page.locator("#class-time").selectOption({ label: "Por la tarde" });
  await page.route("https://wa.me/**", (route) =>
    route.fulfill({ body: "Destination intercepted by test" }),
  );
  await page
    .getByRole("button", { name: "Preparar consulta por WhatsApp" })
    .click();
  await page.waitForURL("https://wa.me/**");
  const destination = new URL(page.url());
  expect(destination.pathname).toBe("/34639532865");
  expect(destination.searchParams.get("text")).toContain(
    "Sesiones individuales",
  );
  expect(destination.searchParams.get("text")).toContain("Por la tarde");
});

test("navigation, contact and FAQ remain usable without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173");
  await expect(
    page.getByRole("navigation", { name: "Navegación principal" }),
  ).toBeVisible();
  await expect(page.locator(".contact-copy > a")).toBeVisible();
  await page.locator(".faq-list summary").first().click();
  await expect(page.locator(".faq-list details[open]")).toHaveCount(1);
  await expect(page.locator(".gallery-link").first()).toHaveAttribute(
    "href",
    /\.webp$/,
  );
  await context.close();
});
