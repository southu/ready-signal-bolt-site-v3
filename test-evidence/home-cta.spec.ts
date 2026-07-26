import { expect, test, type Page } from '@playwright/test';

const baseUrl = process.env.TEST_BASE_URL ?? 'http://127.0.0.1:5173';
const signUpUrl = 'https://app.readysignal.com/auth/sign-up';

test.use({
  userAgent:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
    '(KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
});

const loadHomeWithoutConsoleErrors = async (
  page: Page,
  width: number,
  height: number,
) => {
  const consoleErrors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') {
      consoleErrors.push(message.text());
    }
  });

  await page.setViewportSize({ width, height });
  await page.goto(baseUrl, { waitUntil: 'load' });
  await page.waitForTimeout(1_000);

  expect(consoleErrors).toEqual([]);
};

test('home CTAs have the exact sign-up destination', async ({ page }) => {
  await loadHomeWithoutConsoleErrors(page, 1440, 900);

  await expect(page.locator('#hero-start-free-trial')).toHaveAttribute(
    'href',
    signUpUrl,
  );
  await expect(page.locator('#secondary-start-free-trial')).toHaveAttribute(
    'href',
    signUpUrl,
  );
});

test('hero CTA is above the fold and tappable on mobile', async ({ page }) => {
  await loadHomeWithoutConsoleErrors(page, 375, 667);

  const heroCta = page.locator('#hero-start-free-trial');
  const box = await heroCta.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(375);
  expect(box!.y).toBeGreaterThanOrEqual(0);
  expect(box!.y + box!.height).toBeLessThanOrEqual(667);
  expect(box!.width).toBeGreaterThanOrEqual(44);
  expect(box!.height).toBeGreaterThanOrEqual(44);

  await page.screenshot({
    path: 'test-evidence/screenshots/home-hero-mobile-above-fold.png',
  });
});

for (const viewport of [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 375, height: 667 },
]) {
  test(`hero CTA navigates to sign-up on ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto(baseUrl, { waitUntil: 'load' });
    await page.screenshot({
      path: `test-evidence/screenshots/home-hero-${viewport.name}-before-click.png`,
    });

    await page.locator('#hero-start-free-trial').click();
    await page.waitForURL(signUpUrl);
    await page.screenshot({
      path: `test-evidence/screenshots/home-hero-${viewport.name}-sign-up.png`,
    });
  });
}

test('secondary CTA navigates to sign-up on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(baseUrl, { waitUntil: 'load' });

  const secondaryCta = page.locator('#secondary-start-free-trial');
  await secondaryCta.scrollIntoViewIfNeeded();
  await page.screenshot({
    path: 'test-evidence/screenshots/home-secondary-desktop-before-click.png',
  });

  await secondaryCta.click();
  await page.waitForURL(signUpUrl);
  await page.screenshot({
    path: 'test-evidence/screenshots/home-secondary-desktop-sign-up.png',
  });
});
