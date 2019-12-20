const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  await page.goto('https://lncn.org/', {waitUntil: 'networkidle2'});
  const btns = await page.$$('div.ssrwrap > div > div > div > div > button')
  let list = []
  for (btn of btns){
    await btn.click()
    const lk = await page.waitForResponse(respond => respond)
    await page.waitFor(500)
    list.push(await lk.text())
  }
  console.log(list)
  await browser.close();
})();

