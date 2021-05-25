const FAIL_STR = 'Not yet implemented';

describe('Text Layout Loaded', () => {
  it('test 1: Read Day header', async () => {
    const objHeader = await page.$('h2');
    const strExpected = 'Day';

    const strHeader = await page.evaluate(objHeader => objHeader.textContent, objHeader);

    expect(strHeader).toBe(strExpected);
    c

  it('test 2: Read Focus header', async () => {
    const objHeader = await page.$('.section-header-main');
    const strExpected = 'Focus';

    const strHeader = await page.evaluate(objHeader => objHeader.textContent, objHeader);

    expect(strHeader).toBe(strExpected);
  });

  it('test 3: Read Categories header', async () => {
    const objHeader = await page.$('h2');
    const strExpected = 'Categories'

    const strHeader = await page.evaluate(objHeader => objHeader.textContent, objHeader);

    expect(strHeader).toBe(strExpected);
  });


describe('Adding bullets', () => {

});

describe('Viewing bullets', () => {
  beforeAll(() => {
    // Make new bullet with a title, details, category, and type
  });

  it('test 1: Title shows correctly', async () => {
    const entryList = await page.$(".entry-list");


  });

  it('test 2: Description shows under details', async () => {

  });

  it('test 3: Correctly tagged with category', async () => {
    fail(FAIL_STR);
  });

  it('test 4: Correctly colored by category', async () => {
    fail(FAIL_STR);
  });

  it('test 5: Type of bullet correctly marked', async () => {
    fail(FAIL_STR);
  });
});
    expect(strHeader).toBe('Entry 1');
  });
});