import { updateDateBackground, fadeBullet, showDetail, deleteBullet, deleteCategory } from "../../sources/scripts/script.js";

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
  
  /*
  // adds title
  const titleField = await page.evaluateHandle(`document.querySelector("body > bullet-editor-page").shadowRoot.querySelector("#name")`);
  await titleField.focus();
  await titleField.click();
  await page.keyboard.type('note');
  // accepts bullet
  const submitBullet = await page.evaluateHandle(`document.querySelector("body > bullet-editor-page").shadowRoot.querySelector("#bulletSubmit")`);
  await submitBullet.click();
  */
  const mock = jest.fn(() => undefined);
  window.alert = mock;
}, 30000);

describe("checkDateSelector", () => {
  // allows for soft selection
  it("if active dates is 0", async () => {
    // deselects current date
    const date = await page.evaluateHandle(`document.querySelector("body > main > div > div.cell.cell-2 > div > div > date-entry:nth-child(2)").shadowRoot.querySelector("section > div > div.date")`);
    await date.click();

    // the current date is automatically selected
    updateDateBackground();
    const EXPECTED_ACTIVE = "true";
    const ACTUAL_ACTIVE = date.active;
    expect(ACTUAL_ACTIVE).toBe(EXPECTED_ACTIVE);
  });

  it("if active dates is not 0", async () => {
    // reselects current date
    const date = await page.evaluateHandle(`document.querySelector("body > main > div > div.cell.cell-2 > div > div > date-entry:nth-child(2)").shadowRoot.querySelector("section > div > div.date")`);
    await date.click();

    checkDateSelector();
    const EXPECTED_ACTIVE = "false";
    const ACTUAL_ACTIVE = date.active;
    expect(ACTUAL_ACTIVE).toBe(EXPECTED_ACTIVE);
  });
});

it("fadeBullet", async () => {
  // checks off task
  const checkBtn = await page.evaluateHandle(`document.querySelector("body > main > div > div.cell.cell-4 > div > div > div.entry-list > bullet-entry:nth-child(2)").shadowRoot.querySelector("#bullet-check")`);
  await checkBtn.click();

  // check opacity
  const EXPECTED_OPA = "0.25";
  const ACTUAL_OPA = await page.evaluateHandle(`document.querySelector("body > main > div > div.cell.cell-4 > div > div > div.entry-list > bullet-entry:nth-child(2)").shadowRoot.querySelector("section > div.bullet")`);
  expect(ACTUAL_OPA).toBe(EXPECTED_OPA);
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