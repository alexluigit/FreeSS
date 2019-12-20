import puppeteer from 'puppeteer';
import fs from 'fs';
(async () => {
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  await page.goto('https://lncn.org/', {waitUntil: 'networkidle2'});
  const btns = await page.$$('div.ssrwrap > div > div > div > div > button')
  let list = []
  for (let btn of btns){
    await btn.click()
    const lk = await page.waitForResponse(respond => respond)
    await page.waitFor(500)
    list.push(await lk.text())
  }
  fs.writeFile('list.txt', list.join('\n'), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
  await browser.close();
})();

