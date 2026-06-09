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

    const videoFrame = page.frameLocator('iframe[title="YouTube video UXQjgVNc6oU"]');
    await expect(videoFrame.locator('body')).toBeVisible();
    await videoFrame.getByRole('button', { name: 'Play video' }).click();
	await videoFrame.getByRole('button', { name: 'Pause video' }).click();
	console.log('Video controls tested.');

	await page.getByRole('button', { name: 'nat-myresume-egress nat-' }).click();
	await page.getByRole('button', { name: 'Next image', exact: true }).click();
	await page.getByRole('button', { name: 'Next image', exact: true }).press('Escape');
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