import "../../sources/scripts/script.js";

import { checkDateSelector, fadeBullet, showDetail, submitBullet, 
  submitCategory, deleteBullet, deleteCategory } from "../../sources/scripts/script.js";

beforeAll(async () => {
  // Assumes we are using a fresh browser cache
  await page.goto('https://cse110-sp21-group32.github.io/cse110-sp21-group32/');
  await page.waitForTimeout(500);
  
  /**
   * Set up a bullet for first date so that we can test it
   */  

  // opens editor
  const newBulletBtn = await page.evaluateHandle(`document.querySelector("#add-bullet-button")`);
  await newBulletBtn.click();
  // adds title
  const titleField = await page.evaluateHandle(`document.querySelector("body > bullet-editor-page").shadowRoot.querySelector("#name")`);
  await titleField.focus();
  await titleField.click();
  await page.keyboard.type('note');
  // accepts bullet
  const submitBullet = await page.evaluateHandle(`document.querySelector("body > bullet-editor-page").shadowRoot.querySelector("#bulletSubmit")`);
  await submitBullet.click();
}, 30000);

describe("checkDateSelector", () => {
  // allows for soft selection
  it("if active dates is 0", async () => {
    // the current date is automatically selected
    // set 
    checkDateSelector();
  });

  it("if active dates is not 0", () => {
    checkDateSelector();
  });
});

it("fadeBullet", async () => {
});

it("showDetail", async () => {
});

it("something", async () => {
});

it("something", async () => {
});

it("something", async () => {
});

it("something", async () => {
});