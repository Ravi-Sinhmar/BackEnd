const post = async (username, num, page) => {
    try {
        await page.goto(`https://www.instagram.com/${username}`);
       if(num===0 || !num){
        num = 1;
       }
        const myValues = {
            username: username,
            num: num,
        };

        let main = await page.waitForSelector('main');
        await page.waitForSelector('header');

        // Evaluate the scrolling and collecting function in the page context
        const allPosts = await page.evaluate(async (values) => {
            const mainF = document.querySelector('main');
            const header = mainF.querySelector('header');
            let hLinks = header.querySelectorAll('a:has(img)');
            let mLinks = mainF.querySelectorAll('a:has(img)');
            const allPosts = new Set();
            let three = 0;
            let sheight = 0;

          

            function delay(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }

            async function scrollWithDelay() {
                while (true) {
                    mLinks = mainF.querySelectorAll('a:has(img)');
                    hLinks = header.querySelectorAll('a:has(img)');
                    let currentCount = mLinks.length - hLinks.length;
                    if (three > 10 || allPosts.size >= values.num) {
                        break;
                    }
                    let prevSize = allPosts.size;
                    for (let i = 0; i < currentCount; i++) {
                        let postAnc = mLinks[hLinks.length + i];
                        let postHref = postAnc.getAttribute('href');
                        let postImage = postAnc.querySelector('img');
                        sheight = postImage.clientHeight;
                        let postSrc = postImage.getAttribute('src');
                        let data = {
                            postHref: postHref,
                            postSrc: postSrc
                        };
                        allPosts.add(JSON.stringify(data));
                        await delay(10);
                    }
                    let currSize = allPosts.size;
                    if (currSize > prevSize) {
                        let diff = currSize - prevSize;
                        window.scrollBy(0, sheight * currentCount / 2);
                        three = 0;
                    }
                    if (currSize === prevSize) {
                        three++;
                    }

                    // Add a delay between scrolls
                    await delay(500); // 500 ms delay
                    console.log("allPosts size:", allPosts.size);
                    console.log("three:", three);
                    console.log("currentCount:", currentCount);
                }

                return Array.from(allPosts); // Convert Set to an array before returning
            }

            // Call the async function
            return scrollWithDelay().catch(console.error);
        }, myValues); // Pass the values here

        // Log the collected posts
        return Array.from(allPosts);
    } catch (err) {
        console.log(err);
        return { status: "fail", message: err };
    }
};

module.exports = post;
