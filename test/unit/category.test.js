const FAIL_NOT_IMPLEMENTED = 'Not yet implemented';
const FAIL_SHADOW_DOM = 'Unit testing requires shadow DOM interaction, TBD';
const EXPECTED_TITLE = 'Homework';
const EXPECTED_COLOR = 'red';

beforeAll(async () => {
  await page.goto('http://127.0.0.1:5501/sources/index.html');
  await page.waitForTimeout(500);
});

describe('Adding categories', () => {
  it('test 1: Add category opens up a dialog box', async () => {
    const addCategory = await page.click('#add-cate-button');
    const expectedClass = 'main-view cateEditor';
    
    const bodyClass = await page.$eval('body', (page) => {
      return page.className;
    });

    expect(bodyClass).toBe(expectedClass);
  }, 10000);

  it('test 2: Options to edit are Name and Color', async () => {
    // Input data into both fields
    fail(FAIL_NOT_IMPLEMENTED);
  });

  it('test 3: Form submits and closes dialog', async () => {
    fail(FAIL_SHADOW_DOM);
    
    // await page.click('#cate-submit');
    // const expectedClass = 'main-view default-view';
    
    // const bodyClass = await page.$eval('body', (page) => {
    //   return page.className;
    // });

    // expect(bodyClass).toBe(expectedClass);
    
  });
});

describe('Display categories', () => {
  it('test 4: Name of category correctly displayed', async () => {
    fail(FAIL_SHADOW_DOM);

    // const category = await page.$('category-entry');
    // // const categoryTitle = await page.$eval('category-entry', () => {return category.textContent});
    // const categoryTitle = await page.evaluate(category => category.textContent, category);

    // expect(categoryTitle).toBe(expectedTitle);
  });
  
  it('test 5: Category displays proper color', async () => {
    fail(FAIL_NOT_IMPLEMENTED);
  });
});

describe('Selecting categories', () => {
  it('test 6: Selected categories show in Focus', async () => {
    fail(FAIL_NOT_IMPLEMENTED);
  });

  it('test 7: Select all button functions appropriately', async () => {
    fail(FAIL_NOT_IMPLEMENTED);
  });

  it('test 8: Deselect all button functions appropriately', async () => {
    fail(FAIL_NOT_IMPLEMENTED);
  })
});

describe('Deleting categories', () => {
  it('test 9: Deleted category disappears from right side list', async () => {
    fail(FAIL_NOT_IMPLEMENTED);
  });
  
  it('test 10: Bullets of a deleted category respond appropriately', async () => {
    fail(FAIL_NOT_IMPLEMENTED);
  });
});

describe('Editing categories', () => {
  it('test 11: Category with edited title changes title', async() => {
    fail(FAIL_NOT_IMPLEMENTED);
  });
  
  it('test 12: Category with edited color changes color', async() => {
    fail(FAIL_NOT_IMPLEMENTED);
  });
});