import { test, expect } from '@playwright/test';

test.describe('Footer Navigation', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://localhost:5173/');
  });

  test('Test Back to Top Functionality', async ({ page }) => {

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    const backToTopBtn = page.getByRole('button', { name: 'Back to top ↑' });
    await backToTopBtn.click();
    
    await page.waitForTimeout(500);

    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeLessThan(100);
    console.log('Back to top functionality verified.');
  });
});