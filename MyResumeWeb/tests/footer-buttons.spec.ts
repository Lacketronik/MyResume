import { test, expect } from '@playwright/test';

test.describe('Footer Navigation', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://localhost:5173/');
  });

  test('Test Footer Links', async ({ page }) => {
  const footerLinks = page.getByRole('contentinfo').getByRole('link');

  const firstLink = footerLinks.nth(1);
  const isFirstNewTab = await firstLink.getAttribute('target') === '_blank';

  if (isFirstNewTab) {
    const [page1] = await Promise.all([page.waitForEvent('popup'), firstLink.click()]);
    await expect(page1).toHaveURL(/github\.com/);
    await page1.close();
  } else {
    await firstLink.click();
    await expect(page).toHaveURL(/github\.com/);
    await page.goBack();
  }
  console.log('First footer link verified.');

  const secondLink = footerLinks.nth(2);
  const isSecondNewTab = await secondLink.getAttribute('target') === '_blank';

  if (isSecondNewTab) {
    const [page2] = await Promise.all([page.waitForEvent('popup'), secondLink.click()]);
    await expect(page2).toHaveURL(/linkedin\.com/);
    await page2.close();
  } else {
    await secondLink.click();
    await expect(page).toHaveURL(/linkedin\.com/);
    await page.goBack();
  }
  console.log('Second footer link verified.');
});
});