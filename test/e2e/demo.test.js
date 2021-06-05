const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();
  await page.goto('https://npm-demos.appspot.com/@polymer/paper-input@3.0.1/demo/index.html', {waitUntil: 'networkidle2'});
  const input = await page.evaluateHandle(`document.querySelector('body > div > demo-snippet:nth-child(2) > paper-input:nth-child(2)').shadowRoot.querySelector('#input-2 > input')`);
  await input.focus();
  await input.type('.foo', 'woof woof!');
//  await browser.close();
})();