const {Builder, By, until} = require('selenium-webdriver');
const assert = require('assert');

describe('Sauce Labs Test', function() {
    let driver;

    it('Test Case Login', async function() {
        driver=await new Builder().forBrowser('chrome').build();
        await driver.get('https://www.saucedemo.com/');
        // await driver.sleep(5000); // Wait for 5 seconds to ensure the page loads completely
        await driver.wait(until.titleIs('Swag Labs'), 10000);                                               //Assertion titel
        let uname = await driver.findElement(By.css('[data-test="username"]'));
        let pass = await driver.findElement(By.css('[data-test="password"]'));
        let login = await driver.findElement(By.xpath('//div[@class="login-box"]/form/input'));
        await uname.sendKeys('standard_user');
        await pass.sendKeys('secret_sauce');
        await login.click();
        await assert.strictEqual(await driver.getTitle(), 'Swag Labs', 'Beda Gan'); //Assertion titel selesai login
        let fotoProduk = await driver.wait(
            until.elementLocated(By.xpath('//img[@alt="Sauce Labs Backpack"]')), 10000); 
        await fotoProduk.isDisplayed()                                                                      //Assertion foto produk
        await driver.sleep(2000);
        await driver.quit();
    });

    it('Cek Produk List Z-A', async function() {
        driver=await new Builder().forBrowser('chrome').build();
        await driver.get('https://www.saucedemo.com/');
        // await driver.sleep(5000); // Wait for 5 seconds to ensure the page loads completely
        await driver.wait(until.titleIs('Swag Labs'), 10000);                                               //Assert the title of the page
        let uname = await driver.findElement(By.css('[data-test="username"]'));
        let pass = await driver.findElement(By.css('[data-test="password"]'));
        let login = await driver.findElement(By.xpath('//div[@class="login-box"]/form/input'));
        await uname.sendKeys('standard_user');
        await pass.sendKeys('secret_sauce');
        await login.click();
        await assert.strictEqual(await driver.getTitle(), 'Swag Labs', 'Beda Gan'); //Assert the title of the page after login
        let sort = await driver.findElement(By.css('*[data-test="product-sort-container"]'));
        await sort.click();
        let sortAtoZ = await driver.findElement(By.xpath('//option[@value="za"]'));
        await sortAtoZ.click();                                                    
        let produk1 = await driver.findElement(By.xpath('//div[@class="inventory_item"][1]//div[@data-test="inventory-item-name"]'));
        let produk2 = await driver.findElement(By.xpath('//div[@class="inventory_item"][2]//div[@data-test="inventory-item-name"]'));
        let produk6 = await driver.findElement(By.xpath('//div[@class="inventory_item"][6]//div[@data-test="inventory-item-name"]'));

                                                                                                            //Assertion ambil produk 1,2,6
        await assert.strictEqual(await produk1.getText(), 'Test.allTheThings() T-Shirt (Red)', 'Beda Gan'); 
        await assert.strictEqual(await produk2.getText(), 'Sauce Labs Onesie', 'Beda Gan'); 
        await assert.strictEqual(await produk6.getText(), 'Sauce Labs Backpack', 'Beda Gan'); 

        await driver.sleep(2000);        
        await driver.quit();
    });
});