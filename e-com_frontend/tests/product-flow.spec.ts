import { test, expect } from "@playwright/test";

const PRODUCTS_API = "${process.env.REACT_APP_API_URL}/api/products";

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: { rate: number; count: number };
};

function flattenProducts(
  data: Record<string, Record<string, Product[]>>,
): Product[] {
  return Object.values(data).flatMap((subCats) =>
    Object.values(subCats).flat(),
  );
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("search product shows results", async ({ page, request }) => {
  const res = await request.get(PRODUCTS_API);
  expect(res.ok()).toBeTruthy();

  const data = await res.json();
  const allProducts = flattenProducts(data);
  expect(allProducts.length).toBeGreaterThan(0);

  const target = allProducts.find((p) => p.title.includes("Samsung"));
  if (!target) throw new Error("Target product not found");

  const searchTerm = target.title;

  await page.getByPlaceholder("Search for products...").fill(searchTerm);

  await expect(page.getByText(`Results for "${searchTerm}"`)).toBeVisible();
  await expect(
    page.locator(`a[href="/product/${target.id}"]`).first(),
  ).toBeVisible();
});

test("search -> navigate to product details page", async ({
  page,
  request,
}) => {
  const res = await request.get(PRODUCTS_API);
  expect(res.ok()).toBeTruthy();

  const data = await res.json();
  const allProducts = flattenProducts(data);
  const target = allProducts.find((p) => p.title.includes("Samsung"));
  if (!target) throw new Error("Target product not found");

  await page.getByPlaceholder("Search for products...").fill(target.title);
  await expect(
    page.locator(`a[href="/product/${target.id}"]`).first(),
  ).toBeVisible();

  await page.locator(`a[href="/product/${target.id}"]`).first().click();

  await expect(page).toHaveURL(`http://localhost:3000/product/${target.id}`);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    target.title,
  );
});

test("product details -> add to cart -> cart contains item", async ({
  page,
  request,
}) => {
  const res = await request.get(PRODUCTS_API);
  expect(res.ok()).toBeTruthy();

  const data = await res.json();
  const allProducts = flattenProducts(data);
  const target = allProducts.find((p) => p.title.includes("Samsung"));
  if (!target) throw new Error("Target product not found");

  await page.goto(`/product/${target.id}`);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    target.title,
  );

  await page.getByRole("button", { name: "Add to Cart" }).click();

  await page.getByRole("link", { name: /Cart \(/ }).click();
  await expect(page).toHaveURL("http://localhost:3000/cart");
  await expect(page.getByRole("heading", { name: /Your Cart/i })).toBeVisible();
  await expect(page.getByText(target.title)).toBeVisible();
});
