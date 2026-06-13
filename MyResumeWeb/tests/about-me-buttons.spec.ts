import { test, expect } from '@playwright/test';

test.describe('Profile Links and Resume', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://localhost:5173/');
  });

  test('Test LinkedIn Link', async ({ page }) => {
    const [linkedInPage] = await Promise.all([
      page.waitForEvent('popup'),
      page.getByRole('button', { name: 'LinkedIn Profile' }).click()
    ]);
    await expect(linkedInPage).toHaveURL(/linkedin\.com/);
    await linkedInPage.close();
    console.log('LinkedIn link verified.');
  });

  test('Test GitHub Link', async ({ page }) => {
    const [gitHubPage] = await Promise.all([
      page.waitForEvent('popup'),
      page.getByRole('button', { name: 'GitHub Profile' }).click()
    ]);
    await expect(gitHubPage).toHaveURL(/github\.com/);
    await gitHubPage.close();
    console.log('GitHub link verified.');
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