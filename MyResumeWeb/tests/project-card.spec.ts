import { test, expect } from '@playwright/test';

test.describe('MyResume Project Accordion', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://localhost:5173/');
  });

  test('Test Project Card Functionality', async ({ page }) => {
    
    console.log('Starting project card test.');

    const projectBtn = page.getByRole('button', { name: 'MyResume - Modern Cloud-native Portfolio' });
    await projectBtn.click();
    await expect(page.getByText('Description').first()).toBeVisible();
    console.log('Project button clicked.');

    await page.getByRole('button', { name: 'More Details' }).click();
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.getByRole('button', { name: 'Download PDF' }).first().click()
    ]);
    expect(download.suggestedFilename()).toContain('.pdf');
    console.log('More Details button clicked and PDF download tested.');
	
	  await page.getByRole('button', { name: 'Close', exact: true }).click();

    const videoFrame = page.frameLocator(
      'iframe[title="YouTube video UXQjgVNc6oU"]'
    );
    await expect(videoFrame.locator('body')).toBeVisible();
    await expect(
      videoFrame.getByRole('button', { name: /play video/i })
    ).toBeVisible();

    console.log('YouTube iframe loaded successfully.');

    await page.getByRole('button', { name: 'nat-myresume-egress nat-' }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    const nextButton = dialog
      .locator('button[aria-label*="Next"], button[title*="Next"]')
      .first();
    await expect(nextButton).toBeVisible({ timeout: 10000 });
    await nextButton.click();
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
    console.log('Image carousel tested.');
    
    const [download1] = await Promise.all([
        page.waitForEvent('download'),
        page.getByRole('button', { name: 'Download MyResume_Phase01_Doc' }).click()
    ]);
    expect(download1.suggestedFilename()).toContain('.pdf');
    console.log('Project document download tested.');

    const [newPage] = await Promise.all([
      page.waitForEvent('popup'),
      page.getByRole('button', { name: 'View on GitHub' }).click()
    ]);
    await expect(newPage).toHaveURL(/github\.com/);
    await newPage.close();
    console.log('GitHub link opened in new tab.');
  });
});