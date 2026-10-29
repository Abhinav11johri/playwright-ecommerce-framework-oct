import { test, expect } from '../fixtures/testBase';
import * as testData from '../data/testData.json';

test.describe('SauceDemo Master E-Commerce Framework Testing Suite', () => {

  // MODULE 1: LOGIN PAGE TESTS
  test.describe('Module 1 - Login Page Validations', () => {
    test.beforeEach(async ({ loginPage }) => {
      await loginPage.navigate();
    });

    test('TC01: Successful Login with Valid Credentials', async ({ page, loginPage }) => {
      await loginPage.login(testData.validUser, testData.validPassword);
      await expect(page).toHaveURL(/.*inventory.html/);
    });

    test('TC02: Login Failure with Invalid Credentials', async ({ loginPage }) => {
      await loginPage.login(testData.invalidUser, 'wrong_pass');
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toHaveText(/Username and password do not match/);
    });

    test('TC03: Login Failure with Locked Out User Profile', async ({ loginPage }) => {
      await loginPage.login(testData.lockedUser, testData.validPassword);
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toHaveText(/Sorry, this user has been locked out/);
    });

    test('TC04: Login Validation Error when Password field is empty', async ({ loginPage }) => {
      await loginPage.usernameInput.fill(testData.validUser);
      await loginPage.loginButton.click();
      await expect(loginPage.errorMessage).toHaveText(/Password is required/);
    });

    test('TC05: Verification of visual placeholders fields availability', async ({ loginPage }) => {
      await expect(loginPage.usernameInput).toHaveAttribute('placeholder', 'Username');
      await expect(loginPage.passwordInput).toHaveAttribute('placeholder', 'Password');
    });
  });

  // MODULE 2: INVENTORY CATALOG TESTS
  test.describe('Module 2 - Inventory Catalog Validations', () => {
    test.beforeEach(async ({ loginPage }) => {
      await loginPage.navigate();
      await loginPage.login(testData.validUser, testData.validPassword);
    });

    test('TC06: Verify Title Header exists on Landing page', async ({ inventoryPage }) => {
      await expect(inventoryPage.pageTitle).toBeVisible();
      await expect(inventoryPage.pageTitle).toHaveText('Products');
    });

    test('TC07: Adding Single item increments Cart Badge', async ({ inventoryPage }) => {
      await inventoryPage.addProductToCart(testData.products.backpack);
      await expect(inventoryPage.header.cartBadge).toHaveText('1');
    });

    test('TC08: Removing item updates Cart Badge accurately', async ({ inventoryPage }) => {
      await inventoryPage.addProductToCart(testData.products.backpack);
      await inventoryPage.removeProductFromCart(testData.products.backpack);
      await expect(inventoryPage.header.cartBadge).not.toBeVisible();
    });

    test('TC09: Multiple product selection stacks cart metrics count', async ({ inventoryPage }) => {
      await inventoryPage.addProductToCart(testData.products.backpack);
      await inventoryPage.addProductToCart(testData.products.backLight);
      await expect(inventoryPage.header.cartBadge).toHaveText('2');
    });

    test('TC10: Successful Session Logout from Burger Drawer Link navigation', async ({ page, inventoryPage }) => {
      await inventoryPage.logout();
      await expect(page).toHaveURL('https://www.saucedemo.com/');
    });
  });

  // MODULE 3: SHOPPING CART TESTS
  test.describe('Module 3 - Shopping Cart Validations', () => {
    test.beforeEach(async ({ loginPage, inventoryPage }) => {
      await loginPage.navigate();
      await loginPage.login(testData.validUser, testData.validPassword);
      await inventoryPage.addProductToCart(testData.products.backpack);
      await inventoryPage.openCart();
    });

    test('TC11: Navigation to Cart via Cart Icon Click', async ({ page }) => {
      await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    });

    test('TC12: Assert product information transfers cleanly to the cart items list', async ({ cartPage }) => {
      await expect(cartPage.cartItems).toHaveCount(1);
    });

    test('TC13: Ability to drop items directly from inside the cart review section', async ({ cartPage }) => {
      await cartPage.removeButton.click();
      await expect(cartPage.cartItems).toHaveCount(0);
    });

    test('TC14: Continue Shopping action returns execution focus back to inventory', async ({ page, cartPage }) => {
      await cartPage.clickContinueShopping();
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('TC15: Checkout button redirection links directly onto client forms mapping wizard steps', async ({ page, cartPage }) => {
      await cartPage.clickCheckOut();
      await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
    });
  });

  // MODULE 4: CHECKOUT PROCESSOR TESTS
  test.describe('Module 4 - Checkout Processor Validations', () => {
    test.beforeEach(async ({ loginPage, inventoryPage, cartPage }) => {
      await loginPage.navigate();
      await loginPage.login(testData.validUser, testData.validPassword);
      await inventoryPage.addProductToCart(testData.products.backpack);
      await inventoryPage.openCart();
      await cartPage.clickCheckOut();
    });

    test('TC16: Form Validation Requirement triggers missing input error if First Name field is absent', async ({ checkoutPage }) => {
      await checkoutPage.lastNameInput.fill(testData.customerDetails.lastname);
      await checkoutPage.postalCodeInput.fill(testData.customerDetails.postalcode);
      await checkoutPage.continueButton.click();
      await expect(checkoutPage.page.locator('[data-test="error"]')).toHaveText(/Error: First Name is required/);
    });

    test('TC17: Complete Delivery Validation maps to Review Step Two', async ({ page, checkoutPage }) => {
      await checkoutPage.fillCustomerInformation(
        testData.customerDetails.firstname,
        testData.customerDetails.lastname,
        testData.customerDetails.postalcode
      );
      await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
    });

    test('TC18: Financial Total Price Calculation summary details presence verification', async ({ checkoutPage }) => {
      await checkoutPage.fillCustomerInformation(
        testData.customerDetails.firstname,
        testData.customerDetails.lastname,
        testData.customerDetails.postalcode
      );
      await expect(checkoutPage.summaryTotalLabel).toBeVisible();
      await expect(checkoutPage.summaryTotalLabel).toContainText('Total: $');
    });

    test('TC19: Successful final confirmation order submission', async ({ checkoutPage }) => {
      await checkoutPage.fillCustomerInformation(
        testData.customerDetails.firstname,
        testData.customerDetails.lastname,
        testData.customerDetails.postalcode
      );
      await checkoutPage.clickFinish();
      await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
    });

    test('TC20: System tracking coordinates revert back directly into clean catalog layout state after final reset confirmation', async ({ page, checkoutPage }) => {
      await checkoutPage.fillCustomerInformation(
        testData.customerDetails.firstname,
        testData.customerDetails.lastname,
        testData.customerDetails.postalcode
      );
      await checkoutPage.clickFinish();
      await checkoutPage.backToProductsButton.click();
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });
  });
});