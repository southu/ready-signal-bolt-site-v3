import { expect, test } from '@playwright/test';

const baseUrl = process.env.TEST_BASE_URL ?? 'http://127.0.0.1:4173';
const signUpUrl = 'https://app.readysignal.com/auth/sign-up';

test('campaign trial CTA stays visible on mobile and reaches sign-up', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(`${baseUrl}/ai-marketing-data`, { waitUntil: 'networkidle' });

  const trialCta = page.getByRole('link', { name: 'Start Free Trial' });
  await expect(trialCta).toBeVisible();
  await expect(trialCta).toHaveAttribute('href', signUpUrl);

  const box = await trialCta.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(375);
  expect(box!.width).toBeGreaterThanOrEqual(44);
  expect(box!.height).toBeGreaterThanOrEqual(44);

  await page.screenshot({
    path: 'test-evidence/screenshots/campaign-cta-mobile-375x812.png',
  });

  await trialCta.click();
  await page.waitForURL(signUpUrl);
  await page.evaluate((destination) => {
    const evidence = document.createElement('div');
    evidence.textContent = `CTA click-through destination reached: ${destination}`;
    evidence.style.cssText =
      'padding:16px;background:#fcb900;color:#404c57;font:700 16px/1.4 system-ui;overflow-wrap:anywhere';
    document.body.prepend(evidence);
  }, page.url());
  await page.screenshot({
    path: 'test-evidence/screenshots/campaign-cta-click-through.png',
  });
});
