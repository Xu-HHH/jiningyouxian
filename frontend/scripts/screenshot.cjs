// One-off verification: screenshot the local dev site with Playwright + system Chrome
const path = require('path')
const { createRequire } = require('node:module')
const bundledRequire = createRequire(
  'C:/Users/XuHh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/x'
)
const { chromium } = bundledRequire('playwright')

const OUT = 'C:/Users/XuHh/.codex/visualizations/2026/10/01/01a0f673-f2de-7791-a221-b2563e55e7fe'

;(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: true
  })
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle', timeout: 30000 })
  await page.waitForTimeout(900)
  await page.screenshot({ path: path.join(OUT, 'shot-desktop-hero.png') })
  await page.evaluate(() => document.getElementById('features').scrollIntoView())
  await page.waitForTimeout(400)
  await page.screenshot({ path: path.join(OUT, 'shot-desktop-features.png') })
  await page.evaluate(() => document.querySelector('.site-footer').scrollIntoView())
  await page.waitForTimeout(300)
  await page.screenshot({ path: path.join(OUT, 'shot-desktop-footer.png') })

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } })
  await mobile.goto('http://localhost:5174/', { waitUntil: 'networkidle', timeout: 30000 })
  await mobile.waitForTimeout(600)
  await mobile.screenshot({ path: path.join(OUT, 'shot-mobile-hero.png') })

  await browser.close()
  console.log('screenshots done')
})().catch((err) => {
  console.error(err)
  process.exit(1)
})
