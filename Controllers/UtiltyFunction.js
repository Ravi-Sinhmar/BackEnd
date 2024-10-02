const puppeteer =require("puppeteer");
const GoInstagram=async()=>{
    const browser = await puppeteer.launch({
        ...(process.env.NODE_ENV !== 'production' && { headless: false }),
        userDataDir: './user_data',
        args: [
          "--disable-setuid-sandbox",
          "--no-sandbox",
          "--no-zygote",
        ],
      });
    
      const page = await browser.newPage();
      const iPhone = puppeteer.KnownDevices['iPhone 14 Pro Max'];
      await page.emulate(iPhone);
      await page.goto("https://www.instagram.com/accounts/login/?next=%2F&source=mobile_nav");
      return {page , browser};
}

async function handleDialogBox(page, buttonText) {
    // await page.waitForNavigation({ waitUntil: "networkidle0" }); 
await page.waitForSelector("div[role='button'], a, button")
  
    await page.evaluate((buttonText) => {
      const buttons = document.querySelectorAll('div[role="button"], a, button');
      const targetButton = Array.from(buttons).find(
        (button) =>
          button.textContent.toLowerCase().replace(/ /g, '').includes(buttonText.toLowerCase())
      );
  
      if (targetButton) {
        console.log(targetButton);
        targetButton.click();
      } else {
        console.log("Hey!!!!");
        console.log(`The "${buttonText}" button was not found or does not have the expected text.`);
      }
    }, buttonText);
    
  }
module.exports={GoInstagram,handleDialogBox};