import { test, expect } from '@playwright/test';

test.describe('Navigation Tabs', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('https://localhost:5173/');
  });

  test('Test Experience Tab', async ({ page }) => {
    await page.getByRole('button', { name: 'Experience' }).click();
    await expect(page.getByText('Full Stack Developer').first()).toBeVisible();
    console.log('Experience tab tested successfully.');
  });

  test('Test Education Tab', async ({ page }) => {
    await page.getByRole('button', { name: 'Education' }).click();
    await expect(page.getByText('Bachelor').first()).toBeVisible();
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

  test('Test Contact Tab', async ({ page }) => {
    await page.getByRole('button', { name: 'Contact' }).click();
    await expect(page.getByText('Email').first()).toBeVisible();

    const [linkedInPage] = await Promise.all([
      page.waitForEvent('popup'),
      page.getByRole('button', { name: 'LinkedIn Profile' }).click()
    ]);
    await expect(linkedInPage).toHaveURL(/linkedin\.com/);
    await linkedInPage.close();
    console.log('LinkedIn link verified.');
    console.log('Contact tab tested successfully.');

    const [gitHubPage] = await Promise.all([
      page.waitForEvent('popup'),
      page.getByRole('button', { name: 'GitHub Profile' }).click()
    ]);
    await expect(gitHubPage).toHaveURL(/github\.com/);
    await gitHubPage.close();
    console.log('GitHub link verified.');
  });
  
});