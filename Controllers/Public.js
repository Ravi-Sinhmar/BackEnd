const puppeteer =require("puppeteer");
const openInsta=async()=>{
    const browser = await puppeteer.launch({
        ...(process.env.NODE_ENV !== 'production' && { headless: false }),
        // userDataDir: './user_data',
        
        args: [
          "--disable-setuid-sandbox",
          "--no-sandbox",
          "--no-zygote",
        ],
      });
    
      const page = await browser.newPage();
      const iPhone = puppeteer.KnownDevices['iPhone 14 Pro Max'];
      await page.emulate(iPhone);
      await page.goto(`https://www.instagram.com`);
    
      
  
        // Wait for the span element to be available (you may need to adjust the selector)
        await page.waitForSelector('div'); // Replace with the appropriate selector
    
        // Use page.evaluate to get the inner text of the span
        const innerText = await page.evaluate(() => {
            const spanElement = document.querySelector('div'); // Use the appropriate selector
            return spanElement ? spanElement.innerText : null; // Return inner text or null if not found
        });
    
        console.log('Inner Text of the Span:', innerText);
    
      

}

module.exports = {openInsta}
