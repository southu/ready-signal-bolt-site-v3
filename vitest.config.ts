import { defineConfig } from 'vitest/config';

// Scope vitest to unit tests under src/. The test-evidence/ directory holds
// Playwright specs (run separately) which vitest must not try to load.
export default defineConfig({
  test: {
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
});
