import { test, expect, Page } from "@playwright/test";

const USER_EMAIL = "xyz@gmail.com";
const USER_PASSWORD = "123456";
const PRODUCTS_API = "${import.meta.env.VITE_API_URL}/api/products";

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

async function login(page: Page) {
  await page.goto("/login");
  await page.evaluate(() => localStorage.clear());
  await page.reload();

  await page.getByPlaceholder("Enter your email").fill(USER_EMAIL);
  await page.getByPlaceholder("Enter your password").fill(USER_PASSWORD);
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL("http://localhost:3000/");
  await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
}

test("full flow: login -> add product -> cart -> checkout -> place order", async ({
  page,
  request,
}) => {
  await login(page);

  const res = await request.get(PRODUCTS_API);
  expect(res.ok()).toBeTruthy();

  const data = await res.json();
  const allProducts = flattenProducts(data);
  expect(allProducts.length).toBeGreaterThan(0);

  const target = allProducts.find((p) => p.title.includes("Samsung"));
  if (!target) throw new Error("Target product not found");

  await page.goto(`/product/${target.id}`);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    target.title,
  );

  await page.getByRole("button", { name: "Add to Cart" }).click();

  await page.getByRole("link", { name: /Cart \(/ }).click();
  await expect(page).toHaveURL("http://localhost:3000/cart");
  await expect(page.getByText(target.title)).toBeVisible();

  await page.getByRole("link", { name: /Proceed to Checkout/i }).click();
  await expect(page).toHaveURL("http://localhost:3000/checkout");

  await page.getByRole("button", { name: /Proceed to Buy/i }).click();

  await page.getByPlaceholder("Full Name").fill("Test User");
  await page.getByPlaceholder("Mobile Number").fill("9876543210");
  await page
    .getByPlaceholder("House No, Building, Street")
    .fill("221B Baker Street");
  await page.getByPlaceholder("Pincode").fill("411001");
  await page.getByPlaceholder("City").fill("Pune");
  await page.locator("select").selectOption({ label: "Maharashtra" });

  await page.getByRole("button", { name: /Place Order/i }).click();

  await expect(page).toHaveURL("http://localhost:3000/orders");
  await expect(
    page.getByRole("heading", { name: /Your Orders/i }),
  ).toBeVisible();
});
