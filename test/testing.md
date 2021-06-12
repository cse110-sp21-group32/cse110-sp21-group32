# Guide to setting up local system for testing

- [Guide to setting up local system for testing](#guide-to-setting-up-local-system-for-testing)
  - [Latest Update on Test Cases Covered](#latest-update-on-test-cases-covered)
    - [June 09, 2021 - 16 Working Tests](#june-09-2021---16-working-tests)
    - [Written tests](#written-tests)
    - [Framed tests](#framed-tests)
  - [Manual Testing](#manual-testing)
  - [Setting up testing environment](#setting-up-testing-environment)
  - [Running tests](#running-tests)
  - [Seeing Tests](#seeing-tests)
    - [For GitHub Actions](#for-github-actions)
    - [For Local Testing](#for-local-testing)

The repo was designed to run some automated tests through GitHub actions and will run these silently in the background of most of the main commits. However, sometimes you'll need to see how it fails and actually run the test on your local machine to see what's up with the code.

This file is designed to show you how to get your local system ready to try out the testing. We use the Jest and Puppeteer testing framework to write our tests.

** *NOTE: new tests should be opened in a new branch*

## Latest Update on Test Cases Covered
As the project grows in complexity, so does the tests. When the fundamental method from which the users interact with the website, we will have to update the tests.

### June 11, 2021 - Some test rewritten
We have 14 working e2e tests. We rewrote many of the tests and at least 5 of them were no longer relevant after the new version. Unit tests have had troubles since they rely on localstorage. Instead of importing a library for that, we are simulating localstorage ourselves. It looks like 2 of our e2e tests are failing due to known compatability problems with chromium on ubuntu machines and our website. 

### June 10, 2021 - New Version -> Needs New Tests
**DISCLAIMER: As of June 10, 2021, the editor menu was removed and the e2e tests, anything that relied on running the editor menu no longer works. All tests should be re-written to account for this change.**

### June 09, 2021 - 16 Working E2E Tests
The [latest commit to main](https://github.com/cse110-sp21-group32/cse110-sp21-group32/tree/7f6af568ce1241747a128f8c43bb39e9e986b69b) that this test suite currently works for is from June 09, 2021. We have 3 unit tests written but not yet functioning.

### Written tests
- `category.test.js` -> outmoded by latest version
- `bullet.test.js`
- `script.test.js` -> outmoded by latest version

### Framed tests
- ~~`bulletEditorPage.test.js`~~ removed by latest version
- `bulletEntryPage.test.js`
- ~~`categoryEditorPage.test.js`~~ removed by latest version
- `dateEntry.test.js` 

## Manual Testing
Before even pushing to main, it's worthwhile to do some manual tests before pushing. Refer to the [manual-testing.md](manual-testing.md) for what should be working in order to avoid retroactive bug patches.

## Setting up testing environment

After cloning the repo, check to make sure you have `npm` installed. Run the following code to get the version. If you don't have it, follow the [npm installation instructions here](https://www.npmjs.com/get-npm).

1. `npm -v`

Next install the required library. We don't have this on our repo because it's such a large file and git doesn't work well with large files. We need to move inside our cloned repo and stay at the top-most level. This will then install the library in the top-most level of our repo.

2. `npm install --save-dev jest babel-jest @babel/core @babel/preset-env`

Our tests are all stored in the `test/` directory. Unit tests are stored in `unit/` and End-to-End tests are stored in `e2e/`.  We need to know this in order to run our Jest/Puppeteer tests.

## Running tests

We can actually run our tests like so (assuming we're in the top most directory level)

3. `npm test test/<test-type>/feature.test.js`

If we wanted to run our e2e `category.test.js` file, the command would look like this:

```bash
npm test test/e2e/category.test.js
```

and the result would look something like this. 

```bash
$ npm test test/e2e/category.test.js 

> cse110-sp21-group32@1.0.0 test
> jest --coverage "test/e2e/category.test.js"

 PASS  test/e2e/category.test.js (81.746 s)
  Adding categories
    ✓ test 1: Add category opens up a dialog box (6073 ms)
    ✓ test 2: Options to edit are Name and Color (14111 ms)
    ✓ test 3: Form submits and closes dialog (3040 ms)
  Display categories
    ✓ test 4: Name of category correctly displayed (1006 ms)
    ✓ test 5: Category displays proper color (1005 ms)
  Selecting categories
    ✓ test 6: Selected categories show in Focus (4025 ms)
    ✓ test 7: Select all button functions appropriately (3021 ms)
    ✓ test 8: Deselect all button functions appropriately (3023 ms)
  Category storage
    ✓ test 9: Categories persist after refresh (2165 ms)
  Deleting categories
    ✓ test 10: Deleted category disappears from right side list (4031 ms)
  Editing categories
    ✓ dummy test to set up for test 11 (10073 ms)
    ✓ test 11: Category edit button opens menu and allows editing (20659 ms)
    ✓ test 12: Category with edited title changes title (1005 ms)
    ✓ test 13: Category with edited color changes color (1006 ms)

----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------|---------|----------|---------|---------|-------------------
All files |       0 |        0 |       0 |       0 |                   
----------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       14 passed, 14 total
Snapshots:   0 total
Time:        82.458 s
Ran all test suites matching /test\/e2e\/category.test.js/i
```

## Seeing Tests

Depending on the last person to make a commit, the configuration files may or may not allow the chromium tab to open up. That is because GitHub actions won't allow us to run a GUI on a server that doesn't have a GUI. However, that isn't useful for testers because we can't see how our program is behaving. The following two snippets are for both cases.

### For GitHub Actions

For after all the tests have been written and for the final commit.

```json
module.exports = {
    launch: {
       headless: true,
       slowMo: 500,
       args: ['--no-sandbox']
      }
    }

```

### For Local Testing

For when investigating behavior on your local branch.

```json
module.exports = {
    launch: {
       headless: false,
       slowMo: 500,
       // args: ['--no-sandbox']
      }
    }

```

