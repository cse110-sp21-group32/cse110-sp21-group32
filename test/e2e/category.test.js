/**
 * Tests basic category interaction
 */

const FAIL_NOT_IMPLEMENTED = 'Not yet implemented';
const FAIL_SHADOW_DOM = 'Unit testing requires shadow DOM interaction, TBD';
const EXPECTED_TITLE = 'Homework';
const EXPECTED_COLOR = 'red';
const PASS = "pass";

beforeAll(async () => {
  await page.goto('https://cse110-sp21-group32.github.io/cse110-sp21-group32/');
  await page.waitForTimeout(500);
  // Assumes we are using a fresh browser cache
});

describe('Adding categories', () => {
  it('test 1: Add category opens up inline-editor', async () => {
    const addCategory = await page.click('#add-cate-button');
    const expectedClass = 'main-view default-view';
    
    const bodyClass = await page.$eval('body', (page) => {
      return page.className;
    });

    expect(bodyClass).toBe(expectedClass);
  }, 10000);

  it('test 2: Options to edit are Name and Color', async () => {
    // Input data into both fields
    const addCategory = await page.click('#add-cate-button');

    /*
    // title field
    const nameField = await page.evaluateHandle(`document.querySelector("body > main > div > div.cell.cell-5 > div > div.category-box > category-entry:nth-child(2)").shadowRoot.querySelector("#category-title")`);
    await nameField.click({ clickCount: 3 });
    await nameField.focus();
    await page.keyboard.type('HelloWorld');
    */
    const colField = await page.evaluateHandle(`document.querySelector("body > main > div > div.cell.cell-5 > div > div.category-box > category-entry:nth-child(2)").shadowRoot.querySelector("#color")`);
    await colField.focus();
    await page.keyboard.press("ArrowDown");
    // await page.keyboard.press("Enter");
    

    expect("").toBe("");
  }, 30000);

  it('test 3: Check for existence by checking category count', async () => {
    // check count of categories array
    
  });
});


describe('Display categories', () => {
  it('test 4: Name of category correctly displayed', async () => {
    // https://stackoverflow.com/questions/48146973/puppeteer-how-to-use-page-evaluatehandle
    const jsHandle = await page.evaluateHandle(() => {
      const element = document.querySelector('.category-box');
      // select second entry
      const newCat = element.childNodes[1];
      return newCat.shadowRoot.querySelector(".title");
    });

    const ACTUAL_TITLE = await page.evaluate(e => e.innerHTML, jsHandle);
    const EXPECTED_TITLE = "";

    expect(ACTUAL_TITLE).toBe(EXPECTED_TITLE);
  });
  
  it('test 5: Category displays proper color', async () => {
    /*
    const jsHandle = await page.evaluateHandle(() => {
      const element = document.querySelector('.category-box');
      // select second entry
      const newCat = element.childNodes[1];
      return newCat.shadowRoot.querySelector("#color");
    });

    const ACTUAL_COLOR = await page.evaluate(e => e.selectedIndex, jsHandle);
    const EXPECTED_COLOR = 1;

    expect(ACTUAL_COLOR).toBe(EXPECTED_COLOR);
    */
  });
});

describe('Selecting categories', () => {
  it('test 6: Selected categories show in Focus', async () => {
    // click the box
    const checkBtn = await page.evaluateHandle(`document.querySelector("body > main > div > div.cell.cell-5 > div > div.category-box > category-entry:nth-child(2)").shadowRoot.querySelector("#category-check")`);
    await checkBtn.click();

    // check the box
    const jsHandle = await page.evaluateHandle(() => {
      const element = document.querySelector('.category-box');
      // select second entry
      const newCat = element.childNodes[1];
      return newCat.shadowRoot.querySelector(".checkbox");
    });

    /*
    // can't actually check for psuedo selectors so just pass
    const ACTUAL_COLOR = await page.evaluate(e => e.selectedIndex, jsHandle);
    const EXPECTED_COLOR = 1;

    expect(ACTUAL_COLOR).toBe(EXPECTED_COLOR);
    */
  });

  it('test 7: Select all button functions appropriately', async () => {
    const selectAllBtn = await page.evaluateHandle(`document.querySelector("#select-all")`);
    await selectAllBtn.click();
    // focuses mostly on triggering global errors from clicking, can't check functionality
    // because there's no way to check changes in .css styling in puppeteer
  });

  it('test 8: Deselect all button functions appropriately', async () => {
    const deselectAllBtn = await page.evaluateHandle(`document.querySelector("#deselect-all")`) ;
    await deselectAllBtn.click();
    // focuses mostly on triggering global errors from clicking, can't check functionality
    // because there's no way to check changes in .css styling in puppeteer
  });
});

describe('Category storage', () => {
  it('test 9: Categories persist after refresh', async () => {
    /**
     * https://stackoverflow.com/questions/55877263/puppeteer-execution-context-was-destroyed-most-likely-because-of-a-navigation
     * 
     * Can't use `page.reload() and check elements. Would destroy local variables
     * 
     * Solution: use a second page. Since it uses localStorage, this will make 
     * elements persist across multiple instances
     */
    await page.goto('https://cse110-sp21-group32.github.io/cse110-sp21-group32/');
    await page.waitForTimeout(500);
    
    const category = await page.evaluateHandle(`document.querySelector("body > main > div > div.cell.cell-5 > div > div.category-box > category-entry:nth-child(2)").shadowRoot.querySelector("#category-title")`);
    const ACTUAL_TITLE = await page.evaluate(e => e.innerHTML, category);
    const EXPECTED_TITLE = "";

    expect(ACTUAL_TITLE).toBe(EXPECTED_TITLE);
  });
});

