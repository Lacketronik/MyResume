import { test, expect } from '@playwright/test';

test.describe('MyResume Project Accordion', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://localhost:5173/');
    console.log('Navigated to localhost.');
    
    console.log('Starting project card test setup.');
    const projectBtn = page.getByRole('button', { name: 'Azure-Status - Daily Infrastructure Reporting' });
    await projectBtn.click();
    await expect(page.getByText('Description').nth(1)).toBeVisible();
    console.log('Project button clicked & main accordion expanded.');
  });

  test('Test Project Card Functionality - Details & PDF Download', async ({ page }) => {
    await page.getByRole('button', { name: 'More Details' }).click();
    
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download PDF' }).first().click();
    const download = await downloadPromise;
    
    expect(download.suggestedFilename()).toContain('.pdf');
    console.log('More Details button clicked and PDF download tested.');
    
    await page.getByRole('button', { name: 'Close', exact: true }).click();
    console.log('Modal closed cleanly.');
  });

  test('Test Project Card Functionality - YouTube Iframe', async ({ page }) => {
    const videoFrame = page.frameLocator('iframe[title="YouTube video VKW6Tg94_V4"]');
    await expect(videoFrame.locator('body')).toBeVisible();
    await expect(videoFrame.getByRole('button', { name: /play video/i })).toBeVisible();
    console.log('YouTube iframe loaded successfully.');
  });

  test ('Test Project Card Functionality - Document Download', async ({ page }) => {
    const downloadBtn = page.getByRole('button', { name: 'Download Azure-Status_Doc' });
    await expect(downloadBtn).toBeVisible();
    const downloadPromise = page.waitForEvent('download');
    await downloadBtn.click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toContain('.pdf');
    console.log('Project document download tested.');
  });

  test('Test Project Card Functionality - GitHub External Link', async ({ page }) => {
    const popupPromise = page.waitForEvent('popup');
    await page.getByRole('button', { name: 'View on GitHub' }).click();
    const newPage = await popupPromise;
    
    await expect(newPage).toHaveURL(/github\.com/);
    await newPage.close();
    console.log('GitHub link opened in new tab.');
  });

  test('Test Project Card Functionality - Image Gallery', async ({ page }) => {
    await page.getByRole('button', {
      name: 'get-billing-info'
    }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible({ timeout: 10000 });
    await page.mouse.click(5, 5);
    await expect(dialog).not.toBeVisible({ timeout: 10000 });
    console.log('Image gallery tested.');
  });
});