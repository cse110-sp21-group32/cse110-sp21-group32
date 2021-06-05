const FAIL_NOT_IMPLEMENTED = 'Not yet implemented';
const FAIL_SHADOW_DOM = 'Unit testing requires shadow DOM interaction, TBD';

beforeAll(async () => {
  await page.goto('https://cse110-sp21-group32.github.io/cse110-sp21-group32/');
  await page.waitForTimeout(500);
});

describe('Text Layout Loaded', () => {
  it('test 1: Read Day header', async () => {
    const objHeaderList = await page.$$('h2');
    const objHeader = objHeaderList[0];
    const strExpected = 'Day';

    const strHeader = await page.evaluate(objHeader => objHeader.textContent, objHeader);

    expect(strHeader).toBe(strExpected);
  });

  it('test 2: Read Focus header', async () => {
    const objHeaderList = await page.$$('h2');
    const objHeader = objHeaderList[1];
    const strExpected = 'Focus';

    const strHeader = await page.evaluate(objHeader => objHeader.textContent, objHeader);

    expect(strHeader).toBe(strExpected);
  });

  it('test 3: Read Categories header', async () => {
    const objHeaderList = await page.$$('h2');
    const objHeader = objHeaderList[2];
    const strExpected = 'Categories'

    const strHeader = await page.evaluate(objHeader => objHeader.textContent, objHeader);

    expect(strHeader).toBe(strExpected);
  });
});

describe('Bullet Editor', () => {
  it('test 4: Title can be entered', async () => {
    // Test that title can be entered as a string
    fail(FAIL_SHADOW_DOM);
  });

  it('test 5: Description can be entered', async () => {
    // Test that description can be entered as a string
    fail(FAIL_SHADOW_DOM);
  });

  it('test 6: Category choices reflect categories available', async () => {
    fail(FAIL_NOT_IMPLEMENTED);
  });

  it('test 7: Tests type inputs', async () => {
    fail(FAIL_NOT_IMPLEMENTED);
  });
});

describe('Viewing bullets', () => {
  it('test 8: Title shows correctly', async () => {
    // const entryList = await page.$(".entry-list");

    fail(FAIL_SHADOW_DOM);
  });

  it('test 9: Description shows under details', async () => {
    fail(FAIL_SHADOW_DOM);
  });

  it('test 10: Correctly tagged with category', async () => {
    fail(FAIL_NOT_IMPLEMENTED);
  });

  it('test 11: Correctly colored by category', async () => {
    fail(FAIL_NOT_IMPLEMENTED);
  });

  it('test 12: Type of bullet correctly marked', async () => {
    fail(FAIL_NOT_IMPLEMENTED);
  });
});