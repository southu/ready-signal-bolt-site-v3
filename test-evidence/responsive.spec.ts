import { expect, test } from '@playwright/test';

const baseUrl = process.env.TEST_BASE_URL ?? 'http://127.0.0.1:4173';
const screenshotPath =
  process.env.SCREENSHOT_PATH ??
  'test-evidence/screenshots/ai-marketing-data-375-local.png';
const widths = [375, 390, 768, 1280, 1440];

for (const width of widths) {
  test(`campaign layout is contained at ${width}px`, async ({ page, browserName }) => {
    await page.setViewportSize({ width, height: width < 500 ? 667 : 900 });
    await page.goto(`${baseUrl}/ai-marketing-data`, {
      waitUntil: 'networkidle',
    });

    const overflow = await page.evaluate(() => {
      const viewportWidth = window.innerWidth;
      const offenders = [...document.querySelectorAll<HTMLElement>('body *')]
        .filter((element) => {
          const rect = element.getBoundingClientRect();
          return (
            rect.width > 0 &&
            (rect.right > viewportWidth + 0.5 || rect.left < -0.5)
          );
        })
        .map((element) => ({
          tag: element.tagName,
          className: element.className?.toString().slice(0, 100),
          left: element.getBoundingClientRect().left,
          right: element.getBoundingClientRect().right,
        }));

      return {
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        offenders,
      };
    });

    expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth);
    expect(overflow.offenders, JSON.stringify(overflow.offenders)).toEqual([]);

    if (width === 375 && browserName === 'chromium') {
      for (const selector of [
        '#campaign-headline',
        '#campaign-headline + p',
        'a[href="#campaign-form"]',
      ]) {
        const box = await page.locator(selector).last().boundingBox();
        expect(box).not.toBeNull();
        expect(box!.y).toBeGreaterThanOrEqual(0);
        expect(box!.y + box!.height).toBeLessThanOrEqual(667);
      }

      await page.screenshot({
        path: screenshotPath,
      });
    }

    const images = await page.locator('img').evaluateAll((elements) =>
      elements.map((image) => ({
        alt: image.getAttribute('alt'),
        src: image.getAttribute('src'),
      }))
    );
    for (const image of images) {
      expect(image.alt).not.toBeNull();
      if (image.alt === '') {
        const role = await page
          .locator(`img[src="${image.src}"]`)
          .getAttribute('role');
        expect(role).toBe('presentation');
      } else {
        expect(image.alt!.length).toBeGreaterThanOrEqual(5);
        expect(image.alt).not.toMatch(/\.(png|jpe?g|webp|svg)/i);
      }
    }

    if (width === 375 || width === 1280) {
      const form = page.locator('form[data-hubspot-form-id]');
      await expect(form).toBeVisible();
      await expect(form.locator('input')).toHaveCount(4);
      await expect(form.locator('textarea')).toBeVisible();
      await expect(form.locator('button[type="submit"]')).toBeVisible();

      const controls = await form
        .locator('input, textarea, button')
        .evaluateAll((elements) =>
          elements.map((element) => {
            const rect = element.getBoundingClientRect();
            return {
              width: rect.width,
              left: rect.left,
              right: rect.right,
            };
          })
        );
      for (const control of controls) {
        expect(control.width).toBeGreaterThan(40);
        expect(control.left).toBeGreaterThanOrEqual(0);
        expect(control.right).toBeLessThanOrEqual(width);
      }
    }
  });
}

test('home navigation links to the AI marketing data page', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'How It Works' }).hover();

  const campaignLink = page.locator(
    'nav a[href="/ai-marketing-data"], nav a[href="/ai-marketing-data/"]'
  );
  await expect(campaignLink).toHaveCount(1);
  await campaignLink.click();
  await expect(page).toHaveURL(/\/ai-marketing-data\/?$/);
  await expect(page.locator('#campaign-headline')).toBeVisible();
});
