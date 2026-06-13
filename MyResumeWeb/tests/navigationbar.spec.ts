import { test, expect } from '@playwright/test';

test.describe('Navigation Tabs', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('https://localhost:5173/');
  });

  test('Test Experience Tab', async ({ page }) => {
    await page.getByRole('button', { name: 'Experience' }).click();
    await expect(page.getByText('Responsibilities').first()).toBeVisible();
    console.log('Experience tab tested successfully.');
  });

  test('Test Education Tab', async ({ page }) => {
    await page.getByRole('button', { name: 'Education' }).click();
    await expect(page.getByText('Institution').first()).toBeVisible();
    console.log('Education tab tested successfully.');
  });

  test('Test Certification Tab', async ({ page }) => {
    await page.getByRole('button', { name: 'Certification' }).click();
    await expect(page.getByText('Certificate ID').first()).toBeVisible();
    console.log('Certification tab tested successfully.');
  });

  test('Test Projects Tab', async ({ page }) => {
    await page.getByRole('button', { name: 'Projects' }).click();
    await expect(page.getByText('Azure').first()).toBeVisible();
    console.log('Projects tab tested successfully.');
  });
});