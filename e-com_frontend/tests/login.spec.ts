import { test, expect } from "@playwright/test";

const USER_EMAIL = "xyz@gmail.com";
const USER_PASSWORD = "123456";
const PRODUCTS_API = "http://localhost:3000/";

test.beforeEach(async ({ page }) => {
  await page.goto("/login");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test("user login with valid credentials redirects to home", async ({
  page,
}) => {
  await page.getByPlaceholder("Enter your email").fill(USER_EMAIL);
  await page.getByPlaceholder("Enter your password").fill(USER_PASSWORD);
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL(PRODUCTS_API);
  await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();

  const token = await page.evaluate(() => localStorage.getItem("token"));
  expect(token).not.toBeNull();
});

test("invalid password keeps user on login page", async ({ page }) => {
  await page.getByPlaceholder("Enter your email").fill("xyz@gmail.com");
  await page.getByPlaceholder("Enter your password").fill("wrong123");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL(/\/login$/);
  const token = await page.evaluate(() => localStorage.getItem("token"));
  expect(token).toBeNull();
});

test("invalid email format shows validation error", async ({ page }) => {
  await page.getByPlaceholder("Enter your email").fill("abc@test");
  await page.getByPlaceholder("Enter your password").fill("123456");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(
    page.getByText("Please enter a valid email address"),
  ).toBeVisible();
});

test("empty fields show validation errors", async ({ page }) => {
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByText("Email is required")).toBeVisible();
  await expect(page.getByText("Password is required")).toBeVisible();
});

test("short password shows validation error", async ({ page }) => {
  await page.getByPlaceholder("Enter your email").fill("xyz@gmail.com");
  await page.getByPlaceholder("Enter your password").fill("123");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(
    page.getByText("Password must be at least 6 characters"),
  ).toBeVisible();
});
