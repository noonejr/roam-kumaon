import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  use: { baseURL: 'http://localhost:5173' },
  webServer: {
    command: 'npm run dev -- --port 5173 --strictPort',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
  },
  projects: [
    { name: 'desktop-chrome', use: { ...devices['Desktop Chrome'] } },
    { name: 'iphone-se', use: { ...devices['iPhone SE'] } }, // Small iOS screen
    { name: 'iphone-14-pro', use: { ...devices['iPhone 14 Pro Max'] } }, // Large iOS screen
    { name: 'pixel-5', use: { ...devices['Pixel 5'] } }, // Standard Android
    { name: 'galaxy-s9', use: { ...devices['Galaxy S9+'] } }, // Older/Tall Android
  ],
})