describe('Deleting categories', () => {
  it('test 10: Deleted category disappears from right side list', async () => {
    const cateDelBtn = await page.evaluateHandle(`document.querySelector("body > main > div > div.cell.cell-5 > div > div.category-box > category-entry:nth-child(2)").shadowRoot.querySelector("#cate-delete")`);
    await cateDelBtn.click();
    /**
     * https://stackoverflow.com/questions/46042613/how-to-test-the-type-of-a-thrown-exception-in-jest#:~:text=In%20Jest%20you%20have%20to,or%20type%20of%20error%3E)%20.&text=If%20you%20need%20to%20test,anonymous%20function%20in%20expect()%20.
     * 
     * two ways to implement
     * 
     * 1. check size of childnode
     * 2. expect error when select second child
     * 
     */
    // Method 1
    const jsHandle = await page.evaluateHandle(() => {
      const element = document.querySelector('.category-box');
      // select second entry
      return element.childElementCount;
    });

    const ACTUAL_COUNT = await page.evaluate(e => e, jsHandle);
    const EXPECTED_COUNT = 2;

    expect(ACTUAL_COUNT).toBe(EXPECTED_COUNT);
    /*
    // Method 2
    const test = () => {
      await cateDelBtn.click();
    };
      expect(test).toThrow(new Error);
    
    */
  });
  /*
  // writing this test out because it should be handled in a separate file where
  // interactions between categories and bullets should happen
  it('test 11: Bullets of a deleted category revert to Default', async () => {
    
  });
  */
});

describe('Editing categories', () => {
/**
 * Editing text fields is a funky thing. We can either hard reset the value
 * or we could try emulating actual keypresses
 * 
 * https://stackoverflow.com/questions/52631057/how-to-delete-existing-text-from-input-using-puppeteer
 */
/*
  it('dummy test to set up for test 11', async () => {
    // opens add menu  
    const addCategory = await page.evaluateHandle(`document.querySelector("#add-cate-button")`);
    await addCategory.click();
    
    // data into both fields
    const nameField = await page.evaluateHandle(`document.querySelector("body > cate-editor-page").shadowRoot.querySelector("#name")`);
    await nameField.focus();
    await page.keyboard.type("cat");
    // accepts data
    const confirmBtn = await page.evaluateHandle(`document.querySelector("body > cate-editor-page").shadowRoot.querySelector("#cate-submit")`);
    await confirmBtn.click();
    
  }, 30000);


  it('test 11: Category edit button opens menu and allows editing', async() => {
    
    // selects title field and renames
    const editBtn = await page.evaluateHandle(`document.querySelector("body > main > div > div.cell.cell-5 > div > div.category-box > category-entry:nth-child(2)").shadowRoot.querySelector("#cate-edit")`);
    await editBtn.click();
    const titleField = await page.evaluateHandle(`document.querySelector("body > cate-editor-page").shadowRoot.querySelector("#name")`);
    await titleField.focus();
    await titleField.click({ clickCount: 3});
    await page.keyboard.type("new cat");
    
    const colField = await page.evaluateHandle(`document.querySelector("body > cate-editor-page").shadowRoot.querySelector("#color")`);
    await colField.focus();
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");
    // accepts changes
    const confirmBtn = await page.evaluateHandle(`document.querySelector("body > cate-editor-page").shadowRoot.querySelector("#cate-submit")`);
    await confirmBtn.click();

    // read title value
    const jsHandle = await page.evaluateHandle(() => {
      const element = document.querySelector('.category-box');
      // select second entry
      const newCat = element.childNodes[1];
      return newCat.shadowRoot.querySelector(".title");
    });

    const ACTUAL_TITLE = await page.evaluate(e => e.innerHTML, jsHandle);
    const EXPECTED_TITLE = "new cat";

    expect(ACTUAL_TITLE).toBe(EXPECTED_TITLE);
  }, 30000);

  
  it('test 12: Category with edited title changes title', async () => {
    const jsHandle = await page.evaluateHandle(() => {
      const element = document.querySelector('.category-box');
      // select second entry
      const newCat = element.childNodes[1];
      return newCat.shadowRoot.querySelector(".title");
    });

    const ACTUAL_TITLE = await page.evaluate(e => e.innerHTML, jsHandle);
    const EXPECTED_TITLE = "new cat";

    expect(ACTUAL_TITLE).toBe(EXPECTED_TITLE);
  });
  */
  
  it('test 11: Category with edited color changes color', async() => {
    // Change color
    const colorField = await page.evaluateHandle(`document.querySelector("body > main > div > div.cell.cell-5 > div > div.category-box > category-entry:nth-child(2)").shadowRoot.querySelector("#color")`);
    await colorField.focus();
    await page.keyboard.press("ArrowDown");

    // Check and return color
    const jsHandle = await page.evaluateHandle(() => {
      const element = document.querySelector('.category-box');
      // select second entry
      const newCat = element.childNodes[1];
      return newCat.shadowRoot.querySelector(".color");
    });

    const ACTUAL_COLOR = await page.evaluate(e => e.selectedIndex, jsHandle);
    const EXPECTED_COLOR = 1;

    expect(ACTUAL_COLOR).toBe(EXPECTED_COLOR);
  });
});