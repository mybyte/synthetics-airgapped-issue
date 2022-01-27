import { journey, step, expect } from '@elastic/synthetics';

journey('Check stackoverflow', ({ page, browser, params }) => {
    
    step("load page", async () => {
        await page.goto('https://stackoverflow.com');
    });

});