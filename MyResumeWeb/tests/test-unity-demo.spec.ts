import { test, expect } from '@playwright/test';

test.describe('Unity Demo Interaction', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://localhost:5173/');
  });

  test('Test Unity Demo Interaction', async ({ page }) => {
    await page.getByRole('button', { name: 'Smart AI Steering Car -' }).click();
    await page.getByRole('button', { name: 'Play Demo' }).click();

    const gameFrame = page.frameLocator('iframe[title="Project Demo 1"]')
                          .frameLocator('#game_drop');
    
    const canvas = gameFrame.locator('#unity-canvas');

    await expect(canvas).toBeVisible();

    await canvas.click({ position: { x: 521, y: 295 } });
    await canvas.press('Escape');

    await page.getByRole('button', { name: '✕ Close Demo' }).click();
    console.log('Unity demo interaction and close verified.');
  });
});