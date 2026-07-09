import { test, expect } from '@playwright/test';

test.describe('Profile Links and Resume', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://localhost:5173/');
  });

  test('Test Resume Download', async ({ page }) => {
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.getByRole('button', { name: 'Download Resume' }).click()
    ]);
    expect(download.suggestedFilename()).toContain('.pdf');
    console.log('Resume download verified.');
  });

  test('Test View Resume', async ({ page }) => {
    const [viewResumePage] = await Promise.all([
      page.waitForEvent('popup'),
      page.getByRole('button', { name: 'View Resume' }).click()
    ]);
    await expect(viewResumePage).not.toBeNull();
    await viewResumePage.close();
    console.log('View Resume popup verified.');
  });
});