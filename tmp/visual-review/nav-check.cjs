const { chromium } = require('C:/Users/chantal/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
(async () => {
 const browser = await chromium.launch({channel:'chrome',headless:true});
 const page = await browser.newPage({viewport:{width:1252,height:800}});
 await page.goto('http://localhost:3000',{waitUntil:'networkidle'});
 await page.evaluate(()=>document.fonts.ready);
 await page.screenshot({path:'tmp/visual-review/navbar.png',clip:{x:0,y:0,width:1252,height:108}});
 console.log(await page.locator('header').evaluate(header => ({height:header.getBoundingClientRect().height,joinBackground:getComputedStyle(header.querySelector('a[href="/register"]')).backgroundColor,signInVisible:header.querySelector('button').getBoundingClientRect().width>0})));
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
