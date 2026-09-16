const { chromium } = require('C:/Users/chantal/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const [name, width, height] of [['desktop',1440,930],['mobile',390,844],['small-mobile',320,740]]) {
    await page.setViewportSize({ width, height });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `tmp/visual-review/${name}.png`, fullPage: true });
    console.log(name, await page.evaluate(() => ({ overflow: document.documentElement.scrollWidth > innerWidth, color: getComputedStyle(document.querySelector('h1')).color, font: getComputedStyle(document.querySelector('h1')).fontFamily, button: getComputedStyle(document.querySelector('.button-primary')).backgroundColor, root: getComputedStyle(document.documentElement).getPropertyValue('--forest') })));
  }
  await page.getByRole('link', { name: 'Join network' }).first().click();
  await page.waitForURL('**/register');
  console.log('Registration navigation passed', await page.getByRole('heading', { name: 'Create your account' }).isVisible());
  await page.screenshot({path:'tmp/visual-review/register.png',fullPage:true});
  console.log('Page errors:', errors);
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
